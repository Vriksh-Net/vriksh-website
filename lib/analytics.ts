"use client";

import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

// Types for our analytics events
type EventType =
  | "page_view"
  | "article_view"
  | "article_impression"
  | "article_complete"
  | "session_start"
  | "session_end";

interface AnalyticsEvent {
  id: string;
  timestamp: number;
  type: EventType;
  userId: string;
  sessionId: string;
  data: Record<string, any>;
  duration?: number;
}

// Constants
const CONSENT_STORAGE_KEY = "vriksh_analytics_consent";
const USER_ID_STORAGE_KEY = "vriksh_user_id";
const SESSION_ID_STORAGE_KEY = "vriksh_session_id";
const SESSION_START_TIME_KEY = "vriksh_session_start";
const EVENTS_STORAGE_KEY = "vriksh_analytics_events";
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

// Get or create user ID (anonymous)
export function getUserId(): string {
  if (typeof window === "undefined") return "";

  let userId = localStorage.getItem(USER_ID_STORAGE_KEY);

  if (!userId) {
    userId = uuidv4();
    localStorage.setItem(USER_ID_STORAGE_KEY, userId);
  }

  return userId;
}

// Get or create session ID
export function getSessionId(): string {
  if (typeof window === "undefined") return "";

  let sessionId = sessionStorage.getItem(SESSION_ID_STORAGE_KEY);
  const lastActivity = Number(
    sessionStorage.getItem(SESSION_START_TIME_KEY) || "0"
  );
  const now = Date.now();

  // If no session or session expired, create a new one
  if (!sessionId || now - lastActivity > SESSION_TIMEOUT) {
    sessionId = uuidv4();
    sessionStorage.setItem(SESSION_ID_STORAGE_KEY, sessionId);
    sessionStorage.setItem(SESSION_START_TIME_KEY, now.toString());

    // Track session start
    trackEvent("session_start", {});
  } else {
    // Update last activity time
    sessionStorage.setItem(SESSION_START_TIME_KEY, now.toString());
  }

  return sessionId;
}

// Check if user has given consent
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CONSENT_STORAGE_KEY) === "true";
}

// Set user consent
export function setAnalyticsConsent(consent: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_STORAGE_KEY, consent ? "true" : "false");

  // If consent is given, initialize tracking
  if (consent) {
    initializeTracking();
  }
}

// Initialize tracking
function initializeTracking(): void {
  if (typeof window === "undefined") return;

  // Get or create user ID and session ID
  getUserId();
  getSessionId();

  // Track page view
  trackPageView();
}

// Track an event
export function trackEvent(
  type: EventType,
  data: Record<string, any>,
  duration?: number
): void {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;

  const event: AnalyticsEvent = {
    id: uuidv4(),
    timestamp: Date.now(),
    type,
    userId: getUserId(),
    sessionId: getSessionId(),
    data,
    duration,
  };

  // Store event locally
  storeEvent(event);

  // Send event to server
  sendEventToServer(event);
}

// Store event locally (for batching/offline support)
function storeEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  const storedEvents = JSON.parse(
    localStorage.getItem(EVENTS_STORAGE_KEY) || "[]"
  );
  storedEvents.push(event);

  // Limit stored events to prevent localStorage overflow
  const limitedEvents = storedEvents.slice(-100);
  localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(limitedEvents));
}

// Send event to server
async function sendEventToServer(event: AnalyticsEvent): Promise<void> {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
  } catch (error) {
    console.error("Failed to send analytics event:", error);
  }
}

// Track page view
export function trackPageView(): void {
  if (typeof window === "undefined") return;

  trackEvent("page_view", {
    url: window.location.href,
    referrer: document.referrer,
    title: document.title,
  });
}

// Track article view
export function trackArticleView(
  articleId: string,
  articleTitle: string
): void {
  trackEvent("article_view", {
    articleId,
    articleTitle,
    url: window.location.href,
  });
}

// Track article impression (seeing the article in a list)
export function trackArticleImpression(
  articleId: string,
  articleTitle: string,
  source = "homepage"
): void {
  trackEvent("article_impression", {
    articleId,
    articleTitle,
    source,
    url: window.location.href,
  });
}

// Track article read completion
export function trackArticleComplete(
  articleId: string,
  articleTitle: string,
  timeSpentMs: number
): void {
  trackEvent(
    "article_complete",
    {
      articleId,
      articleTitle,
      url: window.location.href,
    },
    timeSpentMs
  );
}

// Hook to track page views and session
export function useAnalytics(): void {
  useEffect(() => {
    if (!hasAnalyticsConsent()) return;

    // Initialize tracking
    initializeTracking();

    // Track session end on unmount
    return () => {
      trackEvent("session_end", {
        url: window.location.href,
      });
    };
  }, []);
}

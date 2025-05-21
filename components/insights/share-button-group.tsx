"use client";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import ShareInsight from "./share-insight";

interface ShareButtonGroupProps {
  title: string;
  slug: string;
  excerpt: string;
}

export default function ShareButtonGroup({
  title,
  slug,
  excerpt,
}: ShareButtonGroupProps) {
  // Function to handle direct social media sharing
  const shareVia = (platform: string) => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.protocol}//${window.location.host}/insights/${slug}`
        : `https://vrikshconsulting.com/insights/${slug}`;

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500">Share:</span>
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          className="h-9 w-9 rounded-full"
          onClick={() => shareVia("facebook")}
          aria-label="Share on Facebook"
        >
          <Facebook size={16} />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="h-9 w-9 rounded-full"
          onClick={() => shareVia("twitter")}
          aria-label="Share on Twitter"
        >
          <Twitter size={16} />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="h-9 w-9 rounded-full"
          onClick={() => shareVia("linkedin")}
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={16} />
        </Button>
        <ShareInsight title={title} slug={slug} excerpt={excerpt} />
      </div>
    </div>
  );
}

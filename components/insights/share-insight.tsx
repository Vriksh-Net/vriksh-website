"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Share2,
  Copy,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  X,
  Check,
  MessageCircle,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface ShareInsightProps {
  title: string;
  slug: string;
  excerpt: string;
}

export default function ShareInsight({
  title,
  slug,
  excerpt,
}: ShareInsightProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailData, setEmailData] = useState({
    to: "",
    subject: `Check out this insight: ${title}`,
    message: `I thought you might find this interesting:\n\n${title}\n\n${excerpt}\n\nRead more: ${getFullUrl(
      slug
    )}`,
  });
  const linkRef = useRef<HTMLInputElement>(null);

  // Generate the full URL for sharing
  function getFullUrl(slug: string): string {
    // In client component, we need to construct the URL
    const baseUrl =
      typeof window !== "undefined"
        ? `${window.location.protocol}//${window.location.host}`
        : "https://vrikshconsulting.com";

    return `${baseUrl}/insights/${slug}`;
  }

  // Copy link to clipboard
  const copyToClipboard = () => {
    if (linkRef.current) {
      linkRef.current.select();
      navigator.clipboard.writeText(linkRef.current.value);
      setCopied(true);

      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      });

      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Share via social media
  const shareVia = (platform: string) => {
    const url = getFullUrl(slug);
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedExcerpt = encodeURIComponent(excerpt);

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
      case "email":
        shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedExcerpt}%0A%0A${encodedUrl}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank");
      setOpen(false);
    }
  };

  // Handle email form submission
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would send this via an API
    const mailtoUrl = `mailto:${emailData.to}?subject=${encodeURIComponent(
      emailData.subject
    )}&body=${encodeURIComponent(emailData.message)}`;
    window.location.href = mailtoUrl;

    toast({
      title: "Email prepared!",
      description: "Your email client has been opened with the share content.",
    });

    setOpen(false);
  };

  // Reset copied state when popover closes
  useEffect(() => {
    if (!open) {
      setCopied(false);
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="h-9 w-9 rounded-full"
          aria-label="Share this insight"
        >
          <Share2 size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 sm:w-96" align="end" sideOffset={5}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg">Share this insight</h3>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full"
              onClick={() => setOpen(false)}
            >
              <X size={16} />
            </Button>
          </div>

          <Tabs defaultValue="social" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="link">Copy Link</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
            </TabsList>

            <TabsContent value="social" className="space-y-4">
              <p className="text-sm text-gray-500">
                Share this insight directly to your social networks
              </p>

              <div className="flex flex-wrap gap-2 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => shareVia("facebook")}
                    variant="outline"
                    className="h-12 w-12 rounded-full p-0 bg-blue-50 border-blue-200 hover:bg-blue-100"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="h-5 w-5 text-blue-600" />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => shareVia("twitter")}
                    variant="outline"
                    className="h-12 w-12 rounded-full p-0 bg-sky-50 border-sky-200 hover:bg-sky-100"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="h-5 w-5 text-sky-500" />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => shareVia("linkedin")}
                    variant="outline"
                    className="h-12 w-12 rounded-full p-0 bg-blue-50 border-blue-200 hover:bg-blue-100"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 text-blue-700" />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => shareVia("email")}
                    variant="outline"
                    className="h-12 w-12 rounded-full p-0 bg-gray-50 border-gray-200 hover:bg-gray-100"
                    aria-label="Share via Email"
                  >
                    <Mail className="h-5 w-5 text-gray-600" />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => shareVia("whatsapp")}
                    variant="outline"
                    className="h-12 w-12 rounded-full p-0 bg-green-50 border-green-200 hover:bg-green-100"
                    aria-label="Share on WhatsApp"
                  >
                    <MessageCircle className="h-5 w-5 text-green-600" />
                  </Button>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="link" className="space-y-4">
              <p className="text-sm text-gray-500">
                Copy the link to share this insight anywhere
              </p>

              <div className="flex space-x-2">
                <div className="flex-grow">
                  <Input
                    ref={linkRef}
                    value={getFullUrl(slug)}
                    readOnly
                    className="h-10"
                  />
                </div>
                <Button
                  onClick={copyToClipboard}
                  variant="default"
                  className="bg-emerald-600 hover:bg-emerald-700 flex gap-2 h-10"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span
                        key="check"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check className="h-4 w-4" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Copy className="h-4 w-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="email" className="space-y-4">
              <p className="text-sm text-gray-500">
                Share this insight directly via email
              </p>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-to">Recipient Email</Label>
                  <Input
                    id="email-to"
                    type="email"
                    placeholder="recipient@example.com"
                    value={emailData.to}
                    onChange={(e) =>
                      setEmailData({ ...emailData, to: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-subject">Subject</Label>
                  <Input
                    id="email-subject"
                    value={emailData.subject}
                    onChange={(e) =>
                      setEmailData({ ...emailData, subject: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-message">Message</Label>
                  <Textarea
                    id="email-message"
                    rows={4}
                    value={emailData.message}
                    onChange={(e) =>
                      setEmailData({ ...emailData, message: e.target.value })
                    }
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 flex gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send Email
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <Separator />

          <div className="text-xs text-gray-500 text-center">
            By sharing, you agree to our terms of service and privacy policy.
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

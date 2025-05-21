// import CurrentEvents from "@/components/events/current-events"
// import EventsHero from "@/components/events/events-hero"
// import EventsNewsletter from "@/components/events/events-newsletter"
// import UpcomingEvents from "@/components/events/upcoming-events"

// export const metadata = {
//   title: "Events | Vriksh Consulting",
//   description:
//     "Discover current and upcoming events from Vriksh Consulting. Stay updated with our latest workshops, webinars, and conferences.",
// }

// export default function EventsPage() {
//   return (
//     <div className="relative">
//       <EventsHero />
//       <CurrentEvents />
//       <UpcomingEvents />
//       <EventsNewsletter />
//     </div>
//   )
// }

import type { Metadata } from "next";
import EventsWaitlist from "@/components/events-waitlist";
import EventsHero from "@/components/events/events-hero";
import EventsFeatures from "@/components/events-features";

import CallToAction from "@/components/call-to-action";

export const metadata: Metadata = {
  title: "Events | Vriksh Consulting",
  description:
    "Join our waitlist for exclusive access to upcoming events, webinars, and workshops by Vriksh Consulting.",
};

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <EventsHero />
      <EventsWaitlist />
      <EventsFeatures />
      <CallToAction
        title="Have questions about our events?"
        description="Contact our team to learn more about our upcoming events and how you can participate."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </main>
  );
}

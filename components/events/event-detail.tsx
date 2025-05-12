"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
  Share2,
  CalendarPlus,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/animated-section";
import EventRegistrationDialog from "./event-registration-dialog";
import { Event } from "@/lib/events";

interface EventDetailProps {
  event: Event;
}

export default function EventDetail({ event }: EventDetailProps) {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsRegistrationOpen(true);
  };

  const closeRegistrationDialog = () => {
    setIsRegistrationOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          {event.image && (
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/70 to-emerald-900/90 z-10"></div>

        <div className="container mx-auto px-4 py-20 relative z-20">
          <Link
            href="/events"
            className="inline-flex items-center text-emerald-100 hover:text-white mb-6 group transition-colors"
          >
            <ArrowLeft
              size={16}
              className="mr-2 transition-transform group-hover:-translate-x-1"
            />
            Back to Events
          </Link>

          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge className="bg-emerald-500 hover:bg-emerald-600">
                  {event.category}
                </Badge>
                {!event.registrationOpen && (
                  <Badge
                    variant="outline"
                    className="border-amber-300 text-amber-100"
                  >
                    Coming Soon
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {event.title}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-emerald-100">
                <div className="flex items-center">
                  <Calendar size={20} className="mr-3 text-emerald-300" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={20} className="mr-3 text-emerald-300" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={20} className="mr-3 text-emerald-300" />
                  <span>{event.location}</span>
                </div>
                {event.attendees && (
                  <div className="flex items-center">
                    <Users size={20} className="mr-3 text-emerald-300" />
                    <span>{event.attendees} Attendees</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {event.registrationOpen ? (
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                  onClick={handleRegisterClick}
                >
                  Register Now
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-300 text-emerald-100 hover:bg-emerald-800"
                  asChild
                >
                  <Link href="/events#newsletter">Get Notified</Link>
                </Button>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-emerald-300 text-emerald-100 hover:bg-emerald-800"
                >
                  <Share2 size={18} />
                  <span className="sr-only">Share Event</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-emerald-300 text-emerald-100 hover:bg-emerald-800"
                >
                  <CalendarPlus size={18} />
                  <span className="sr-only">Add to Calendar</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <AnimatedSection animation="fade" className="mb-12">
                <h2 className="text-2xl font-bold mb-6">About This Event</h2>
                <div className="prose prose-emerald max-w-none">
                  <p className="text-gray-700 mb-4">{event.description}</p>

                  {/* Extended description - this would come from the database in a real app */}
                  <p className="text-gray-700 mb-4">
                    Join us for this exclusive event where industry experts will
                    share their insights and knowledge. This is a unique
                    opportunity to network with professionals and learn about
                    the latest trends and innovations.
                  </p>

                  <h3 className="text-xl font-semibold mt-8 mb-4">
                    What You'll Learn
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>
                      Understand the latest industry developments and how they
                      impact your business
                    </li>
                    <li>
                      Learn practical strategies that you can implement
                      immediately
                    </li>
                    <li>
                      Discover new tools and technologies to improve efficiency
                      and productivity
                    </li>
                    <li>
                      Network with industry leaders and like-minded
                      professionals
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-8 mb-4">
                    Who Should Attend
                  </h3>
                  <p className="text-gray-700 mb-4">
                    This event is ideal for business leaders, managers,
                    entrepreneurs, and professionals looking to stay ahead of
                    industry trends and enhance their knowledge and skills.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade" delay={0.1}>
                <h2 className="text-2xl font-bold mb-6">Event Schedule</h2>
                <div className="space-y-6">
                  {/* This would be dynamic in a real app */}
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <p className="text-sm text-gray-500 mb-1">
                      09:00 AM - 09:30 AM
                    </p>
                    <h3 className="font-semibold text-lg">
                      Registration & Welcome Coffee
                    </h3>
                  </div>
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <p className="text-sm text-gray-500 mb-1">
                      09:30 AM - 10:30 AM
                    </p>
                    <h3 className="font-semibold text-lg">Opening Keynote</h3>
                    <p className="text-gray-700">
                      An inspiring talk on the future of the industry
                    </p>
                  </div>
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <p className="text-sm text-gray-500 mb-1">
                      10:45 AM - 12:15 PM
                    </p>
                    <h3 className="font-semibold text-lg">Panel Discussion</h3>
                    <p className="text-gray-700">
                      Industry experts discuss current challenges and
                      opportunities
                    </p>
                  </div>
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <p className="text-sm text-gray-500 mb-1">
                      12:15 PM - 01:30 PM
                    </p>
                    <h3 className="font-semibold text-lg">Networking Lunch</h3>
                  </div>
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <p className="text-sm text-gray-500 mb-1">
                      01:30 PM - 03:00 PM
                    </p>
                    <h3 className="font-semibold text-lg">
                      Interactive Workshops
                    </h3>
                    <p className="text-gray-700">
                      Hands-on sessions to apply what you've learned
                    </p>
                  </div>
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <p className="text-sm text-gray-500 mb-1">
                      03:15 PM - 04:15 PM
                    </p>
                    <h3 className="font-semibold text-lg">
                      Closing Session & Q&A
                    </h3>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <AnimatedSection
                  animation="slide"
                  className="bg-gray-50 rounded-xl p-6 mb-8"
                >
                  <h3 className="text-xl font-bold mb-4">Event Details</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">
                        Date & Time
                      </h4>
                      <div className="flex items-center">
                        <Calendar size={18} className="mr-2 text-emerald-600" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock size={18} className="mr-2 text-emerald-600" />
                        <span>{event.time}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">
                        Location
                      </h4>
                      <div className="flex items-start">
                        <MapPin
                          size={18}
                          className="mr-2 text-emerald-600 mt-1 flex-shrink-0"
                        />
                        <div>
                          <p className="font-medium">{event.location}</p>
                          {/* This would be dynamic in a real app */}
                          <p className="text-gray-600 text-sm">
                            123 Business Avenue, Floor 4<br />
                            Conference Room C<br />
                            Mumbai, MH 400001
                          </p>
                        </div>
                      </div>
                    </div>

                    {event.organizer && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">
                          Organizer
                        </h4>
                        <p>{event.organizer}</p>
                      </div>
                    )}

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">
                        Category
                      </h4>
                      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                        {event.category}
                      </Badge>
                    </div>
                  </div>

                  {event.registrationOpen && (
                    <Button
                      className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700"
                      onClick={handleRegisterClick}
                    >
                      Register for This Event
                      <ExternalLink size={16} className="ml-2" />
                    </Button>
                  )}
                </AnimatedSection>

                <AnimatedSection
                  animation="slide"
                  delay={0.1}
                  className="bg-emerald-50 rounded-xl p-6"
                >
                  <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                  <p className="text-gray-600 mb-4">
                    If you have any questions about this event, please don't
                    hesitate to contact us.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-100"
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade" className="text-center mb-12">
            <h2 className="text-3xl font-bold">Similar Events</h2>
            <p className="text-gray-600 mt-2">
              Discover more events that might interest you
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* This would be dynamic in a real app */}
            {[1, 2, 3].map((i) => (
              <AnimatedSection key={i} animation="slide" delay={i * 0.1}>
                <Link href={`/events/${i}`} className="block group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                    <div className="h-48 relative overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Event"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <Badge className="mb-2 bg-emerald-100 text-emerald-800">
                        Workshop
                      </Badge>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-600 transition-colors">
                        Related Event Title {i}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        June 25, 2025 • Virtual Event
                      </p>
                      <p className="text-gray-700 line-clamp-2">
                        A brief description of this related event that might
                        interest attendees of the current event.
                      </p>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Dialog */}
      <EventRegistrationDialog
        isOpen={isRegistrationOpen}
        onClose={closeRegistrationDialog}
        event={{ id: event.id, title: event.title }}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ExternalLink, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/animated-section";
import Link from "next/link";
import Image from "next/image";
import { getCurrentEvents } from "@/lib/events";

const currentEvents = getCurrentEvents();

const CurrentEvents = () => {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Current Events
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our ongoing events and register to participate in insightful
            discussions, workshops, and networking opportunities.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentEvents.map((event, index) => (
            <AnimatedSection
              key={event.id}
              animation="slide"
              delay={index * 0.1}
              className="h-full"
            >
              <motion.div
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 h-full flex flex-col transition-all duration-300"
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                onHoverStart={() => setHoveredEvent(event.id)}
                onHoverEnd={() => setHoveredEvent(null)}
              >
                <Link
                  href={`/events/${event.id}`}
                  className="relative h-48 overflow-hidden block"
                >
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out"
                    style={{
                      transform:
                        hoveredEvent === event.id ? "scale(1.1)" : "scale(1)",
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-emerald-500 hover:bg-emerald-600">
                      {event.category}
                    </Badge>
                  </div>
                </Link>

                <div className="p-6 flex-grow">
                  <Link
                    href={`/events/${event.id}`}
                    className="hover:text-emerald-600 transition-colors"
                  >
                    <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                  </Link>
                  <p className="text-gray-600 mb-4">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={16} className="mr-2 text-emerald-500" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={16} className="mr-2 text-emerald-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin size={16} className="mr-2 text-emerald-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users size={16} className="mr-2 text-emerald-500" />
                      <span>{event.attendees} Attendees</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 mt-auto">
                  <Button
                    asChild
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Link
                      href={`/events/${event.id}`}
                      className="flex items-center justify-center"
                    >
                      View Details
                      <ExternalLink size={16} className="ml-2" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurrentEvents;

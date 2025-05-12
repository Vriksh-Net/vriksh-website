"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Bell, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/animated-section";
import Link from "next/link";
import EventRegistrationDialog from "./event-registration-dialog";
import { getUpcomingEvents } from "@/lib/events";

const upcomingEvents = getUpcomingEvents();

const UpcomingEvents = () => {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const [registrationEvent, setRegistrationEvent] = useState<{
    id: number;
    title: string;
  } | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };

  const handleRegisterClick = (event: { id: number; title: string }) => {
    setRegistrationEvent(event);
  };

  const closeRegistrationDialog = () => {
    setRegistrationEvent(null);
  };

  return (
    <section className="py-20 bg-emerald-50">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay ahead of the curve with our upcoming events. Register your
            interest or subscribe to our events newsletter to be notified when
            registration opens.
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto space-y-6">
          {upcomingEvents.map((event, index) => (
            <AnimatedSection
              key={event.id}
              animation="slide"
              delay={index * 0.1}
            >
              <motion.div
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
                initial={{ opacity: 1 }}
                whileHover={{
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleExpand(event.id)}
                >
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-emerald-500 hover:bg-emerald-600">
                          {event.category}
                        </Badge>
                        {!event.registrationOpen && (
                          <Badge
                            variant="outline"
                            className="border-amber-500 text-amber-600"
                          >
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                      <Link
                        href={`/events/${event.id}`}
                        className="hover:text-emerald-600 transition-colors"
                      >
                        <h3 className="text-xl font-bold">{event.title}</h3>
                      </Link>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <Calendar size={16} className="mr-2 text-emerald-500" />
                        <span>{event.date}</span>
                      </div>
                      <motion.div
                        animate={{
                          rotate: expandedEvent === event.id ? 90 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight size={20} className="text-emerald-600" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expandedEvent === event.id ? "auto" : 0,
                    opacity: expandedEvent === event.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={16} className="mr-2 text-emerald-500" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin size={16} className="mr-2 text-emerald-500" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        asChild
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        <Link href={`/events/${event.id}`}>View Details</Link>
                      </Button>

                      {event.registrationOpen ? (
                        <Button
                          variant="outline"
                          className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRegisterClick({
                              id: event.id,
                              title: event.title,
                            });
                          }}
                        >
                          Register Interest
                        </Button>
                      ) : (
                        <Button
                          asChild
                          variant="outline"
                          className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                        >
                          <Link
                            href="#newsletter"
                            className="flex items-center"
                          >
                            <Bell size={16} className="mr-2" />
                            Notify Me
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Registration Dialog */}
      {registrationEvent && (
        <EventRegistrationDialog
          isOpen={!!registrationEvent}
          onClose={closeRegistrationDialog}
          event={registrationEvent}
        />
      )}
    </section>
  );
};

export default UpcomingEvents;

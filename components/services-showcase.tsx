"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Coins,
  Database,
  Globe,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const services = [
  {
    id: "money",
    title: "Vriksh.Money",
    description:
      "We provide all types of loans, including business loans and MSME funding, tailored for startups.",
    longDescription:
      "Our financial services are designed to help businesses access the capital they need to grow and thrive. We understand the unique challenges that startups and small businesses face when seeking funding, and we work closely with our clients to identify the most suitable financing options.",
    icon: Coins,
    color: "bg-amber-100 text-amber-600",
    hoverColor: "hover:bg-amber-600 hover:text-white",
    benefits: [
      "Customized funding solutions for startups and SMEs.",
      "Competitive interest rates and flexible repayment terms.",
      "Quick approval process with minimal documentation.",
      "Expert guidance on financial planning and management.",
    ],
  },
  {
    id: "grow",
    title: "Vriksh.Grow",
    description:
      "We specialise in sales enablement and assist companies in creating effective sales plans to expand their sales.",
    longDescription:
      "Our sales enablement services help businesses optimize their sales processes, train their teams, and implement strategies that drive revenue growth. We work with companies of all sizes to develop customized sales plans that align with their business objectives and market positioning.",
    icon: TrendingUp,
    color: "bg-emerald-100 text-emerald-600",
    hoverColor: "hover:bg-emerald-600 hover:text-white",
    benefits: [
      "Comprehensive sales strategy development",
      "Sales team training and performance optimization",
      "CRM implementation and process improvement",
      "Market analysis and competitive positioning",
    ],
  },
  {
    id: "net",
    title: "Vriksh.Net",
    description:
      "Our services include website development, app development, digital marketing, and UI/UX design.",
    longDescription:
      "Our digital solutions encompass everything from website and app development to comprehensive digital marketing strategies and user experience design. We help businesses establish a strong online presence, engage with their target audience, and leverage digital channels to drive growth.",
    icon: Globe,
    color: "bg-blue-100 text-blue-600",
    hoverColor: "hover:bg-blue-600 hover:text-white",
    benefits: [
      "Custom website and mobile app development",
      "Comprehensive digital marketing campaigns",
      "User-centered UI/UX design services",
      "SEO optimization and social media management",
    ],
  },
  {
    id: "od",
    title: "Vriksh.OD",
    description:
      "We offer corporate training and human resources services to enhance organisational effectiveness.",
    longDescription:
      "Our organizational development services focus on enhancing the effectiveness of your workforce through targeted training programs and strategic HR initiatives. We help businesses build strong teams, develop leadership capabilities, and create a positive workplace culture.",
    icon: Users,
    color: "bg-purple-100 text-purple-600",
    hoverColor: "hover:bg-purple-600 hover:text-white",
    benefits: [
      "Leadership development and executive coaching",
      "Team building and organizational culture enhancement",
      "HR strategy and policy development",
      "Performance management systems implementation",
    ],
  },
  {
    id: "ai-data",
    title: "Vriksh.AI & Data",
    description:
      "We conduct market research to provide insights and recommendations for companies on the best startups and products in specific regions to boost sales.",
    longDescription:
      "Our AI and data services leverage advanced analytics and market research to provide businesses with actionable insights. We help companies identify opportunities, understand market trends, and make data-driven decisions that drive business growth and competitive advantage.",
    icon: Database,
    color: "bg-orange-100 text-orange-600",
    hoverColor: "hover:bg-orange-600 hover:text-white",
    benefits: [
      "Advanced data analytics and business intelligence",
      "AI-powered market research and trend analysis",
      "Predictive modeling and forecasting",
      "Competitive intelligence and opportunity identification",
    ],
  },
];

const ServicesShowCase = () => {
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 ">
            Comprehensive Business Soltuions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-md">
            Explore our range of specializedd services designed to help your
            business thrive in today's competitive landscape.
          </p>
        </div>

        {/* Service Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {services.map((service) => (
            <motion.button
              key={service.id}
              onClick={() => setActiveService(service)}
              className={cn(
                "px-5 py-3 rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer",
                activeService.id === service.id
                  ? `${service.color.split(" ")[0]}
                  text-gray-700 font-medium`
                  : "bg-white hover:bg-emerald-100"
              )}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              <service.icon size={18} />
              <span>{service.title}</span>
            </motion.button>
          ))}
        </div>

        {/* Service Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.5,
            }}
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            {/* Service Description */}
            <div className="order-2 md:order-1">
              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.5,
                }}
              >
                <div
                  className={cn(
                    "h-16 w-16 rounded-lg flex items-center justify-center mb-6",
                    activeService.color
                  )}
                >
                  <activeService.icon className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-semibold text-gray-700 mb-4">
                  {activeService.title}
                </h3>
                <p className="text-gray-600 mb-6 text-base">
                  {activeService.longDescription}
                </p>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4">Key Benefits:</h4>
                  <ul className="space-y-3">
                    {activeService.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        initial={{
                          opacity: 0,
                          x: -10,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: 0.3 + index * 0.1,
                          duration: 0.5,
                        }}
                      >
                        <span
                          className={cn(
                            "h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0",
                            activeService.color
                          )}
                        >
                          {index + 1}
                        </span>
                        <span className="text-gray-500">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <Button
                  asChild
                  className={cn(
                    "transition-colors duration-300",
                    activeService.color.split(" ")[0]
                  )}
                >
                  <Link
                    href={`/services#${activeService.id}`}
                    className="flex items-center gap-2"
                  >
                    Learn more about {activeService.title}
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Service Visuals */}
            <motion.div
              className="order-1 md:order-2 bg-white p-8 rounded-2xl shadow-lg"
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.4,
                duration: 0.5,
              }}
            >
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative">
                <div
                  className={cn(
                    "abosolute inset-0 opacity-10",
                    activeService.color.split(" ")[0]
                  )}
                />
                <activeService.icon
                  className={cn("h-24 w-24", activeService.color.split(" ")[1])}
                />
              </div>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Who is this service for?</h4>
                <p className="text-gray-600 text-sm">
                  {activeService.title} is designed for businesses looking to{" "}
                  {activeService.id === "money"
                    ? "secure funding and optimize financial operations"
                    : activeService.id === "grow"
                    ? "increase sales and improve market penetration"
                    : activeService.id === "net"
                    ? "enhance digital presence and reach more customers online"
                    : activeService.id === "od"
                    ? "develop their teams and improve organizational effectiveness"
                    : "leverage data and AI for better business decisions"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ServicesShowCase;

"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Calendar,
  Award,
  TrendingUp,
  Users,
  Lightbulb,
  Target,
} from "lucide-react";

// Company milestones data
const milestones = [
  {
    year: 1997,
    description: "Vriksh Consulting wPvt. Ltd. Incorporation.",
    icon: Calendar,
    color: "#10b981",
  },
  {
    year: 1998,
    description:
      "Started Sales & Marketing Projects and Business Funding CICO, LG, Hero Honda, Motherson SUMI, Moserbear etc.",
    icon: Award,
    color: "#059669",
  },
  {
    year: 2005,
    description:
      "Started Corporate Training and HR Consulting for organisationslike Airtel, Mother diary, JBM,Lanco, Asian Paint, etc.",
    icon: TrendingUp,
    color: "#047857",
  },
  {
    year: 2009,
    description:
      "Started Corporate Training for PSUs like Bharat Petroleum, GAIL, IOCL, NBCC, etc.",
    icon: Users,
    color: "#065f46",
  },
  {
    year: 2022,
    description: "Re-enforced Sales & Marketing Projects and Business Funding.",
    icon: Lightbulb,
    color: "#047857",
  },
  {
    year: 2024,
    description: "Sales Enablement for Internationl Client in India.",
    icon: Target,
    color: "#10b981",
  },
];

const CompanyJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "-100px 0px",
  });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animation progress based on scroll
  const pathProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  // Responsive SVG dimensions
  const svgWidth = 1000;
  const svgHeight = 600;

  // Responsive card width
  const cardWidth = "w-[80vw] sm:w-[220px] md:w-[230px] lg:w-[250px]";

  // Responsive timeline path
  const timelinePath =
    "M 100,300 C 200,200 300,400 450,300 C 600,200 700,400 800,300";

  return (
    <section
      ref={containerRef}
      className="py-10 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-x-auto relative"
    >
      <div className="container mx-auto px-2 sm:px-4">
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Vriksh Timeline
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            From our humble beginnings to becoming a leading consulting firm,
            explore the evolution of Vriksh Consulting through key milestones in
            our history.
          </p>
        </motion.div>

        {/* Vertical Timeline for Mobile */}
        <div className="sm:hidden flex flex-col items-center gap-6">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              className="flex items-center w-full max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            >
              <div className="flex flex-col items-center mr-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white mb-1"
                  style={{ backgroundColor: milestone.color }}
                >
                  <milestone.icon size={20} />
                </div>
                {index < milestones.length - 1 && (
                  <div className="w-1 h-10 bg-gray-300" />
                )}
              </div>
              <div
                className="bg-white rounded-lg p-4 shadow border-l-4"
                style={{ borderLeftColor: milestone.color }}
              >
                <div className="font-bold text-emerald-700 mb-1">
                  {milestone.year}
                </div>
                <div className="text-xs text-gray-600">
                  {milestone.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SVG Timeline for larger screens */}
        <div className="hidden sm:block relative w-full overflow-x-auto">
          <div
            className="relative mx-auto"
            style={{
              minWidth: "600px",
              maxWidth: "1000px",
              height: "60vw",
              maxHeight: "600px",
              minHeight: "350px",
            }}
          >
            {/* SVG Timeline */}
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-full absolute top-0 left-0"
              style={{ overflow: "visible" }}
              aria-hidden="true"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Decorative circles */}
              <motion.circle
                cx="100"
                cy="100"
                r="50"
                fill="rgba(16, 185, 129, 0.05)"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
              />
              <motion.circle
                cx="800"
                cy="500"
                r="70"
                fill="rgba(16, 185, 129, 0.05)"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.4 }}
              />
              <motion.circle
                cx="450"
                cy="200"
                r="100"
                fill="rgba(16, 185, 129, 0.03)"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.6 }}
              />

              {/* Main timeline path */}
              <motion.path
                d={timelinePath}
                fill="transparent"
                stroke="#e5e7eb"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                style={{ pathLength: pathProgress }}
                transition={{ duration: 1.5 }}
              />

              {/* Animated path overlay */}
              <motion.path
                d={timelinePath}
                fill="transparent"
                stroke="url(#gradientLine)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                style={{ pathLength: pathProgress }}
                transition={{ duration: 1.5 }}
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient
                  id="gradientLine"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
              </defs>

              {/* Milestone nodes */}
              {milestones.map((milestone, index) => {
                const totalItems = milestones.length;
                // Distribute nodes evenly
                const xPos = 100 + (700 / (totalItems - 1)) * index;
                const yPos = 300 + (index % 2 === 0 ? -20 : 20);

                return (
                  <g key={milestone.year}>
                    <motion.circle
                      cx={xPos}
                      cy={yPos}
                      r={activeIndex === index ? 12 : 10}
                      fill={milestone.color}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                      style={{ cursor: "pointer" }}
                    />
                    <motion.text
                      x={xPos}
                      y={yPos + (index % 2 === 0 ? -30 : 50)}
                      textAnchor="middle"
                      fill="#111827"
                      fontSize="14"
                      fontWeight="bold"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    >
                      {milestone.year}
                    </motion.text>
                  </g>
                );
              })}

              {/* Animated particles along the path */}
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.circle
                  key={i}
                  cx="100"
                  cy="300"
                  r="4"
                  fill="#10b981"
                  initial={{ opacity: 0 }}
                  animate={
                    isInView
                      ? {
                          opacity: [0, 1, 0],
                          x: [0, 700],
                          y: [0, -50, 0, 50, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 8,
                    delay: i * 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "linear",
                    times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                  }}
                />
              ))}
            </svg>

            {/* Milestone cards - Responsive positioning */}
            <div className="absolute inset-0 pointer-events-none">
              {milestones.map((milestone, index) => {
                const totalItems = milestones.length;
                // Responsive left position
                const leftPos = `${5 + (80 / (totalItems - 1)) * index}%`;
                // Responsive top offset
                const topOffset = index % 2 === 0 ? "10%" : "65%";

                return (
                  <motion.div
                    key={milestone.year}
                    className={`absolute pointer-events-auto ${index % 2 === 0 ? "origin-bottom" : "origin-top"} ${cardWidth} max-w-[90vw]`}
                    style={{
                      left: leftPos,
                      top: topOffset,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      y: index % 2 === 0 ? -20 : 20,
                    }}
                    animate={
                      isInView
                        ? {
                            opacity:
                              activeIndex === index || activeIndex === null
                                ? 1
                                : 0.6,
                            scale: activeIndex === index ? 1.05 : 1,
                            y: 0,
                          }
                        : {}
                    }
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    <div
                      className={`bg-white rounded-lg p-4 shadow-lg border-l-4 transition-all duration-300 ${
                        activeIndex === index ? "shadow-emerald-100" : ""
                      }`}
                      style={{ borderLeftColor: milestone.color }}
                    >
                      <div className="flex items-center mb-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center mr-2 text-white"
                          style={{ backgroundColor: milestone.color }}
                        >
                          <milestone.icon size={16} />
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-emerald-50 to-transparent opacity-60 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-t from-emerald-50 to-transparent opacity-60 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export default CompanyJourney;

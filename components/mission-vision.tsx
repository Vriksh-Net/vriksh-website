"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Compass,
  Eye,
  Target,
  ArrowRight,
  Lightbulb,
  Award,
  BarChart,
  Globe,
  Users,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import AnimatedSection from "./animated-section";
import AnimatedTextReveal from "./animated-text-reveal";
import ParallaxElement from "./parallax-element";
import FloatingElement from "./floating-elements";
import PerspectiveCard from "./perspective-card";

const MissionVision = () => {
  const [activeTab, setActiveTab] = useState<"mission" | "vision">("mission");
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div className="relative py-24 overflow-hidden" ref={containerRef}>
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gray-50"
        style={{ y: backgroundY }}
      />

      <div className="container relative mx-auto px-4 z-10">
        <AnimatedSection animation="fade" className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <AnimatedTextReveal
              text="Our Mission & Vision"
              tag="span"
              animationType="characters"
              staggerChildren={0.02}
            />
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            <AnimatedTextReveal
              text="Guided by our core principles, we're committed to delivering exceptional value and driving meaningful change for our clients."
              tag="span"
              animationType="words"
              delay={0.5}
            />
          </p>
        </AnimatedSection>

        {/* Interactive tab selection */}
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-16">
          <motion.button
            onClick={() => setActiveTab("mission")}
            className={`relative px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 ${
              activeTab === "mission"
                ? "bg-emerald-500 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-2">
              <Target size={20} />
              Our Mission
            </span>
            {activeTab === "mission" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600"
                layoutId="activeIndicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </motion.button>

          <motion.button
            onClick={() => setActiveTab("vision")}
            className={`relative px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 ${
              activeTab === "vision"
                ? "bg-purple-500 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-2">
              <Eye size={20} />
              Our Vision
            </span>
            {activeTab === "vision" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-purple-600"
                layoutId="activeIndicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </motion.button>
        </div>

        <div className="relative min-h-[600px] overflow-hidden">
          {/* Mission Content */}
          <motion.div
            className="absolute w-full"
            initial={activeTab === "mission" ? "visible" : "hidden"}
            animate={activeTab === "mission" ? "visible" : "hidden"}
            variants={{
              visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              hidden: { opacity: 0, x: -100, transition: { duration: 0.5 } },
            }}
          >
            {activeTab === "mission" && (
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <ParallaxElement direction="up" speed={0.2}>
                    <PerspectiveCard className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-emerald-500">
                      <h3 className="text-2xl font-bold mb-4 text-emerald-700">
                        <AnimatedTextReveal
                          text="Our Mission"
                          tag="span"
                          animationType="words"
                        />
                      </h3>
                      <p className="text-gray-700 font-semibold mb-8 leading-relaxed">
                        <AnimatedTextReveal
                          text="Creating Success."
                          tag="span"
                          animationType="words"
                          delay={0.3}
                        />
                      </p>
                      <p className="text-gray-700 mb-8 leading-relaxed">
                        <AnimatedTextReveal
                          text="Our mission is to create success by empowering businesses to grow, adapt, and thrive.We build internal capabilities, streamline operations, and enable sustainable performance."
                          tag="span"
                          animationType="words"
                          delay={0.3}
                        />
                      </p>
                    </PerspectiveCard>
                  </ParallaxElement>
                </div>

                <div className="order-1 md:order-2 flex justify-center">
                  <ParallaxElement direction="down" speed={0.3}>
                    <div className="relative w-full max-w-md aspect-square perspective-1000">
                      {/* Animated background circles */}
                      <div className="absolute inset-0">
                        <FloatingElement
                          x={5}
                          y={5}
                          duration={6}
                          className="absolute inset-0"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 rounded-full animate-pulse-slow"></div>
                        </FloatingElement>
                        <FloatingElement
                          x={8}
                          y={8}
                          duration={8}
                          delay={0.5}
                          className="absolute inset-4"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 to-emerald-600/30 rounded-full animate-pulse-medium"></div>
                        </FloatingElement>
                        <FloatingElement
                          x={10}
                          y={10}
                          duration={5}
                          delay={1}
                          className="absolute inset-8"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/40 to-emerald-500/40 rounded-full animate-pulse-fast"></div>
                        </FloatingElement>
                      </div>

                      {/* Central icon with 3D effect */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                          rotateY: [0, 10, 0, -10, 0],
                          rotateX: [0, 5, 0, -5, 0],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          ease: "easeInOut",
                        }}
                      >
                        <PerspectiveCard
                          className="bg-white p-8 rounded-full shadow-xl"
                          depth={15}
                        >
                          <Target size={100} className="text-emerald-600" />
                        </PerspectiveCard>
                      </motion.div>

                      {/* Floating elements */}
                      <FloatingElement
                        x={30}
                        y={-20}
                        duration={7}
                        className="absolute top-10 right-0"
                      >
                        <div className="bg-white p-3 rounded-full shadow-lg">
                          <Compass size={30} className="text-emerald-500" />
                        </div>
                      </FloatingElement>

                      <FloatingElement
                        x={-25}
                        y={30}
                        duration={6}
                        delay={1}
                        className="absolute bottom-20 left-5"
                      >
                        <div className="bg-white p-3 rounded-full shadow-lg">
                          <Lightbulb size={30} className="text-emerald-500" />
                        </div>
                      </FloatingElement>

                      <FloatingElement
                        x={20}
                        y={25}
                        duration={8}
                        delay={2}
                        className="absolute bottom-10 right-10"
                      >
                        <div className="bg-white p-3 rounded-full shadow-lg">
                          <BarChart size={30} className="text-emerald-500" />
                        </div>
                      </FloatingElement>

                      {/* Sparkle effects */}
                      <FloatingElement
                        x={15}
                        y={15}
                        duration={3}
                        className="absolute top-1/4 left-1/4"
                      >
                        <Sparkles size={20} className="text-emerald-300" />
                      </FloatingElement>

                      <FloatingElement
                        x={10}
                        y={10}
                        duration={4}
                        delay={1}
                        className="absolute bottom-1/3 right-1/3"
                      >
                        <Sparkles size={15} className="text-emerald-300" />
                      </FloatingElement>
                    </div>
                  </ParallaxElement>
                </div>
              </div>
            )}
          </motion.div>

          {/* Vision Content */}
          <motion.div
            className="absolute w-full"
            initial={activeTab === "vision" ? "visible" : "hidden"}
            animate={activeTab === "vision" ? "visible" : "hidden"}
            variants={{
              visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              hidden: { opacity: 0, x: 100, transition: { duration: 0.5 } },
            }}
          >
            {activeTab === "vision" && (
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                  <ParallaxElement direction="down" speed={0.3}>
                    <div className="relative w-full max-w-md aspect-square perspective-1000">
                      {/* Animated background circles */}
                      <div className="absolute inset-0">
                        <FloatingElement
                          x={5}
                          y={5}
                          duration={6}
                          className="absolute inset-0"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-700/20 rounded-full animate-pulse-slow"></div>
                        </FloatingElement>
                        <FloatingElement
                          x={8}
                          y={8}
                          duration={8}
                          delay={0.5}
                          className="absolute inset-4"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-indigo-600/30 rounded-full animate-pulse-medium"></div>
                        </FloatingElement>
                        <FloatingElement
                          x={10}
                          y={10}
                          duration={5}
                          delay={1}
                          className="absolute inset-8"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-300/40 to-indigo-500/40 rounded-full animate-pulse-fast"></div>
                        </FloatingElement>
                      </div>

                      {/* Central icon with 3D effect */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                          rotateY: [0, 10, 0, -10, 0],
                          rotateX: [0, 5, 0, -5, 0],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          ease: "easeInOut",
                        }}
                      >
                        <PerspectiveCard
                          className="bg-white p-8 rounded-full shadow-xl"
                          depth={15}
                        >
                          <Eye size={100} className="text-purple-600" />
                        </PerspectiveCard>
                      </motion.div>

                      {/* Floating elements */}
                      <FloatingElement
                        x={30}
                        y={-20}
                        duration={7}
                        className="absolute top-10 right-0"
                      >
                        <div className="bg-white p-3 rounded-full shadow-lg">
                          <Award size={30} className="text-purple-500" />
                        </div>
                      </FloatingElement>

                      <FloatingElement
                        x={-25}
                        y={30}
                        duration={6}
                        delay={1}
                        className="absolute bottom-20 left-5"
                      >
                        <div className="bg-white p-3 rounded-full shadow-lg">
                          <Globe size={30} className="text-purple-500" />
                        </div>
                      </FloatingElement>

                      <FloatingElement
                        x={20}
                        y={25}
                        duration={8}
                        delay={2}
                        className="absolute bottom-10 right-10"
                      >
                        <div className="bg-white p-3 rounded-full shadow-lg">
                          <TrendingUp size={30} className="text-purple-500" />
                        </div>
                      </FloatingElement>

                      {/* Sparkle effects */}
                      <FloatingElement
                        x={15}
                        y={15}
                        duration={3}
                        className="absolute top-1/4 left-1/4"
                      >
                        <Sparkles size={20} className="text-purple-300" />
                      </FloatingElement>

                      <FloatingElement
                        x={10}
                        y={10}
                        duration={4}
                        delay={1}
                        className="absolute bottom-1/2 right-1/2"
                      >
                        <Sparkles size={15} className="text-purple-300" />
                      </FloatingElement>
                    </div>
                  </ParallaxElement>
                </div>

                <div>
                  <ParallaxElement direction="up" speed={0.2}>
                    <PerspectiveCard className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-purple-500">
                      <h3 className="text-2xl font-bold mb-4 text-purple-700">
                        <AnimatedTextReveal
                          text="Our Vision"
                          tag="span"
                          animationType="words"
                        />
                      </h3>
                      <p className="text-gray-700 mb-8 leading-relaxed">
                        <AnimatedTextReveal
                          text="Creating success by taking responsibility for helping our clients scale from small to big by building impactful growth networks, and eliminating bottlenecks of inance,knowledge-competency-skills, and governance for them."
                          tag="span"
                          animationType="words"
                          delay={0.3}
                        />
                      </p>
                      <p className="text-gray-700 mb-8 leading-relaxed">
                        <AnimatedTextReveal
                          text="Helping our customers build CAPACITY… the ability to “MORE &amp; MORE, do it BETTER &amp; BETTER, do it FASTER &amp; FASTER, but do it at a LESSER &amp; LESSER COST TO THE COMPANY."
                          tag="span"
                          animationType="words"
                          delay={0.3}
                        />
                      </p>
                      <p className="text-gray-700 mb-8 leading-relaxed">
                        <AnimatedTextReveal
                          text="We want a company that our people are proud of and committed to, where all employees have an opportunity to contribute, learn, grow and advance based on merit. We want all our people to feel respected, treated fairly, listened to and involved.Above all, we want satisfaction from accomplishment and friendships and to have fun in our endeavours."
                          tag="span"
                          animationType="words"
                          delay={0.3}
                        />
                      </p>
                    </PerspectiveCard>
                  </ParallaxElement>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;

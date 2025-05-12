"use client";

import React from "react";
import { motion } from "framer-motion";
import { getReducedMotion } from "@/lib/animation-utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: "words" | "letters" | "lines";
  once?: boolean;
  highlightClass?: string; // Add this property
  highlightWords?: string[];
}

const AnimatedText = ({
  text,
  className = "",
  delay = 0,
  type = "words",
  once = true,

}: AnimatedTextProps) => {
  const prefersReducedMotion = getReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{text}</div>;
  }

  // Split text based on type
  let items: string[] = [];

  if (type === "words") {
    items = text.split(" ");
  } else if (type === "letters") {
    items = text.split("");
  } else if (type === "lines") {
    items = text.split("\n");
  }

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay * i,
      },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
      }}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ marginRight: type === "words" ? "0.25em" : undefined }}
        >
          {item}
          {type === "lines" && index < items.length - 1 ? <br /> : null}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;

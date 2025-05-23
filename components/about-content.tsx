
"use client";

import Image from "next/image";
import MissionVision from "./mission-vision";
import AnimatedSection from "./animated-section";


const AboutContent = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedSection animation="slide">
            <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
            <p className="text-gray-600 mb-4">
              Vriksh Consulting is a premier business consulting firm dedicated
              to helping businesses and startups achieve sustainable growth and
              success. Founded with a vision to empower organizations through
              strategic guidance and innovative solutions, we have established
              ourselves as trusted advisors to businesses across various
              industries.
            </p>
            <p className="text-gray-600">
              Our team of experienced professionals brings together diverse
              expertise in finance, sales, digital technology, organizational
              development, and market research. This multidisciplinary approach
              allows us to provide comprehensive solutions that address the
              complex challenges faced by modern businesses.
            </p>
          </AnimatedSection>
          <AnimatedSection
            animation="fade"
            delay={0.2}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <Image
              src="/about.gif"
              alt="About Vriksh Consulting"
              fill
              className="object-cover"
              unoptimized
            />
          </AnimatedSection>
        </div>

        <MissionVision />
      </div>
    </section>
  );
};

export default AboutContent;

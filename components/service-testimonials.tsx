"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sanjay Patil",
    position: "Nirmal Seeds",
    image: "/testimonial/sp.png",
    quote: `I’d like to brief my thoughts on association with Vriksh consulting 
    It’s been since  last 15 years I know Mr. Bhattacharya ji & Vriksh Consulting 
    In my early phase of my career undergone training what I like most is 
    This is highly a interactive sessions making sure that each individual would participate 
    Style of explanations and training is highly effective and easy to understand
    This training has really added decent value to improve our skill set  
    Recently we’ve organised training for our sales team & the feedback we got from the team is too encouraging `,
    rating: 5,
    service: "Vriksh.Grow",
  },
  {
    id: 2,
    name: "",
    position: "Founder, InnovateLabs",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "The funding solutions provided by Vriksh.Money were exactly what our startup needed. The team guided us through the entire process, making it seamless and stress-free. Highly recommended!",
    rating: 5,
    service: "Vriksh.Money",
  },
  {
    id: 3,
    name: "Priya Patel",
    position: "Marketing Director, GlobalReach",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Working with Vriksh.Net for our digital transformation was one of the best decisions we made. Their team delivered an exceptional website and digital marketing strategy that significantly improved our online presence.",
    rating: 5,
    service: "Vriksh.Net",
  },
];

const ServiceTestimonials = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay]);

  const next = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setAutoplay(false);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-20 bg-emerald-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block px-4 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Client Success Stories
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Hear from businesses that have achieved remarkable results with our
            services.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Large quote icon */}
          <div className="absolute -top-10 -left-10 text-emerald-200 opacity-50">
            <Quote size={80} />
          </div>

          {/* Testimonial Slider */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 md:p-12 rounded-2xl shadow-lg"
              >
                <div className="grid md:grid-cols-5 gap-8 items-center">
                  <div className="md:col-span-2">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                        <Image
                          src={
                            testimonials[current].image || "/placeholder.svg"
                          }
                          alt={testimonials[current].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-bold">
                        {testimonials[current].name}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {testimonials[current].position}
                      </p>
                      <div className="flex items-center mb-2">
                        {[...Array(testimonials[current].rating)].map(
                          (_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className="text-amber-400 fill-amber-400"
                            />
                          )
                        )}
                      </div>
                      <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                        {testimonials[current].service}
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <blockquote className="text-lg italic text-gray-700">
                      "{testimonials[current].quote}"
                    </blockquote>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-center mt-8 gap-4">
              <motion.button
                onClick={prev}
                className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </motion.button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setAutoplay(false);
                      setCurrent(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      current === index
                        ? "w-6 bg-emerald-600"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <motion.button
                onClick={next}
                className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceTestimonials;

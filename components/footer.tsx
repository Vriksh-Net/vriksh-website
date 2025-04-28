"use client";

import React from "react";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Youtube,
} from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "./animated-section";
import { staggerContainerVariants } from "@/lib/animation-utils";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/share/1AhQ9ZVqwa/", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/vriksh-net-88802a347/", label: "Linkedin" },
    { icon: Instagram, href: "https://www.instagram.com/vriksh.net1/", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@vriksh.consulting", label: "Youtube" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Insights", href: "/insights" },
    { name: "Contact Us", href: "/contact" },
  ];

  const services = [
    { name: "Vriksh.Money", href: "/services#money" },
    { name: "Vriksh.Grow", href: "/services#grow" },
    { name: "Vriksh.Net", href: "/services#net" },
    { name: "Vriksh.OD", href: "/services#od" },
    { name: "Vriksh.AI & Data", href: "/services#ai-data" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
      {/*//! Background Color */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="footer-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      {/* Wave top decoration */}
      <div className="relative w-full h-12 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#111827"
            fillOpacity="1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Company Info */}
          <AnimatedSection animation="slide">
            <div className="mb-6">
              <div className="relative h-10 w-32">
                <Image
                  src="/placeholder.svg?height=40&width=128"
                  alt="logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </div>
            <p className="mb-6">
              Helping businesses grow through comprehnsive cosulting solutions
              and expert guidance.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.div
                  key={social.label}
                  whileHover={{ y: -3, scale: 1.2, color: "#10b981" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link
                    href={social.href}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    <social.icon size={20} />
                    <span className="sr-only">{social.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Quick Links */}
          <AnimatedSection animation="slide" delay={0.1}>
            <h3 className="text-white text-lg font-semibold mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 5, color: "#10b981" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link
                    href={link.href}
                    className="hover:text-emerald-400 transition-colors inline-block relative"
                  >
                    <span>{link.name}</span>
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 bg-emerald-400 w-0"
                      initial={{ width: "0%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Services */}
          <AnimatedSection animation="slide" delay={0.2}>
            <h3 className="text-white text-lg font-semibold mb-6">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <motion.li
                  key={service.name}
                  whileHover={{ x: 5, color: "#10b891" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link
                    href={service.href}
                    className="hover:text-emerald-400 transition-colors inline-block relative"
                  >
                    <span>{service.name}</span>
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 bg-emerald-400 w-0"
                      initial={{ width: "0%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection animation="slide" delay={0.3}>
            <h3 className="text-white text-lg font-semibold mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <motion.li
                className="flex items-start"
                whileHover={{ x: 5, color: "#10b981" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <MapPin
                  size={20}
                  className="mr-3 mt-1 flex-shrink-0 text-emerald-400"
                />
                <span>
                  I – 1691, Chittaranjan Park,
                  <br />
                  New Delhi – 110019, India
                </span>
              </motion.li>
              <motion.li
                className="flex items-start"
                whileHover={{ x: 5, color: "#10b981" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Phone
                  size={20}
                  className="mr-3 mt-1 flex-shrink-0 text-emerald-400"
                />
                <span>+91-11-35724258</span>
              </motion.li>
              <motion.li
                className="flex items-start"
                whileHover={{ x: 5, color: "#10b981" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Mail
                  size={20}
                  className="mr-3 mt-1 flex-shrink-0 text-emerald-400"
                />
                <span className="cursor-pointer">info@vrikshconsulting.com</span>
              </motion.li>
            </ul>
          </AnimatedSection>
        </motion.div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            &copy; {currentYear} Vriksh Consulting. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

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
  const WhatsAppIcon = () => (
    <svg
      height="30px"
      width="30px"
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className=""
    >
      <g fill="none" stroke="none" strokeWidth="1">
        <g>
          <path
            d="M30.0712615,46.2210462 C27.2108308,46.2210462 24.5235692,45.4899692 22.1856,44.2068923 L13.1538462,47.0769231 L16.0980923,38.3918769 C14.6130462,35.9523692 13.7575385,33.0915692 13.7575385,30.0336 C13.7575385,21.0934154 21.0612923,13.8461538 30.0716308,13.8461538 C39.0808615,13.8461538 46.3846154,21.0934154 46.3846154,30.0336 C46.3846154,38.9737846 39.0812308,46.2210462 30.0712615,46.2210462 Z M30.0712615,16.4241231 C22.5079385,16.4241231 16.3558154,22.5293538 16.3558154,30.0336 C16.3558154,33.0114462 17.3265231,35.7692308 18.9681231,38.0130462 L17.2548923,43.0670769 L22.5252923,41.3918769 C24.6912,42.8137846 27.2854154,43.6430769 30.0712615,43.6430769 C37.6334769,43.6430769 43.7867077,37.5382154 43.7867077,30.0339692 C43.7867077,22.5297231 37.6334769,16.4241231 30.0712615,16.4241231 L30.0712615,16.4241231 Z M38.3088,33.7617231 C38.2083692,33.5966769 37.9417846,33.4969846 37.5426462,33.2987077 C37.1424,33.1004308 35.1758769,32.1400615 34.8099692,32.0082462 C34.4429538,31.8760615 34.176,31.8092308 33.9097846,32.2065231 C33.6435692,32.6038154 32.8770462,33.4969846 32.6433231,33.7617231 C32.4099692,34.0268308 32.1769846,34.0600615 31.7771077,33.8614154 C31.3776,33.6631385 30.0889846,33.2440615 28.5611077,31.8923077 C27.3725538,30.8407385 26.5698462,29.5425231 26.3368615,29.1448615 C26.1035077,28.7479385 26.3121231,28.5334154 26.5122462,28.3358769 C26.6920615,28.1579077 26.9121231,27.8724923 27.1122462,27.6409846 C27.3123692,27.4091077 27.3788308,27.2440615 27.5117538,26.9789538 C27.6454154,26.7142154 27.5785846,26.4827077 27.4785231,26.2836923 C27.3784615,26.0854154 26.5783385,24.1329231 26.2452923,23.3383385 C25.9122462,22.5444923 25.5795692,22.6766769 25.3458462,22.6766769 C25.1124923,22.6766769 24.8459077,22.6434462 24.5793231,22.6434462 C24.3127385,22.6434462 23.8792615,22.7427692 23.5126154,23.1396923 C23.1463385,23.5369846 22.1136,24.4969846 22.1136,26.4491077 C22.1136,28.4016 23.5458462,30.288 23.7463385,30.5523692 C23.9460923,30.8167385 26.5118769,34.9536 30.5767385,36.5424 C34.6430769,38.1308308 34.6430769,37.6009846 35.3763692,37.5348923 C36.1085538,37.4688 37.7412923,36.5752615 38.0754462,35.6488615 C38.4081231,34.7217231 38.4081231,33.9271385 38.3088,33.7617231 L38.3088,33.7617231 Z"
            fill="#FFFFFF"
          />
        </g>
      </g>
    </svg>
  );
  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/1AhQ9ZVqwa/",
      label: "Facebook",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/vriksh-net-88802a347/",
      label: "Linkedin",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/vriksh.net1/",
      label: "Instagram",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/@vriksh.consulting",
      label: "Youtube",
    },
    {
      icon: WhatsAppIcon,
      href: "https://wa.me/919560111351",
      label: "Whatsapp",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Insights", href: "/insights" },
    { name: "Contact Us", href: "/contact" },
  ];

  const services = [
    { name: "Vriksh.Grow", href: "/services#grow" },
    { name: "Vriksh.Money", href: "/services#money" },
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
              <div className="relative h-20 w-50 right-8">
                <Image
                  src="/Giflogo.gif"
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
                  className="flex items-center justify-center"
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
                <span className="cursor-pointer">
                  info@vrikshconsulting.com
                </span>
              </motion.li>
            </ul>
          </AnimatedSection>
        </motion.div>

        <div className="border-t border-gray-500 mt-12 pt-8 text-center">
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

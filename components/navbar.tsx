"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Insights", href: "/insights" },
    { name: "Events", href: "/events" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Check if the current path matches the nav item
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <motion.div
              className="relative h-16 w-48"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image
                src="/Giflogo.gif"
                alt="Vriksh Consulting Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium transition-colors group"
              >
                <motion.span
                  className={`${
                    isActive(link.href)
                      ? "text-emerald-600 font-semibold"
                      : "text-gray-700 group-hover:text-emerald-600"
                  } transition-colors duration-200
                  `}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {link.name}
                </motion.span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"
                  initial={{ width: isActive(link.href) ? "100%" : "0%" }}
                  animate={{ width: isActive(link.href) ? "100%" : "0%" }}
                  whileHover={{ width: "100%" }}
                />
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Button
              asChild
              className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2"
            >
              <Link href="/brochures">
                <FileText size={16} className="mr-1" />
                Brochure
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-emerald-600 focus:outline-none"
              whileHover={{ scale: 1.1, rotate: isOpen ? 0 : 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden py-4 pb-6 space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`block px-2 py-2 text-sm font-medium transition-all duration-200 hover:pl-4 hover:text-emerald-600 ${
                      isActive(link.href)
                        ? "text-emerald-600 font-semibold bg-emerald-50 pl-4 rounded-md"
                        : "text-gray-700"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                className="pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <Button
                  asChild
                  className="w-full bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-200/30 flex items-center justify-center gap-2"
                >
                  <Link href="/brochures">
                    <FileText size={16} className="mr-1" />
                    Brochure
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Twitter } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Shubhashish Bhattacharya",
    bio: "With over 15 years of experience in business consulting, John leads our team with vision and expertise.",
    image: "/SB.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 2,
    name: "Debashish Bhattacharya",
    bio: "Sarah brings extensive experience in financial services and helps clients navigate complex funding challenges.",
    image: "/DB.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 3,
    name: "Sugata Haldar",
    bio: "Michael leads our digital transformation initiatives with innovative approaches to technology integration.",
    image: "/SG.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 4,
    name: "Kaushik Chatopadhyay",
    bio: "Priya oversees our market research and data analytics, providing clients with actionable insights.",
    image: "/kc.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },

  {
    id: 5,
    name: "Rajendara Tondapurkar",
    bio: "With over 15 years of experience in business consulting, John leads our team with vision and expertise.",
    image: "/ttt.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 6,
    name: "Suvobroto Chakraborty",
    bio: "Priya oversees our market research and data analytics, providing clients with actionable insights.",
    image: "/sc.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  }, 
   {
    id: 7,
    name: "V.S Tomar",
    bio: "Priya oversees our market research and data analytics, providing clients with actionable insights.",
    image: "/t.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 8,
    name: "Ranjan Boral",
    bio: "Priya oversees our market research and data analytics, providing clients with actionable insights.",
    image: "/rb.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },

  {
    id: 9,
    name: "Sushmita Dey",
    bio: "Michael leads our digital transformation initiatives with innovative approaches to technology integration.",
    image: "/SD.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 10,
    name: "Anirvan Roy",
    bio: "Priya oversees our market research and data analytics, providing clients with actionable insights.",
    image: "/AR.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
    {
    id: 11,
    name: "Anshuman Gupta",
    bio: "Sarah brings extensive experience in financial services and helps clients navigate complex funding challenges.",
    image: "/AG.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
     
  
  {
    id: 12,
    name: "Anindita Chakraborty",
    bio: "Priya oversees our market research and data analytics, providing clients with actionable insights.",
    image: "/ac.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 13,
    name: "Chandan Kumar",
    bio: "Priya oversees our market research and data analytics, providing clients with actionable insights.",
    image: "/ck.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
 
];

const Team = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the experienced professionals who lead our company and drive
            our mission forward.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              className="bg-white rounded-lg overflow-hidden shadow-md group"
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="relative h-64 w-full overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-all duration-500"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex justify-center space-x-3">
                    <motion.a
                      href={member.social.linkedin}
                      className="bg-white/90 text-emerald-600 p-2 rounded-full hover:bg-emerald-600 hover:text-white transition-colors duration-200"
                      aria-label={`${member.name}'s LinkedIn profile`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin size={18} />
                    </motion.a>
                    <motion.a
                      href={member.social.twitter}
                      className="bg-white/90 text-emerald-600 p-2 rounded-full hover:bg-emerald-600 hover:text-white transition-colors duration-200"
                      aria-label={`${member.name}'s Twitter profile`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Twitter size={18} />
                    </motion.a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1 group-hover:text-emerald-600 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;

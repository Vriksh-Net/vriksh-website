"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Linkedin, Youtube } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Shubhashish Bhattacharya",
    bio: "Veteran business leader and coach with 34 years of experience, including 15 years in CEO/CXO roles and 26 years leading Vriksh Consulting. Mentor to startups and advisor to top corporates and educational institutions on leadership, strategy, and talent development.",
    image: "/team/SB.jpg",
    social: {
      linkedin: "https://www.linkedin.com/company/vriksh-consulting/",
      instagram: "https://www.instagram.com/vriksh.net1/",
      youtube: "https://www.youtube.com/@vriksh.consulting",
    },
  },
  {
    id: 2,
    name: "Debashish Bhattacharya",
    bio: "Seasoned consulting leader with 30 years' experience transforming businesses through strategy, mentoring, and technology-led solutions. Expert in aligning processes with business goals and enabling global consulting talent across SAP and Siemens PLM ecosystems.",
    image: "/team/DB.jpg",
    social: {
      linkedin: "https://www.linkedin.com/company/vriksh-consulting/",
      instagram: "https://www.instagram.com/vriksh.net1/",
      youtube: "https://www.youtube.com/@vriksh.consulting",
    },
  },
  {
    id: 3,
    name: "Kaushik Chatopadhyay",
    bio: "Chartered Accountant with over 40 years of international experience. He is a serial entrepreneur and financial strategist known for his visionary approach and business acumen.",
    image: "/team/kc.png",
    social: {
      linkedin: "https://www.linkedin.com/company/vriksh-consulting/",
      instagram: "https://www.instagram.com/vriksh.net1/",
      youtube: "https://www.youtube.com/@vriksh.consulting",
    },
  },
  {
    id: 4,
    name: "Sugata Halder",
    bio: "Seasoned HR and business strategy consultant with 32 years of experience leading transformation across telecom, manufacturing, and consulting sectors. Currently with Vriksh Consulting, he brings deep expertise in strategic HR, marketing, and organizational development.",
    image: "/team/SG.jpg",
    social: {
      linkedin: "https://www.linkedin.com/company/vriksh-consulting/",
      instagram: "https://www.instagram.com/vriksh.net1/",
      youtube: "https://www.youtube.com/@vriksh.consulting",
    },
  },
  {
    id: 5,
    name: "Suvobroto Chakraborty",
    bio: "Over 45 years of expertise in sales and marketing, with unmatched leadership qualities and project management skills. His strategic vision and management abilities have consistently driven success across various initiatives.",
    image: "/team/sc.jpg",
    social: {
      linkedin: "https://www.linkedin.com/company/vriksh-consulting/",
      instagram: "https://www.instagram.com/vriksh.net1/",
      youtube: "https://www.youtube.com/@vriksh.consulting",
    },
  },
  {
    id: 6,
    name: "S.N. Jain",
    bio: "Over 40 years of experience across industries, including leadership roles as CEO of several MNCs. He is a seasoned mentor and consultant, specializing in strategy and carbon emission footprint management.",
    image: "/team/sp.png",
    social: {
      linkedin: "https://www.linkedin.com/company/vriksh-consulting/",
      instagram: "https://www.instagram.com/vriksh.net1/",
      youtube: "https://www.youtube.com/@vriksh.consulting",
    },
  },
  {
    id: 7,
    name: "Shubhendu Mukherjee",
    bio: "Specializing in strategic sales, digital transformation, and people development solutions. Experienced in managing training programs across leadership, remote selling, and behavioural development.",
    image: "/team/sm.png",
    social: {
      linkedin: "https://www.linkedin.com/company/vriksh-consulting/",
      instagram: "https://www.instagram.com/vriksh.net1/",
      youtube: "https://www.youtube.com/@vriksh.consulting",
    },
  },
  {
    id: 8,
    name: "V.S Tomar",
    bio: "Retired from Indian Telecom Services, has extensive expertise in the latest technologies and a strong industry network. He has been a key mentor in government licensing and project execution.",
    image: "/team/vs.jpg",
    social: {
      linkedin: "https://www.linkedin.com/company/vriksh-consulting/",
      instagram: "https://www.instagram.com/vriksh.net1/",
      youtube: "https://www.youtube.com/@vriksh.consulting",
    },
  },
  {
    id: 9,
    name: "Rajendara Tondapurkar",
    bio: "Seasoned professional with expertise in developing customer bases for sheet piles, flat products, and wire rods across multiple regions. He has secured key government approvals and successfully represented the company in central and state government authorities, driving business growth and strategic partnerships.",
    image: "/team/rt.png",
    social: {
      linkedin: "https://www.linkedin.com/company/vriksh-consulting/",
      instagram: "https://www.instagram.com/vriksh.net1/",
      youtube: "https://www.youtube.com/@vriksh.consulting",
    },
  },
  {
    id: 10,
    name: "Anirvan Roy",
    bio: "Dynamic business development professional with 25+ years of global experience across emerging technologies and innovative business models. Versatile team player with a proven track record in sales management across diverse industries, including eLearning, LMS, and interpretation systems.",
    image: "/team/AR.jpg",
    social: {
      linkedin: "https://www.linkedin.com/company/vriksh-consulting/",
      instagram: "https://www.instagram.com/vriksh.net1/",
      youtube: "https://www.youtube.com/@vriksh.consulting",
    },
  },
  {
    id: 11,
    name: "Anshuman Gupta",
    bio: "Anshuman Gupta is an experienced corporate trainer and HR consultant with over 20 years in the industry. He is a Certified NLP Master Practitioner, POSH Trainer, Mercuri Certified Sales Trainer, Certified HRBP, and a Mental Health Practitioner (EFT, TFT, CBT, REBT).",
    image: "/team/AG.jpg",
    social: {
      linkedin: "https://www.linkedin.com/company/vriksh-consulting/",
      instagram: "https://www.instagram.com/vriksh.net1/",
      youtube: "https://www.youtube.com/@vriksh.consulting",
    },
  },

  {
    id: 12,
    name: "Ranjan Boral",
    bio: "Seasoned finance professional with in-depth expertise in GST, income tax, accounts, and corporate compliances. He is the backbone of the team, ensuring financial accuracy and regulatory adherence.",
    image: "/team/rb.png",
    social: {
      linkedin: "https://www.linkedin.com/company/vriksh-consulting/",
      instagram: "https://www.instagram.com/vriksh.net1/",
      youtube: "https://www.youtube.com/@vriksh.consulting",
    },
  },
  {
    id: 13,
    name: "Mudit Srivastava",
    bio: "Postgraduate from IMT Ghaziabad with over 25 years of experience in the financial services industry. Brings extensive expertise with more than 9 years in the general insurance sector and over 16 years in banking, including more than a decade in the credit department. Proven track record in both branch banking operations and credit management.",
    image: "/team/ms.png",
    social: {
      linkedin: "https://www.linkedin.com/company/vriksh-consulting/",
      instagram: "https://www.instagram.com/vriksh.net1/",
      youtube: "https://www.youtube.com/@vriksh.consulting",
    },
  },
  {
    id: 14,
    name: "Chandan Kumar",
    bio: "Seasoned sales professional with 20 years of experience in construction chemicals, government projects, and the automobile industry. He specializes in driving business growth through strategic client engagement and end-to-end project management.",
    image: "/team/ck.jpg",
    social: {
      linkedin: "https://www.linkedin.com/company/vriksh-consulting/",
      instagram: "https://www.instagram.com/vriksh.net1/",
      youtube: "https://www.youtube.com/@vriksh.consulting",
    },
  },
  {
    id: 15,
    name: "Anindita Chakraborty",
    bio: "Anindita has 20 years of experience in construction chemical sales, with unmatched market knowledge and a strong industry network. Her go-getter approach strengthens the sales team with valuable insights and application expertise.",
    image: "/team/ac.jpg",
    social: {
      linkedin: "https://www.linkedin.com/company/vriksh-consulting/",
      instagram: "https://www.instagram.com/vriksh.net1/",
      youtube: "https://www.youtube.com/@vriksh.consulting",
    },
  },

  {
    id: 16,
    name: "Sushmita Dey",
    bio: "Specializing in strategic sales, digital transformation, and people development solutions. Experienced in managing training programs across leadership, remote selling, and behavioural development.",
    image: "/team/SD.jpg",
    social: {
      linkedin: "https://www.linkedin.com/company/vriksh-consulting/",
      instagram: "https://www.instagram.com/vriksh.net1/",
      youtube: "https://www.youtube.com/@vriksh.consulting",
    },
  },
];

const Team = () => {
  return (
    <section className="py-20 bg-white">
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
              <div className="relative h-90 w-full overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-all duration-500 "
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
                      href={member.social.instagram}
                      className="bg-white/90 text-emerald-600 p-2 rounded-full hover:bg-emerald-600 hover:text-white transition-colors duration-200"
                      aria-label={`${member.name}'s Instagram profile`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Instagram size={18} />
                    </motion.a>
                    <motion.a
                      href={member.social.youtube}
                      className="bg-white/90 text-emerald-600 p-2 rounded-full hover:bg-emerald-600 hover:text-white transition-colors duration-200"
                      aria-label={`${member.name}'s Youtube profile`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Youtube size={18} />
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

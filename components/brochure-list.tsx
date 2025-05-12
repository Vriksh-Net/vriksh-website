"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  FileBarChart,
  FileSpreadsheet,
  FileImage,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedSection from "@/components/animated-section";
import { staggerContainerVariants } from "@/lib/animation-utils";

const brochures = [
  {
    id: "company-profile",
    title: "Company Profile",
    description:
      "Learn about our company history, mission, values, and services.",
    icon: FileText,
    category: "company",
    fileSize: "3.2 MB",
    fileType: "PDF",
    downloadUrl: "#",
  },
  {
    id: "services-overview",
    title: "Services Overview",
    description: "Detailed information about all our consulting services.",
    icon: FileBarChart,
    category: "company",
    fileSize: "2.8 MB",
    fileType: "PDF",
    downloadUrl: "#",
  },
  {
    id: "case-studies",
    title: "Case Studies",
    description: "Success stories and results from our client engagements.",
    icon: FileSpreadsheet,
    category: "resources",
    fileSize: "4.5 MB",
    fileType: "PDF",
    downloadUrl: "#",
  },
  {
    id: "financial-services",
    title: "Financial Services",
    description: "Detailed brochure about our Vriksh.Money services.",
    icon: FileText,
    category: "services",
    fileSize: "1.8 MB",
    fileType: "PDF",
    downloadUrl: "#",
  },
  {
    id: "sales-enablement",
    title: "Sales Enablement",
    description: "Learn about our Vriksh.Grow services and methodologies.",
    icon: FileText,
    category: "services",
    fileSize: "2.1 MB",
    fileType: "PDF",
    downloadUrl: "#",
  },
  {
    id: "digital-solutions",
    title: "Digital Solutions",
    description: "Overview of our Vriksh.Net digital transformation services.",
    icon: FileText,
    category: "services",
    fileSize: "2.4 MB",
    fileType: "PDF",
    downloadUrl: "#",
  },
  {
    id: "annual-report",
    title: "Annual Report 2024",
    description:
      "Our latest annual report with financial highlights and achievements.",
    icon: FileBarChart,
    category: "resources",
    fileSize: "5.6 MB",
    fileType: "PDF",
    downloadUrl: "#",
  },
  {
    id: "industry-insights",
    title: "Industry Insights",
    description:
      "Research and analysis on current industry trends and forecasts.",
    icon: FileSpreadsheet,
    category: "resources",
    fileSize: "3.7 MB",
    fileType: "PDF",
    downloadUrl: "#",
  },
];

const BrochureList = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredBrochures =
    activeTab === "all"
      ? brochures
      : brochures.filter((brochure) => brochure.category === activeTab);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="slide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Download Our Resources</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Access our brochures and resources to learn more about our
              services, expertise, and success stories.
            </p>
          </div>
        </AnimatedSection>

        <div className="mb-12">
          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <div className="flex justify-center">
              <TabsList className="bg-white border border-gray-200">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-600"
                >
                  All Brochures
                </TabsTrigger>
                <TabsTrigger
                  value="company"
                  className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-600"
                >
                  Company
                </TabsTrigger>
                <TabsTrigger
                  value="services"
                  className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-600"
                >
                  Services
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-600"
                >
                  Resources
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-8">
              <BrochureGrid brochures={filteredBrochures} />
            </TabsContent>
            <TabsContent value="company" className="mt-8">
              <BrochureGrid brochures={filteredBrochures} />
            </TabsContent>
            <TabsContent value="services" className="mt-8">
              <BrochureGrid brochures={filteredBrochures} />
            </TabsContent>
            <TabsContent value="resources" className="mt-8">
              <BrochureGrid brochures={filteredBrochures} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="text-center mt-16 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <FileImage size={48} className="mx-auto text-emerald-600 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Need Custom Materials?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            If you need specific information or customized materials for your
            business needs, our team is ready to help.
          </p>
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <a href="/contact" className="flex items-center gap-2">
              <ExternalLink size={16} />
              Contact Us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

interface Brochure {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size: number }>;
  category: string;
  fileSize: string;
  fileType: string;
  downloadUrl: string;
}

const BrochureGrid = ({ brochures }: { brochures: Brochure[] }) => {
  return (
    <motion.div
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {brochures.map((brochure, index) => (
        <motion.div
          key={brochure.id}
          className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
        >
          <div className="p-6">
            <div className="flex items-start">
              <div className="h-12 w-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mr-4 flex-shrink-0">
                <brochure.icon size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{brochure.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {brochure.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="mr-3">{brochure.fileType}</span>
                  <span>{brochure.fileSize}</span>
                </div>
              </div>
            </div>
            <Button
              asChild
              className="w-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200"
            >
              <a
                href={brochure.downloadUrl}
                className="flex items-center justify-center gap-2"
              >
                <Download size={16} />
                Download
              </a>
            </Button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BrochureList;

"use client"

import { motion } from "framer-motion"
import { CheckCircle, ArrowRight } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Discovery",
    description: "We begin by understanding your business needs, challenges, and goals through in-depth consultations.",
    icon: "🔍",
  },
  {
    id: 2,
    title: "Strategy Development",
    description: "Our experts create a customized strategy tailored to your specific business requirements.",
    icon: "📝",
  },
  {
    id: 3,
    title: "Implementation",
    description: "We execute the strategy with precision, keeping you informed throughout the process.",
    icon: "⚙️",
  },
  {
    id: 4,
    title: "Evaluation & Optimization",
    description: "We measure results, gather feedback, and make continuous improvements to maximize outcomes.",
    icon: "📊",
  },
]

const ServiceProcess = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our Service Process
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We follow a structured approach to ensure consistent, high-quality results for all our clients.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0" />

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative z-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl mr-4">
                      {step.icon}
                    </div>
                    <div className="flex items-center">
                      <span className="bg-emerald-600 text-white text-sm font-medium w-6 h-6 rounded-full flex items-center justify-center">
                        {step.id}
                      </span>
                      {index < steps.length - 1 && (
                        <ArrowRight className="hidden md:block ml-2 text-gray-400" size={16} />
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                  <div className="mt-auto pt-4">
                    <div className="flex items-center text-emerald-600 text-sm font-medium">
                      <CheckCircle size={16} className="mr-2" />
                      <span>Guaranteed quality</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceProcess

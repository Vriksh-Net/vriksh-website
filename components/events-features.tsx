"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Video, Users, Calendar, MapPin, Mic, Award, Globe } from "lucide-react"

const EventsFeatures = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  const features = [
    {
      icon: <Video className="text-emerald-600" size={24} />,
      title: "Interactive Webinars",
      description: "Engage with industry experts in live sessions with Q&A opportunities.",
    },
    {
      icon: <Users className="text-emerald-600" size={24} />,
      title: "Networking Events",
      description: "Connect with like-minded professionals and expand your business network.",
    },
    {
      icon: <Calendar className="text-emerald-600" size={24} />,
      title: "Exclusive Workshops",
      description: "Hands-on sessions to develop practical skills and strategies.",
    },
    {
      icon: <MapPin className="text-emerald-600" size={24} />,
      title: "Industry Conferences",
      description: "Large-scale events featuring multiple speakers and breakout sessions.",
    },
    {
      icon: <Mic className="text-emerald-600" size={24} />,
      title: "Expert Panels",
      description: "Discussions with thought leaders on current industry challenges and trends.",
    },
    {
      icon: <Globe className="text-emerald-600" size={24} />,
      title: "Virtual Summits",
      description: "Multi-day online events accessible from anywhere in the world.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50" ref={containerRef}>
      <div className="container mx-auto px-4">
        <motion.div className="text-center max-w-3xl mx-auto mb-16" style={{ opacity, y }}>
          <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full mb-4">
            Upcoming Events
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What to Expect from Our Events</h2>
          <p className="text-lg text-gray-600">
            Our events are designed to provide valuable insights, foster connections, and help you stay ahead in your
            industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.2 },
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                  <div className="mt-4 flex items-center text-emerald-600 text-sm font-medium">
                    <Award size={16} className="mr-1" />
                    <span>Coming soon</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventsFeatures

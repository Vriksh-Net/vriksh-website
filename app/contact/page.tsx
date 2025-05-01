import type { Metadata } from "next"
import ServiceHero from "@/components/service-hero"
import ContactForm from "@/components/contact-form"
import ContactInfo from "@/components/contact-info"

export const metadata: Metadata = {
  title: "Contact Us - Vriksh Consulting",
  description: "Get in touch with Vriksh Consulting. We are here to answer your questions and help your business grow.",
}

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      <ServiceHero title="Contact Us" description="We'd love to hear from you" />
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  )
}

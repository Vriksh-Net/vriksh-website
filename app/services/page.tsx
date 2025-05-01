import React from 'react';
import type { Metadata } from 'next';
import ServiceHero from '@/components/service-hero';
import ServicesShowCase from '@/components/services-showcase';
import ServiceProcess from '@/components/service-process';
import ServiceTestimonials from '@/components/service-testimonials';
import CallToAction from '@/components/call-to-action';

export const metadata: Metadata = {
  title: "Services - Vriksh Consulting Pvt. Ltd.",
  description: "Explore our comprehensive range of consulting services including Vriksh.Money, Vriksh.Grow, Vriksh.Net, Vriksh.OD, and Vriksh.AI & Data."
}


export default function ServicePage() {
  return (
    <div className='flex flex-col w-full'>
      <ServiceHero title="Our Services"
      description="Comprehensive solutions tailored to your business needs" />
      <ServicesShowCase />
      <ServiceProcess />
      <ServiceTestimonials />
      <CallToAction 
        title="Ready to grow your business?"
        description="Contact us today to discuss how our services can help you achieve your goals."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </div>
  )
}

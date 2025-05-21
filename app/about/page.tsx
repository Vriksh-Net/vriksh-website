import React from 'react';
import type { Metadata } from 'next';
import ServiceHero from '@/components/service-hero';
import AboutContent from '@/components/about-content';
import Team from '@/components/team';
import CompanyJourney from '@/components/company-journey';

export const metadata: Metadata = {
  title: "About - Vriksh Consulting Pvt. Ltd.",
  description: "Learn more about Vriksh Consulting Pvt. Ltd., our mission, vision, and the team behind our innovative solutions."
}
export default function AboutPage() {
  return (
    <div className='flex flex-col w-full'>
      <ServiceHero title='About Us'
      description='Who we are and what we stand for' 
      />
      <AboutContent />
      <Team />
      <CompanyJourney />
    </div>
  )
}

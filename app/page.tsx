import React from 'react'
import Hero from '@/components/hero';
import FeaturedServices from '@/components/featured-services';
import AboutPreview from '@/components/about-preview';
import Stats from '@/components/stats';
import Articleinsights from '@/components/article-insights';
import Partners from '@/components/partners';
import Subscribe from '@/components/subscribe';
import Link from 'next/link';
import Image from 'next/image';

const page = () => {
  return (
    <div className='flex flex-col w-full'>
      <Hero />
      <FeaturedServices />
      <AboutPreview />
      <Stats />
      <Articleinsights />
      <Partners />
      <Subscribe />
    </div>
  )
}

export default page;

import Image from "next/image";
import React from "react";

const AboutContent = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h2 className="text-3xl text-gray-800 font-semibold mb-6">
              Who We Are
            </h2>
            <p className="text-gray-600 mb-4 text-md">
              Vriksh Consulting Pvt Ltd was incorporated in 1997 by highly
              skilled and experienced professionals to help create, stabilise
              and grow businesses. The Vriksh team has over 200 years of
              combined experience across specialised industry segments such as
              business process reengineering, capacity building, sales
              enhancement, project management, business finance, strategic HR,
              quality assurance, business governance and regulatory compliances.
            </p>
            <p className="text-gray-600 text-md">
              Our team of experienced professionals brings together diverse
              expertise in finance, sales, digital technology, organizational
              development, and market research. This multidisciplinary approach
              allows us to provide comprehensive solutions that address the
              complex challenges faced by modern businesses.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=800&width=600"
              alt="About Vriksh Consulting"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Our Mission & Values*/}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
            Our Mission & Values
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To empower businesses with strategic insights and practical
                solutions that drive sustainable growth, innovation, and
                competitive advantage in an ever-evolving marketplace.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the most trusted consulting partner for businesses seeking
                transformative growth, recognized for our expertise, integrity,
                and commitment to delivering exceptional results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;

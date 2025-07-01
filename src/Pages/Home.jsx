// src/components/Home.jsx

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

// Replace these with your actual imports or local images
import descoIcon from "../assets/desco.png";
import wasaIcon from "../assets/wasa.png";
import nescoIcon from "../assets/nesco.png";
import titasIcon from "../assets/titasGas.png";
import PDBIcon from "../assets/pdb.png";
import gpIcon from "../assets/gp.png";

const organizations = [
  { name: "DESCO", icon: descoIcon },
  { name: "WASA", icon: wasaIcon },
  { name: "NESCO", icon: nescoIcon },
  { name: "Titas Gas", icon: titasIcon },
  { name: "PDB", icon: PDBIcon },
  { name: "GrameenPhone", icon: gpIcon },
];

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Hero Section */}
      <section className="mb-10 relative">
        <div className="w-full h-[450px] rounded-xl overflow-hidden">
          <Swiper
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            modules={[Pagination, Autoplay]}
            className="w-full h-full"
          >
            <SwiperSlide>
              <img
                className="w-full h-full object-cover"
                src="https://plus.unsplash.com/premium_photo-1661497675847-2075003562fd?q=80&w=1170&auto=format&fit=crop"
                alt="slide 1"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full h-full object-cover"
                src="https://plus.unsplash.com/premium_photo-1681497591056-f1b2f008e418?q=80&w=1170&auto=format&fit=crop"
                alt="slide 2"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold text-center">
            Simplify Your Utility Bill Payments
          </h1>
        </div>
      </section>

      {/* Logo Slider Section */}
      <section className="mb-10">
        <Swiper
          spaceBetween={20}
          slidesPerView={5}
          loop={true}
          autoplay={{ delay: 2500 }}
          modules={[Autoplay]}
        >
          {[...organizations, ...organizations].map((org, idx) => (
            <SwiperSlide key={idx} className="flex justify-center">
              <img src={org.icon} alt={org.name} className="w-16 h-16" />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Fast & Secure Payments
          </h3>
          <p className="text-gray-700">
            Enjoy lightning-fast transactions with end-to-end encryption.
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow-sm hover:shadow-md">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            All Utility Bills Supported
          </h3>
          <p className="text-gray-700">
            Electricity, Water, Internet, Tuition – all in one dashboard.
          </p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg shadow-sm hover:shadow-md">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            24/7 Customer Support
          </h3>
          <p className="text-gray-700">
            Always here for you — day or night, via chat or phone.
          </p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow-sm hover:shadow-md">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">
            Trusted by 30+ Banks
          </h3>
          <p className="text-gray-700">
            Connected with major Bangladeshi banks and MFS providers.
          </p>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 border rounded shadow">
            <p className="italic text-gray-600">
              "I’ve been paying my bills with this app for 2 years now — smooth,
              fast, and no errors ever."
            </p>
            <p className="mt-4 font-semibold text-blue-600">— Hasan Mahmud</p>
          </div>
          <div className="bg-white p-6 border rounded shadow">
            <p className="italic text-gray-600">
              "All my household payments — one dashboard. Finally!"
            </p>
            <p className="mt-4 font-semibold text-blue-600">— Rina Akter</p>
          </div>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="join join-vertical w-full">
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              Is this platform secure?
            </div>
            <div className="collapse-content">
              <p>Yes! All data is encrypted and protected by multiple layers of security.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              Can I schedule payments?
            </div>
            <div className="collapse-content">
              <p>Scheduled payments will be supported in the upcoming release.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              Which services are supported?
            </div>
            <div className="collapse-content">
              <p>We support electricity, water, gas, internet, and mobile top-ups.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Framework from "@/components/Framework";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Testmonials from "@/components/Testmonials";
import FloatingBanner from "@/components/FloatingBanner";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div>
        <Hero />
        <Features />
        <Framework />
        <Testmonials />
      </div>
    </>
  );
};

export default Home;

import type { Metadata } from 'next';
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LaunchAnnouncement from "@/components/LaunchAnnouncement";
import HeroComercios from "@/components/comercios/HeroComercios";
import HowItWorksComercios from "@/components/comercios/HowItWorksComercios";
import ImpulsaComercio from "@/components/comercios/ImpulsaComercio";
import BenefitsComercios from "@/components/comercios/BenefitsComercios";
import PricingComercios from "@/components/comercios/PricingComercios";
import ContactFormComercios from "@/components/comercios/ContactFormComercios";

export const metadata: Metadata = {
  title: "Comercios Afiliados",
  description: "Únete a la red de comercios más importante de Condado Del Rey y fideliza a tus clientes.",
};

export default function ComerciosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroComercios />
        <LaunchAnnouncement />
        <HowItWorksComercios />
        <ImpulsaComercio />
        <BenefitsComercios />
        <PricingComercios />
        <ContactFormComercios />
      </main>
      <Footer />
    </div>
  );
}

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroComercios from "@/components/comercios/HeroComercios";
import HowItWorksComercios from "@/components/comercios/HowItWorksComercios";
import ImpulsaComercio from "@/components/comercios/ImpulsaComercio";
import BenefitsComercios from "@/components/comercios/BenefitsComercios";
import PricingComercios from "@/components/comercios/PricingComercios";
import ContactFormComercios from "@/components/comercios/ContactFormComercios";

export default function ComerciosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroComercios />
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

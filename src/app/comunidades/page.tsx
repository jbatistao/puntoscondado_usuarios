import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroComunidades from "@/components/comunidades/HeroComunidades";
import HowItWorksComunidades from "@/components/comunidades/HowItWorksComunidades";
import ImpulsaComunidades from "@/components/comunidades/ImpulsaComunidades";
import BenefitsComunidades from "@/components/comunidades/BenefitsComunidades";
import PricingComunidades from "@/components/comunidades/PricingComunidades";
import ContactFormComunidades from "@/components/comunidades/ContactFormComunidades";

export default function ComunidadesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroComunidades />
        <HowItWorksComunidades />
        <ImpulsaComunidades />
        <BenefitsComunidades />
        <PricingComunidades />
        <ContactFormComunidades />
      </main>
      <Footer />
    </div>
  );
}

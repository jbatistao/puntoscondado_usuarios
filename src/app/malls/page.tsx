import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LaunchAnnouncement from "@/components/LaunchAnnouncement";
import HeroMalls from "@/components/malls/HeroMalls";
import HowItWorksMalls from "@/components/malls/HowItWorksMalls";
import ImpulsaMalls from "@/components/malls/ImpulsaMalls";
import BenefitsMalls from "@/components/malls/BenefitsMalls";
import PricingMalls from "@/components/malls/PricingMalls";
import ContactFormMalls from "@/components/malls/ContactFormMalls";

export default function MallsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroMalls />
        <LaunchAnnouncement />
        <HowItWorksMalls />
        <ImpulsaMalls />
        <BenefitsMalls />
        <PricingMalls />
        <ContactFormMalls />
      </main>
      <Footer />
    </div>
  );
}

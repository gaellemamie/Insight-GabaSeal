import HeroSection from "@/components/sections/hero-section"
import HowItWorksSection from "@/components/sections/how-it-works-section"
import BenefitsSection from "@/components/sections/benefits-section"
import InstitutionsSection from "@/components/sections/institutions-section"
import AboutSection from "@/components/sections/about-section"
import RegistrationGuidelinesSection from "@/components/sections/registration-guidelines-section"
import ContactSection from "@/components/sections/contact-section"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      {/* Hero Section */}
      <HeroSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Institutions Section - New */}
      <InstitutionsSection />

      {/* About Section */}
      <AboutSection />

      {/* Registration Guidelines */}
      <RegistrationGuidelinesSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer*/}
      <Footer />
    </div>
  )
}


import ContactSection from "@/src/components/website/comman/contact-us";
import AboutHero from "@/src/components/website/comman/home-hero";

export const metadata = { title: `Contact Us` };

export default function About() {
  return (

    <>
      <AboutHero
        title=" Contact us "
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: " Contact us " },
        ]}
      />
      <ContactSection />
    </>
  );
}

import AboutHero from "@/src/components/website/comman/home-hero";
import PrivacyPolicy from "@/src/components/website/comman/privacy-policy";


export default function AboutUs() {
  return (
    <>
      <AboutHero
        title=" Privacy Policy "
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: " Privacy Policy " },
        ]}
      />
      <PrivacyPolicy />

    </>
  );
}

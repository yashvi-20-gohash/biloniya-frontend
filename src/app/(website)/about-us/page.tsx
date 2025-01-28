import ExperienceInnovation1 from "@/src/components/website/about-us/experience-innovation";
import WelcomeSection from "@/src/components/website/about-us/home-about";
import AboutHero from "@/src/components/website/comman/home-hero";
import ExperienceInnovation from "@/src/components/website/home/experience-innovation";
import HurryUp from "@/src/components/website/home/hurry-up";



export default function AboutUs() {
  return (
    <>
      <AboutHero
        title=" About Us "
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />
      <WelcomeSection />
      <div className="!-mt-10 mb-16">
        <ExperienceInnovation1 />
      </div>
      <ExperienceInnovation />
      <HurryUp />

    </>
  );
}


import WelcomeSection from '@/src/components/website/security/home-about';
import OurServices from '@/src/components/website/security/our-services';
import ExperienceInnovation from '@/src/components/website/security/experience-innovation';
import AboutHero from '@/src/components/website/comman/home-hero';


export default function Security() {
  return (

    <>
      <AboutHero
        title=" Security "
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Security" },
        ]}
        showImage={true}
        imageSrc="/home/logo-3.png"
      />
      <WelcomeSection />
      <OurServices />
      <ExperienceInnovation />
    </>
  );
}


import WelcomeSection from '@/src/components/website/travels/home-about';
import OurServices from '@/src/components/website/travels/our-services';
import ExperienceInnovation from '@/src/components/website/travels/experience-innovation';
import AboutHero from '@/src/components/website/comman/home-hero';


export default function travle() {
  return (

    <>
      <AboutHero
        title=" Travel "
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: " Travel " },
        ]}
        showImage={true}
        imageSrc="/home/logo-1.png" // Replace with your image URL
      />
      <WelcomeSection />
      <OurServices />
      <ExperienceInnovation />
    </>
  );
}

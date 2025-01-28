
import WelcomeSection from '@/src/components/website/hotels/home-about';
import OurServices from '@/src/components/website/hotels/our-services';
import ExperienceInnovation from '@/src/components/website/hotels/experience-innovation';
import AboutHero from '@/src/components/website/comman/home-hero';


export default function Security() {
  return (

    <>
      <AboutHero
        title=" Hotels "
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: " Hotels " },
        ]}
        showImage={true}
        imageSrc="/home/logo-2.png"
      />
      <WelcomeSection />
      <OurServices />
      <ExperienceInnovation />
    </>
  );
}

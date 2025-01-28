
import WelcomeSection from '@/src/components/website/home/home-about';
import OurServices from '@/src/components/website/home/our-services';
import ExperienceInnovation from '@/src/components/website/home/experience-innovation';
import ContactSection from '@/src/components/website/home/contact-us';
import TourPackage from '@/src/components/website/home/tour-package';
import OurSuccess from '@/src/components/website/home/our -success';
import PopularTour from '@/src/components/website/home/popular-tour';
import HurryUp from '@/src/components/website/home/hurry-up';
import Testimonial from '@/src/components/website/home/testimonial';
import HomeHero from '@/src/components/website/home/home-hero';
import VisaServices from '@/src/components/website/home/visa-services';

export default function Home() {
    return (

        <>
            <HomeHero />
            <WelcomeSection />
            <OurSuccess />
            <OurServices />
            <ExperienceInnovation />
            <ContactSection />
            <TourPackage />
            <PopularTour />
            <HurryUp />
            <Testimonial />
            {/* <LatestBlog /> */}
            <VisaServices />
        </>
    );
}

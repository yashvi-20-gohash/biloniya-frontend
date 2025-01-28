import AboutHero from "@/src/components/website/comman/home-hero";
import GallerySection from "@/src/components/website/Gallery/Gallery";


export default function AboutUs() {
  return (
    <>
      <AboutHero
        title=" Gallery "
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: " Gallery " },
        ]}
      />
      <GallerySection />
    </>
  );
}

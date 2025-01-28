
import AboutHero from "@/src/components/website/comman/home-hero";
import TermsCondition from "@/src/components/website/comman/terms-condition";


export default function AboutUs() {
  return (
    <>
      <AboutHero
        title=" Terms Condition "
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms Condition" },
        ]}
      />
      <TermsCondition />

    </>
  );
}

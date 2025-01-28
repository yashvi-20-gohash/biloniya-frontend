import BlogDetails from "@/src/components/website/blog/blog-details";
import AboutHero from "@/src/components/website/comman/home-hero";


export const metadata = { title: `Blog Details` };

export default function page() {
  return (
    <>
      <AboutHero
        title=" Blog Details "
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: " Blog Details " },
        ]}
      />
      <BlogDetails />
    </>
  );
}

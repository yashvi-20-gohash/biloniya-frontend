import Blog from "@/src/components/website/blog/latest-blog";
import AboutHero from "@/src/components/website/comman/home-hero";



export default function AboutUs() {
    return (
        <>
            <AboutHero
                title=" Blog "
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Blog" },
                ]}
            />

            <Blog />

        </>
    );
}

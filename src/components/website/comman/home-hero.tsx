import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string; // Optional for the active breadcrumb
}

interface AboutHeroProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  showImage?: boolean; // New prop to conditionally show the image
  imageSrc?: string; // Prop to pass the image URL
}

const AboutHero: React.FC<AboutHeroProps> = ({ title, breadcrumbs, showImage = false, imageSrc }) => {
  return (
    <div className="breadcrumb-section breadcrumb-bg py-16 lg:py-32">
      <div className="container mx-auto px-4">
        {showImage && imageSrc && (
          <div className="mb-4 text-center">
            <Image src={imageSrc} alt="Page Banner" className="mx-auto w-28 rounded-md shadow-lg" width={1000} height={1000} />
          </div>
        )}
        <div className="flex justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-extrabold mb-4">{title}</h1>
            <ul id="breadcrumb-list" className="flex justify-center space-x-2 text-sm">
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={index}>
                  {item.href ? (
                    <li className="breadcrumb-item">
                      <Link href={item.href} className="hover:underline text-white font-semibold">
                        {item.label}
                      </Link>
                    </li>
                  ) : (
                    <li className="breadcrumb-item active text-gray-200">{item.label}</li>
                  )}
                  {index < breadcrumbs.length - 1 && <li className="font-semibold text-white">/</li>}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;

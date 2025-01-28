import React from "react";

interface PolicySection {
  title: string;
  content: string;
}

const policySections: PolicySection[] = [
  {
    title: "Welcome to Lorem Ipsum Store.",
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
      <b>Lorem Ipsum is simply dummy text</b> ever since the 1500s, when an unknown printer 
      took a galley of type and scrambled it to make a type specimen book. It has survived 
      not only five centuries, but also the leap into electronic typesetting, remaining 
      essentially unchanged. <b>Lorem Ipsum is simply dummy text.</b>`,
  },
  {
    title: "Lorem Ipsum Websites",
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
      <b>Lorem Ipsum is simply dummy text</b> ever since the 1500s, when an unknown printer 
      took a galley of type and scrambled it to make a type specimen book. It has survived 
      not only five centuries, but also the leap into electronic typesetting, remaining 
      essentially unchanged. <b>Lorem Ipsum is simply dummy text.</b>`,
  },
  {
    title: "How browsing and vendor works?",
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
      <b>Lorem Ipsum is simply dummy text</b> ever since the 1500s, when an unknown printer 
      took a galley of type and scrambled it to make a type specimen book. It has survived 
      not only five centuries, but also the leap into electronic typesetting, remaining 
      essentially unchanged. <b>Lorem Ipsum is simply dummy text.</b>`,
  },
  {
    title: "Becoming a vendor",
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
      <b>Lorem Ipsum is simply dummy text</b> ever since the 1500s, when an unknown printer 
      took a galley of type and scrambled it to make a type specimen book. It has survived 
      not only five centuries, but also the leap into electronic typesetting, remaining 
      essentially unchanged.`,
  },
];

const TermsCondition = () => {
  return (
    <div className="py-4 lg:py-3">
      <section
        className="max-[1199px]:py-[30px]"
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="400"
      >
        <h1 className="mt-10 text-3xl font-bold text-center mb-10"> Terms Condition </h1>
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1600px]:max-w-[1500px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          {policySections.map((section, index) => (
            <div
              key={index}
              className="min-[992px]:w-[50%] w-full px-[12px] mb-[24px]"
            >
              <div className="cr-common-wrapper px-[24px] pt-[24px] border-[1px] border-solid border-[#e9e9e9] rounded-[5px] bg-[#fff]">
                <div className="w-full cr-cgi-block mb-[24px]">
                  <div className="cr-cgi-block-inner">
                    <h5 className="cr-cgi-block-title mb-[10px] text-[18px] font-bold leading-[1.2]">
                      {section.title}
                    </h5>
                    <p
                      className="mb-[0] leading-[28px] text-[14px] font-Poppins text-[#7a7a7a]"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TermsCondition;

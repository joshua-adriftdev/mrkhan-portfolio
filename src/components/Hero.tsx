import { Button } from "@material-tailwind/react";
 
import Image from "next/image";
import bggradient from "../../public/bggradient2.png"
import { PageQuery, PageQueryVariables } from "../../tina/__generated__/types";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { useRouter } from 'next/navigation';

export const Hero = (props: {
  data: PageQuery
}) => {
  const { push } = useRouter();

  const imageURL = props.data.page?.userImage ?? "/default-image.webp"

  const scrollToSection = (sectionId: string) => {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="">
        <Image src={bggradient} alt="alt" className="lg:scale-100 absolute z-0"/>
        <div className="xl:flex xl:flex-row items-center">
          <div className="relative p-5 lg:pt-16 lg:pl-32 z-10">
              <div className="text-primaryText text-[57px] lg:text-[84px]">I'm</div>
              <div className="text-white font-extrabold text-[57px] mt-[-20px] lg:text-[84px]">{props.data.page?.name}</div>
              <div className="font-medium text-[17px] lg:text-[24px] text-primaryText md:w-3/5 lg:w-4/5 xl:w-full">
                  <TinaMarkdown content={props.data.page?.aboutme}/>
              </div>
              <div className="flex flex-row gap-3 mt-10">
                  <Button variant="gradient" color="gray" size="lg" onClick={() => {
                    scrollToSection("contact");
                  }}>Contact</Button>
                  <Button variant="gradient" color="gray" size="lg" className="text-primaryText" onClick={() => {
                      push("/projects");
                  }}>View My Work</Button>
              </div>
          </div>
          {/* Image */}
          <div className="hidden xl:block mx-32 mt-32">
            <div className="w-[600px] h-[600px] bg-contentBackground rounded-full flex items-center justify-center overflow-hidden">
              <Image src={imageURL} alt="alt" width={600} height={0} />
            </div>
          </div>
        </div>
    </div>
  );
}
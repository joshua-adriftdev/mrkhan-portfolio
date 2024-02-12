import { Button, Carousel } from "@material-tailwind/react";
 
import Image from "next/image";
import bggradient from "../../public/bggradient.png"
import { PageQuery, PageQueryVariables } from "../../tina/__generated__/types";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const ClientVideos = (props: {
  data: PageQuery
}) => {
  return (
    <div className="">
      <Carousel placeholder={undefined} className="rounded-[16px] xl:hidden">
            {props.data.page?.videos?.map((video, index) => (
                <div className="aspect-w-16 aspect-h-9">
                    <iframe src={video ?? ""} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
                </div>
            ))}
      </Carousel>
              
      <div className="hidden xl:grid grid-cols-2 grid-rows-2 gap-10">
        {props.data.page?.videos?.map((video, index) => (
                <div className="aspect-w-16 aspect-h-9">
                    <iframe src={video ?? ""} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true} className="rounded-[16px]"></iframe>
                </div>
            ))}
      </div>

    </div>
    
  );
}
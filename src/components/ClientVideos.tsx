import { Button, Carousel } from "@material-tailwind/react";
import Image from "next/image";
import bggradient from "../../public/bggradient.png"
import { PageQuery, PageQueryVariables } from "../../tina/__generated__/types";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Empty from "./Empty";

export const ClientVideos = (props: {
  data: PageQuery
}) => {
  // Assuming props.data.page.videos is an array of video URLs
  const videoData = props.data.page?.videos ?? [];

  // Calculate the number of videos per page
  const videosPerPage = 2;

  // Organize videos into subarrays
  const groupedVideos = [];
  for (let i = 0; i < videoData.length; i += videosPerPage) {
    groupedVideos.push(videoData.slice(i, i + videosPerPage));
  }

  return (
    <div className="">
      {/* Mobile Carousel */}
      <Carousel className="rounded-[16px] xl:hidden">
        {videoData.map((video, index) => (
          <div key={index} className="aspect-w-16 aspect-h-9">
            <iframe src={video ?? ""} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
          </div>
        ))}
      </Carousel>

      {/* Desktop Carousel with 2x2 grid */}
      <Carousel
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
              <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
              />
          ))}
          </div>
        )}
      >
        {groupedVideos.map((pageVideos, pageIndex) => (
          <div key={pageIndex} className="hidden xl:grid grid-cols-2 gap-10">
            {pageVideos.map((video, index) => (
              <div key={index} className="aspect-w-16 aspect-h-9">
                <iframe src={video ?? ""} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true} className="rounded-[16px]"></iframe>
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
}

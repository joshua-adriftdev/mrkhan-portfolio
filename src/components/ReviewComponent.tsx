import React, { useEffect, useState } from "react";
import { ProjectQuery, ReviewsQuery } from "../../tina/__generated__/types";
import { useTina } from "tinacms/dist/react";
import client from "../../tina/__generated__/client";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import discordIcon from "../../public/discord.png"

import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ReviewComponent = (props: {
  data: ReviewsQuery | null;
}) => {
  if (!props.data) return <p>No data</p>;

  const { data } = props;

  const imageUrl = data.reviews?.profile ?? "/default-image.jpg"; // Replace with your default image path

  return (
    <div>
      <div className="mt-5 mx-0 bg-contentBackground border-[1px] border-stroke rounded-[32px] 2xl:pt-12 2xl:pb-12">
        <div className="p-5 flex items-center w-full justify-center h-full">
          <Image src={imageUrl} alt="alt" width={128} height={128} className="mx-5 rounded-[10px] z-10"/>
        </div>
        <div className="text-white font-semibold text-[23px] text-center">{data.reviews?.name}</div>
        <div className="text-primaryText font-medium text-[18px] text-center">{data.reviews?.tag}</div>

        <div className="relative flex py-5 items-center justify-center">
          <div className="border-t border-2 w-1/5 border-stroke"></div>
        </div>

        <div className="p-5 text-primaryText text-[16px] text-center font-medium px-10">
          <TinaMarkdown content={data.reviews?.description}/>
        </div>
        <div className="px-5 py-5 pb-5 flex flex-row items-center justify-center h-full gap-2">
          <FontAwesomeIcon icon={faStar} size="lg"/>
          <FontAwesomeIcon icon={faStar} size="lg"/>
          <FontAwesomeIcon icon={faStar} size="lg"/>
          <FontAwesomeIcon icon={faStar} size="lg"/>
          <FontAwesomeIcon icon={faStar} size="lg"/>
        </div>
        {
          data.reviews.discord ? 
          <div className="flex flex-row justify-center pt-2 pb-5 2xl:pb-0">
            <Image src={discordIcon} alt="alt" width={30} height={0} className="2xl:hidden"/>
            <Image src={discordIcon} alt="alt" width={50} height={50} className="hidden 2xl:block scale-75"/>
            <div className="ml-2 mt-0.5 2xl:mt-1 text-white text-[18px] 2xl:text-[28px]">{data.reviews.discord}</div>
          </div> 
            : <></>
        }

      </div>
      
    </div>
  );
};

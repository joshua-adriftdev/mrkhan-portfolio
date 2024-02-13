import React, { useEffect, useState } from "react";
import { ProjectQuery } from "../../tina/__generated__/types";
import { useTina } from "tinacms/dist/react";
import client from "../../tina/__generated__/client";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProjectImage from "./ProjectImage";
import { Button } from "@material-tailwind/react";
import { ProjectDialog } from "./ProjectDialog";

export const ProjectComponent = (props: {
  data: ProjectQuery | null;
  inGrid?: boolean | false;
}) => {
  if (!props.data) return <p>No data</p>;

  const { data } = props;
  
  const imageUrl = data.project?.image?.at(0) ?? "/default-image.webp";
  const imageUrl2 = data.project?.image?.at(1) ?? "/default-image.webp";

  const inGrid = props.inGrid ?? false;

  const [externalOpen, setExternalOpen] = useState(false);

  const handleExternalButtonClick = () => {
    setExternalOpen(true);
  };

  const handleDialogClose = (newState: boolean) => {
    setExternalOpen(newState);
  };

  return (
    <div>
      <div className={`${inGrid ? "" : "mt-5 md:mt-10 xl:mt-16"} bg-contentBackground border-[1px] border-stroke rounded-[32px] lg:p-8 xl:p-10`}>
        <div className="p-5 xl:pt-0 text-white font-bold text-[20px] lg:text-[32px]">{data.project?.name}</div>

        {/* Single Image */}
        <div className="xl:hidden mx-5">
          <ProjectImage imageUrl={imageUrl} inGrid={inGrid}/>
        </div>

        {/* Double Image */}
        <div className="mx-5 hidden xl:flex gap-10">
          <ProjectImage imageUrl={imageUrl} inGrid={inGrid}/>
          <ProjectImage imageUrl={imageUrl2} inGrid={inGrid}/>
        </div>

        <div className="p-5 text-primaryText text-[16px] lg:text-[20px]">
          <TinaMarkdown content={data.project?.description}/>
        </div>

        <Button className="" variant="text" onClick={handleExternalButtonClick}>
          <div className="pb-5 lg:pb-0 flex flex-row items-center h-full gap-3">
            <div className={`text-white font-medium text-[18px] ${props.inGrid ? "" : "lg:text-[28px]"} lg:font-semibold`}>View Details</div>
            <FontAwesomeIcon icon={faArrowRight} size="xl" className={`${props.inGrid ? "" : "lg:hidden"} text-white`}/>
            <FontAwesomeIcon icon={faArrowRight} size="2xl" className={`hidden ${props.inGrid ? "" : "lg:block"} text-white`}/>
          </div>
        </Button>

        <ProjectDialog data={data} externalOpen={externalOpen} onExternalOpenChange={handleDialogClose}/>
         

      </div>
      
    </div>
  );
};

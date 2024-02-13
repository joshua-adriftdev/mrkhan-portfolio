import { Button } from "@material-tailwind/react";
 
import Image from "next/image";
import bggradient from "../../public/bggradient.png"
import { PageQuery, PageQueryVariables } from "../../tina/__generated__/types";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import discord from "../../public/discord.png";
import github from "../../public/github.png";
import email from "../../public/email.png";

export const Contact = (props: {
  data: PageQuery
}) => {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="font-medium text-primaryText text-[24px] lg:w-4/5">
            <TinaMarkdown content={props.data.page?.contact}/>
        </div>
        <div className="flex flex-col pt-5 lg:ml-[3rem] lg:mt-[-3rem] gap-4">
            <div className="flex flex-row gap-4 items-center">
                <Image src={discord} alt="alt" width={40} height={40} />
                <a className="text-primaryText font-medium text-[24px]">{props.data.page.discord}</a>
            </div>
            <div className="flex flex-row gap-4 items-center">
                <Image src={github} alt="alt" width={40} height={40} />
                <a className="text-primaryText font-medium text-[24px]" href={props.data.page.githubLink ?? ""} target="_blank" rel="noopener noreferrer">{props.data.page.github}</a>
                
                <a href={props.data.page.githubLink ?? ""} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        size="xl"
                        className="fa-rotate-by text-primaryText"
                        // @ts-ignore
                        style={{ "--fa-rotate-angle": "-45deg" }}
                    />
                </a>
                
            </div>
            <div className="flex flex-row gap-4 items-center">
                <Image src={email} alt="alt" width={40} height={40} />
                <a className="text-primaryText font-medium text-[24px]" href={`mailto: ${props.data.page.email}`}>{props.data.page.email}</a>
                <a href={`mailto: ${props.data.page.email}`}>
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        size="xl"
                        className="fa-rotate-by text-primaryText"
                        // @ts-ignore
                        style={{ "--fa-rotate-angle": "-45deg" }}
                    />
                </a>
                
            </div>
        </div>
    </div>
  )
}
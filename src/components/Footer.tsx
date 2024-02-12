import { PageQuery, PageQueryVariables } from "../../tina/__generated__/types";

import Image from "next/image";
import Link from "next/link";


import adrifticon from "../../public/adrift_square.png";

export const Footer = (props: {
  data: PageQuery
}) => {
  return (
    <div>
        <div className="relative flex py-5 items-center justify-center">
          <div className="border-t border-2 w-full border-stroke"></div>
        </div>

        <div className="flex flex-col gap-5 mt-16">
            <a href="https://adrift.dev" className="w-[85px]">
                <Image src={adrifticon} alt="alt" width={85} height={85} />
            </a>
            <div className="text-primaryText">Thanks for stopping by ッ</div>

            <div className="text-primaryText mt-8">© {new Date().getFullYear()} Design by Adrift Development (<a href="https://adrift.dev">adrift.dev</a>). All Rights Reserved.</div>
        </div>
        
    </div>
  );
}
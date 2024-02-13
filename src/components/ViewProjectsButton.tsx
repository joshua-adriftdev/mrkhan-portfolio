import { PageQuery, PageQueryVariables } from "../../tina/__generated__/types";

import Image from "next/image";
import Link from "next/link";


import adrifticon from "../../public/adrift_square.png";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/router";

export const ViewProjectsButton = (props: {
  data: PageQuery
}) => {
    const { push } = useRouter();

  return (
    <Button className="w-full mt-10 h-[4rem] text-primaryText border-2  border-primaryText border-dashed  rounded-[24px]" variant="text" onClick={() => {push("/projects")}}>
        View More
    </Button>
  );
}
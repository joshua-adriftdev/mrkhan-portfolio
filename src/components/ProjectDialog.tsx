import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Carousel,
} from "@material-tailwind/react";
import { ProjectQuery } from "../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";

interface ProjectDialogProps {
  data: ProjectQuery;
  externalOpen: boolean;
  onExternalOpenChange: (newState: boolean) => void;
}

export const ProjectDialog: React.FC<ProjectDialogProps> = ({
  data,
  externalOpen,
  onExternalOpenChange,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
    onExternalOpenChange(!open);
  };

  // Update internal state when the externalOpen prop changes
  useEffect(() => {
    setOpen(externalOpen);
  }, [externalOpen]);

  return (
    <div>
      <Dialog open={open} handler={handleOpen} size="xl" className="bg-contentBackground">
        <DialogHeader className="text-white mx-6 2xl:mx-28 pt-7">{data.project.name}</DialogHeader>

        <div className="flex items-center justify-center 2xl:mx-32 pt-2">
            <Carousel
                className="rounded-xl h-[24rem] 2xl:h-[32rem] mx-10 2xl:mx-0"
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
                        
                {data.project.image?.map((image, index) => (
                    <img
                        src={image ?? "../../public/default-image.webp"}
                        alt="image 1"
                        className="h-full w-full object-cover"
                    />
                ))}
            </Carousel>
        </div>

        <DialogBody className="text-primaryText mx-6 2xl:mx-28">
          <TinaMarkdown content={data.project.details}/>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="white" onClick={handleOpen} className="w-full mx-6 2xl:mx-28 mb-5">
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

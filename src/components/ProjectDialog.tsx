import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Carousel,
  IconButton,
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
                prevArrow={({ handlePrev }) => (
                  <IconButton
                    variant="text"
                    color="white"
                    size="lg"
                    onClick={handlePrev}
                    className="!absolute top-2/4 left-4 -translate-y-2/4 bg-black opacity-85 hover:bg-black hover:opacity-100 active:bg-black active:opacity-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                      />
                    </svg>
                  </IconButton>
                )}
                nextArrow={({ handleNext }) => (
                  <IconButton
                    variant="text"
                    color="white"
                    size="lg"
                    onClick={handleNext}
                    className="!absolute top-2/4 !right-4 -translate-y-2/4 bg-black opacity-85 hover:bg-black hover:opacity-100 active:bg-black active:opacity-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </IconButton>
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

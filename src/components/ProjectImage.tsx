import Image from "next/image"

interface ProjectImageProps {
    imageUrl: string;
    inGrid: boolean;
}

export default function ProjectImage(props: ProjectImageProps) {
    return (
        <div className="flex items-center w-full justify-center h-full">
          <Image src={props.imageUrl} alt="alt" width={1920} height={0} className="mx-5 w-full rounded-[10px] z-10"/>
        
        {
          props.inGrid ? <></> 
          :
          <div className="absolute">
            {/* default */}
            <div className="absolute md:hidden">
              <Image src={props.imageUrl} alt="alt" width={200} height={0} className="w-full rounded-[10px] blur-xl -z-10"/>
            </div>
              
            {/* sm */}
            <div className="absolute hidden sm:block md:hidden">
              <Image src={props.imageUrl} alt="alt" width={400} height={0} className="w-full rounded-[10px] blur-xl -z-10"/>
            </div>

            {/* md */}
            <div className="absolute hidden md:block lg:hidden">
              <Image src={props.imageUrl} alt="alt" width={450} height={0} className="w-full rounded-[10px] blur-xl -z-10"/>
            </div>

            {/* lg */}
            <div className="absolute hidden lg:block">
              <Image src={props.imageUrl} alt="alt" width={375} height={0} className="w-full rounded-[10px] blur-xl -z-10"/>
            </div>
          </div>
        }
          
        </div>
    )
}
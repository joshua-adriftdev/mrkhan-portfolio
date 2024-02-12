// HomePage.tsx

import { PageQuery, PageQueryVariables, ProjectQuery, ReviewsQuery } from "../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { useTina } from "tinacms/dist/react";
import { useState, useEffect } from "react";

import Image from "next/image";
import bggradient from "../../public/bggradient2.png";
import Button from "@material-tailwind/react/components/Button";
import { Hero } from "@/components/Hero";
import { ProjectComponent } from "@/components/ProjectComponent";
import client from "../../tina/__generated__/client";
import { Carousel } from "@material-tailwind/react";
import { ClientVideos } from "@/components/ClientVideos";
import { ReviewComponent } from "@/components/ReviewComponent";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Contact } from "@/components/Contact";

export const HomePage = (props: {
  data: PageQuery;
  variables: PageQueryVariables;
  query: string;
}) => {
  const { data: homePageData } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  const [projectData, setProjectData] = useState<ProjectQuery[]>([]);
  const [reviewData, setReviewData] = useState<ReviewsQuery[]>([]);

  useEffect(() => {
    const fetchProjectData = async () => {
        // @ts-ignore
        const projectPaths: string[] = homePageData.page?.projects.map(projectName => `../projects/${projectName}.json`);

      const projectDataArray = await Promise.all(
        projectPaths.map(async (path) => {
          try {
            const projectResponse = await client.queries.project({
              // @ts-ignore
              relativePath: path,
            });
            return projectResponse.data;
          } catch (error) {
            console.error("Error fetching project data:", error);
            return null;
          }
        })
      );
        
      // @ts-ignore
      setProjectData(projectDataArray);
    };

    // Reviews
    const fetchReviewData = async () => {
        // @ts-ignore
        const reviewPaths: string[] = homePageData.page?.reviews.map(reviewName => `../reviews/${reviewName}.json`);
  
        const projectDataArray = await Promise.all(
          reviewPaths.map(async (path) => {
            try {
              const projectResponse = await client.queries.reviews({
                // @ts-ignore
                relativePath: path,
              });
              return projectResponse.data;
            } catch (error) {
              console.error("Error fetching review data:", error);
              return null;
            }
          })
        );
          
        // @ts-ignore
        setReviewData(projectDataArray);
      };

    fetchProjectData();
    fetchReviewData();
  }, []);

  return (
    <div className="relative h-full bg-primaryBackground">
      <Hero data={homePageData} />
      <div className="p-5 lg:px-32">
        <div className="py-5">
          <div className="text-white font-bold text-[48px]">
            My Work
          </div>
          {/* Render each project separately */}
          {projectData.map((project, index) => (
            <ProjectComponent key={index} data={project} />
          ))}
        </div>
        <div className="py-5">
          <div className="text-white font-bold text-[48px] pb-5">
            My Clients
          </div>
          <ClientVideos data={homePageData}/>
        </div>
        <div className="py-5">
          <div className="text-white font-bold text-[48px] pb-5">
            Reviews
          </div>
          {/* Default */}
          <Carousel placeholder={undefined} className="pb-10 xl:hidden">
              {reviewData.map((review, index) => (
                  <ReviewComponent key={index} data={review} />
              ))} 
          </Carousel>

          {/* lg */}
          <div className="flex-row gap-10 hidden xl:flex">
            {reviewData.map((review, index) => (
                <ReviewComponent key={index} data={review} />
            ))} 
          </div>
        </div>
        <div className="py-24">
          <div className="text-white font-bold text-[48px] pb-5">
            Contact
          </div>
          <Contact data={homePageData}/>
        </div>
        <div className="pt-24">
          <div className="absolute bottom-0">
              <Image src={bggradient} alt="alt" className="object-cover h-full mt-[3.75rem] lg:ml-[-5rem] z-10 rotate-180"/>
          </div>
        </div>
      </div>
    </div>
  );
};

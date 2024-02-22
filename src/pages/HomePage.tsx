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
import { Footer } from "@/components/Footer";
import { ViewProjectsButton } from "@/components/ViewProjectsButton";

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

  useEffect(() => {
    const scrollToContact = () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Introduce a delay (e.g., 100ms) before scrolling
    const delay = 100;
    setTimeout(scrollToContact, delay);
  }, []);

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

  // Calculate the number of reviews per page
  const reviewsPerPage = 3;

  // Organize reviews into subarrays
  const groupedReviews = [];
  for (let i = 0; i < reviewData.length; i += reviewsPerPage) {
    groupedReviews.push(reviewData.slice(i, i + reviewsPerPage));
  }

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
          <ViewProjectsButton data={homePageData}/>
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
          <Carousel className="pb-10 xl:hidden">
              {reviewData.map((review, index) => (
                  <ReviewComponent key={index} data={review} />
              ))} 
          </Carousel>

          {/* lg */}
          <Carousel className="hidden xl:flex">
            {groupedReviews.map((pageReviews, pageIndex) => (
              <div key={pageIndex} className="flex flex-row gap-10">
                {pageReviews.map((review, index) => (
                  <ReviewComponent key={index} data={review} />
                ))}
              </div>
            ))}
          </Carousel>
        </div>
        <div className="py-24 relative z-10">
          <div className="text-white font-bold text-[48px] pb-5" id="contact">
            Contact
          </div>
          <Contact data={homePageData}/>
        </div>
        <div className="relative z-10">
          <Footer data={homePageData}/>
        </div>
        
        <div className="pt-[24px]">
          <div className="absolute bottom-0">
              <Image src={bggradient} alt="alt" className="object-cover h-full mt-[3.75rem] lg:ml-[-5rem] -z-10 rotate-180" style={{ pointerEvents: 'none' }}/>
          </div>
        </div>
        
      </div>
    </div>
  );
};

import { PageQuery, PageQueryVariables, ProjectPageQuery, ProjectPageQueryVariables, ProjectQuery, ProjectQueryVariables, ReviewsQuery } from "../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { useTina } from "tinacms/dist/react";
import { useState, useEffect } from "react";
import client from "../../tina/__generated__/client";
import { ProjectComponent } from "@/components/ProjectComponent";
import { Hero } from "@/components/Hero";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ProjectHero } from "@/components/ProjectHero";

import Image from "next/image"
import bggradient from "../../public/bggradient2.png"

export const ProjectPage = (props: {
    data: ProjectPageQuery;
    variables: ProjectPageQueryVariables;
    query: string;
  }) => {
    const { data: projectPageData } = useTina({
      data: props.data,
      query: props.query,
      variables: props.variables,
    });

    const [projectData, setProjectData] = useState<ProjectQuery[]>([]);
    const [homePageData, setHomePageData] = useState<PageQuery>();

    useEffect(() => {
        const fetchProjectData = async () => {
            // @ts-ignore
            const projectPaths: string[] = projectPageData.projectPage?.projects.map(projectName => `../projects/${projectName}.json`);

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

        const fetchHomePageData = async () => {
            // @ts-ignore
            const path: string = `../pages/landingPage.json`;

            try {
                const response = await client.queries.page({
                // @ts-ignore
                relativePath: path,
                });
                setHomePageData(response.data);
            } catch (error) {
                console.error("Error fetching project data:", error);
                return null;
            }

        // @ts-ignore
        
        };

        fetchHomePageData();
        fetchProjectData();
    }, []);

    console.log(projectData);

    if (homePageData == null) {
        return;
    }

    return (
        <div className="relative bg-primaryBackground h-full">
            <ProjectHero data={props.data}/>
            <div className="p-5 lg:px-32 pt-16 lg:pt-32">
                <div className="grid grid-cols-1 2xl:grid-cols-2 gap-10">
                    {projectData.map((project, index) => (
                        <ProjectComponent key={index} data={project} inGrid={true} />
                    ))}
                </div>
                <div className="relative mt-32 z-10">
                    <Contact data={homePageData} />
                    <div className="mt-16 ">
                        <Footer data={homePageData}/>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0">
                <Image src={bggradient} alt="alt" className="object-cover h-full mt-[3.75rem] lg:ml-[-5rem] -z-10 rotate-180" style={{ pointerEvents: 'none' }}/>
            </div>
        </div>
    )
}
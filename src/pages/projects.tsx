import { Button } from "@material-tailwind/react/components/Button";
import client from "../../tina/__generated__/client";
import { PageQuery, PageQueryVariables, ProjectPageQuery, ProjectPageQueryVariables } from "../../tina/__generated__/types";
import { HomePage } from "./HomePage";
import { ProjectPage } from "./ProjectPage";

export default function Home({ data, query, variables }: { data: ProjectPageQuery; query: string; variables: ProjectPageQueryVariables }) {
  return <div>
    <ProjectPage data={data} query={query} variables={variables} />
  </div>;
}

export async function getStaticProps() {
  const res = await client.queries.projectPage({ relativePath: "page.json" });

  return {
    props: {
      data: res.data,
      query: res.query,
      variables: res.variables,
    },
  };
}

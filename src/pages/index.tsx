import { Button } from "@material-tailwind/react/components/Button";
import client from "../../tina/__generated__/client";
import { PageQuery, PageQueryVariables } from "../../tina/__generated__/types";
import { HomePage } from "./HomePage";

export default function Home({ data, query, variables }: { data: PageQuery; query: string; variables: PageQueryVariables }) {
  return <div>
    <HomePage data={data} query={query} variables={variables} />
  </div>;
}

export async function getStaticProps() {
  const res = await client.queries.page({ relativePath: "landingPage.json" });

  return {
    props: {
      data: res.data,
      query: res.query,
      variables: res.variables,
    },
  };
}

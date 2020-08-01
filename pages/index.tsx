import gql from "graphql-tag";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { initializeApollo } from "../apollo/client";

const ViewerQuery = gql`
  query ViewerQuery {
    Viewer {
      id
      name
      status
    }
  }
`;

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ViewerQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

const Index = () => {
  const { loading, error, data } = useQuery(ViewerQuery);
  let viewer;

  if (data) {
    viewer = data.Viewer;
  }

  return (
    <div>
      {viewer
        ? `You're signed in as ${viewer.name} and you're ${viewer.status}`
        : null} goto{" "}
      <Link href="/about">
        <a>static</a>
      </Link>{" "}
      page.
    </div>
  );
};

export default Index;

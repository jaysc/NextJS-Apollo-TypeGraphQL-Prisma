import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { initializeApolloAsync } from "../apollo/client";

const ViewerQuery = gql`
  query ViewerQuery {
    Viewer {
      id
      name
      status
    }
  }
`;

//Todo: Caching needs to be fixed here
export async function getStaticProps() {
  const apolloClient = await initializeApolloAsync();

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
      <p>
        {viewer
          ? `You're signed in as ${viewer.name} and you're ${viewer.status}`
          : "No information"}
      </p>
      Go to "api/graphql" for the playground!
    </div>
  );
};

export default Index;

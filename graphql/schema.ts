import { buildTypeDefsAndResolvers } from "type-graphql";
import { makeExecutableSchema } from "graphql-tools";

import { myResolvers } from "./resolvers";

export const schema = async () => {
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: myResolvers(),
    emitSchemaFile: "./generated-schema.graphql",
    validate: false,
  });
  return makeExecutableSchema({ typeDefs, resolvers: resolvers });
};

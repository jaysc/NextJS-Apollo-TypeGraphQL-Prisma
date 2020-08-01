import "reflect-metadata";
import {
  ObjectType,
  Field,
  buildTypeDefsAndResolvers,
  Resolver,
  Query,
  ID,
} from "type-graphql";
import { makeExecutableSchema } from "graphql-tools";

@ObjectType()
class User {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  status: string;
}

@Resolver(User)
class UserResolver {
  @Query((returns) => User)
  Viewer() {
    return { name: "test" };
  }
}

export const schema2 = async () => {
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [UserResolver],
  });

  return makeExecutableSchema({ typeDefs, resolvers });
};

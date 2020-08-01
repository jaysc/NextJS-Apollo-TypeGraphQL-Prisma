import "reflect-metadata";
import {
  ObjectType,
  Field,
  buildTypeDefsAndResolvers,
  Resolver,
  Query,
  ID,
  Ctx,
} from "type-graphql";
import { makeExecutableSchema } from "graphql-tools";
import { PrismaClient } from "@prisma/client";

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
  async Viewer(@Ctx() ctx: PrismaClient) {
    const result = await ctx.user.findMany();
    return result[0];
  }
}

export const schema2 = async () => {
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [UserResolver],
  });

  return makeExecutableSchema({ typeDefs, resolvers });
};

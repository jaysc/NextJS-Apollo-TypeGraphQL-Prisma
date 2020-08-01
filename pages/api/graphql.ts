import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../apollo/schema";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const apolloServer = new ApolloServer({ schema, context: prismaClient });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });

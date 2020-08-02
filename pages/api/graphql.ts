import { ApolloServer } from "apollo-server-micro";
import { PrismaClient } from "@prisma/client";
import { schema } from "../../graphql/schema";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

  const typeSchema = await schema();

  const apolloServer = new ApolloServer({
    schema: typeSchema,
    context: () => ({ prisma }),
  });

  return apolloServer.createHandler({ path: "/api/graphql" })(req, res);
};

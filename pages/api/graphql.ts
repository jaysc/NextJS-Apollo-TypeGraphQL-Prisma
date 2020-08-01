import { ApolloServer } from "apollo-server-micro";
import { PrismaClient } from "@prisma/client";
import { schema2 } from "../../apollo/typegraphql";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prismaClient = new PrismaClient();

  const typeSchema = await schema2();

  const apolloServer = new ApolloServer({
    schema: typeSchema,
    context: prismaClient,
  });

  res.seth;

  return apolloServer.createHandler({ path: "/api/graphql" })(req, res);
};

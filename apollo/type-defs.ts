import { gql } from "@apollo/client";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const typeDefs = gql`
  type User {
    id: ID!
    name: String
    status: String
  }
  type Query {
    viewer: User
  }
`;

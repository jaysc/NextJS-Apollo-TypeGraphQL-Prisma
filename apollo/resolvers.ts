import { PrismaClient } from "@prisma/client";
import { schema2 } from "./typegraphql";
export const resolvers = {
  Query: {
    async viewer(_parent, _args, _context: PrismaClient, _info) {
      const result = await _context.user.findMany();
      return result[0];
    },
  },
};

import { PrismaClient, User } from "@prisma/client";

type Context = {
  loggedInUser?: User;
  client: PrismaClient;
};

// Resolver 타입 정하기

export type Resolver = (root: any, args: any, context: Context, info: any) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};

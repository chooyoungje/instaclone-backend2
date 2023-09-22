require("dotenv").config();
const express = require("express");
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectedResolver } from "./users/users.utils";
import logger from "morgan";
import client from "./client";
import { graphqlUploadExpress } from "graphql-upload";
const PORT = process.env.PORT;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    console.log(req.headers["content-type"]);
    return {
      loggedInUser: await getUser(req.headers.token),
      protectedResolver,
      client,
    };
  },
});

// 이걸 작성해야 서버와 소통이 가능함
const app = express();
app.use(graphqlUploadExpress());
app.use(logger("tiny")); // 먼저 써줘야 로그에 결과값들이 담김
app.use("static", express.static("uploads"));

// Apollo Server에 app server주기
server.start().then(() => {
  server.applyMiddleware({ app });
});

app.listen({ port: PORT }, () => {
  console.log(`Sever is running on http://localhost:${PORT}/graphql`);
});

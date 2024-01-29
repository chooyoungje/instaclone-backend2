require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectedResolver } from "./users/users.utils";
import logger from "morgan";
import client from "./client";

import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";

const { graphqlUploadExpress } = require("graphql-upload-ts");

const PORT = process.env.PORT;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// 이걸 작성해야 서버와 소통이 가능함
const app = express();
const httpServer = createServer(app);

app.use(graphqlUploadExpress());
app.use(logger("tiny"));

const subscriptionServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
    onConnect: async ({ token }) => {
      if (!token) {
        throw new Error("You can't listen.");
      } else {
        const loggedInUser = await getUser(token);
        return loggedInUser;
      }
    },
    onDisconnect() {
      console.log("연결종료");
    },
  },
  {
    server: httpServer,
    path: "/graphql",
  }
);

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      protectedResolver,
      client,
    };
  },
  //csrfPrevention: true, // 이걸 true로 설정해줘야 보안성이 높다
  plugins: [
    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          },
        };
      },
    },
  ],
});

// Apollo Server에 app server주기
server.start().then(() => {
  server.applyMiddleware({ app });
});

httpServer.listen({ port: PORT }, () => {
  console.log(`Sever is running on http://localhost:${PORT}/graphql`);
});

require("dotenv").config();

import express, {Application} from "express";
import {connectDatabase} from "./database";
import {ApolloServer} from "apollo-server-express";
import {typeDefs} from "./graphql/typeDefs";
import {resolvers} from "./graphql/resolvers";

const mount = async (app: Application) => {
    const db = await connectDatabase();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({db})
    });

    server.applyMiddleware({app, path: "/api"});
    app.listen(process.env.PORT);

    console.log(`[app] : http://localhost:${process.env.PORT}`);
};

mount(express());



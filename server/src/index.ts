require("dotenv").config();

import cookieParser from "cookie-parser";
import express, {Application} from "express";
import {connectDatabase} from "./database";
import {ApolloServer} from "apollo-server-express";
import {typeDefs} from "./graphql/typeDefs";
import {resolvers} from "./graphql/resolvers";

const mount = async (app: Application) => {
    const db = await connectDatabase();

    app.use(cookieParser(process.env.COOKIE_SECRET));

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req, res}) => ({db, req, res})
    });

    server.applyMiddleware({app, path: "/api"});
    app.listen(process.env.PORT);

    console.log(`[app] : http://localhost:${process.env.PORT}`);
};

mount(express());



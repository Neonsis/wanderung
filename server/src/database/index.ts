import {MongoClient} from "mongodb";
import {Database, Listing} from "../types";

const url = `mongodb+srv://${process.env.DB_USER}:${
    process.env.DB_USER_PASSWORD
}@${process.env.DB_CLUSTER}.mongodb.net`;

export const connectDatabase = async (): Promise<Database> => {
    const client = await MongoClient.connect(url, {useNewUrlParser: true});
    const db = client.db("wanderung");

    return {
        listings: db.collection("listings")
    };
};

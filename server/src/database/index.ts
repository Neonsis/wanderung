import {MongoClient} from "mongodb";

const url = `mongodb+srv://${process.env.DB_USER}:${
    process.env.DB_USER_PASSWORD
}@${process.env.DB_CLUSTER}.mongodb.net`;

export const connectDatabase = async () => {
    const client = await MongoClient.connect(url, {useNewUrlParser: true});
    const db = client.db("wanderung");

    return {
        listings: db.collection("listings")
    };
};

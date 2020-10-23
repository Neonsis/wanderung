require("dotenv").config();

import {ObjectId} from "mongodb";
import {connectDatabase} from "../src/database";
import {Listing} from "../src/types";

const seed = async () => {
    try {
        console.log("[seed] : running...");

        const db = await connectDatabase();
        const listings: Listing[] = [
            {
                _id: new ObjectId(),
                title: "Clean and fully furnished apartment. 5 min away from CN Tower",
                image:
                    "https://via.placeholder.com/1950x1300.png",
                address: "3210 Scotchmere Dr W, Toronto, ON, CA",
                price: 10000,
                numOfGuests: 2,
                numOfBeds: 1,
                numOfBaths: 2,
                rating: 5
            },
            {
                _id: new ObjectId(),
                title: "Luxurious home with private pool",
                image:
                    "https://via.placeholder.com/1950x1300.png",
                address: "100 Hollywood Hills Dr, Los Angeles, California",
                price: 15000,
                numOfGuests: 2,
                numOfBeds: 1,
                numOfBaths: 1,
                rating: 4
            },
            {
                _id: new ObjectId(),
                title: "Single bedroom located in the heart of downtown San Fransisco",
                image:
                    "https://via.placeholder.com/1950x1300.png",
                address: "200 Sunnyside Rd, San Fransisco, California",
                price: 25000,
                numOfGuests: 3,
                numOfBeds: 2,
                numOfBaths: 2,
                rating: 3
            }
        ];

        for (const listing of listings) {
            await db.listings.insertOne(listing);
        }

        console.log("[seed] : success");
    } catch {
        throw new Error("failed to seed database");
    }
};

seed();

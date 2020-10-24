import React from 'react';
import {gql, useQuery} from "@apollo/client";
import {Listings as ListingsData} from "./__generated__/Listings";

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

export const Listings = () => {
    const {data, loading, error, refetch} = useQuery<ListingsData>(LISTINGS);
};
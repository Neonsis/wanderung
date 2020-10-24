export interface DeleteListing_deleteListing {
  __typename: "Listing";
  id: string;
}

export interface DeleteListing {
  deleteListing: DeleteListing_deleteListing;
}

export interface DeleteListingVariables {
  id: string;
}

import {Booking, Listing} from "../../../types";

export interface LogInArgs {
    input: { code: string } | null;
}

export interface UserBookingArgs {
    limit: number;
    page: number;
}

export interface UserBookingsData {
    total: number;
    result: Booking[];
}

export interface UserListingsArgs {
    limit: number;
    page: number;
}

export interface UserListingsData {
    total: number;
    result: Listing[];
}
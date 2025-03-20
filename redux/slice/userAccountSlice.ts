import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface List {
    address: string;
    cost: number;
    methode: string;
    officerId: string;
    platNomor: string;
    timestamp: string;
    userName: string;
    nameLocation: string;
}

interface userAccountState {
    id: string;
    name: string;
    email: string;
    PIN: string;
    booking: string;
    // bookingList: List[];
}

const initialState: userAccountState = {
    id: "",
    name: "",
    email: "",
    PIN: "",
    booking: "",
    // bookingList: [],
};

const userAccountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setUserAccount(state, action: PayloadAction<userAccountState>) {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.PIN = action.payload.PIN;
            state.booking = action.payload.booking;
            // state.bookingList = action.payload.bookingList;
        },
        resetUserAccount: () => initialState,
    },
});

export const { setUserAccount, resetUserAccount } = userAccountSlice.actions;
export default userAccountSlice.reducer;

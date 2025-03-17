import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface officerAccountState {
    callNumber: string;
    id: string;
    name: string;
    role: string;
    location: string;
}

const initialState: officerAccountState = {
    callNumber: "",
    id: "",
    name: "",
    role: "",
    location: "",
};

const officerAccountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setOfficerAccount(state, action: PayloadAction<officerAccountState>) {
            state.callNumber = action.payload.callNumber;
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.role = action.payload.role;
            state.location = action.payload.location;
        },
    },
});

export const { setOfficerAccount } = officerAccountSlice.actions;
export default officerAccountSlice.reducer;

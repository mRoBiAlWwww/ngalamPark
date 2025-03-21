import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface officerAccountState {
    id: string;
    name: string;
    location: string;
}

const initialState: officerAccountState = {
    id: "",
    name: "",
    location: "",
};

const officerAccountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setOfficerAccount(state, action: PayloadAction<officerAccountState>) {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.location = action.payload.location;
        },
    },
});

export const { setOfficerAccount } = officerAccountSlice.actions;
export default officerAccountSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface officerAccountState {
    id: string;
    name: string;
    location: string;
    nameLocation: string;
}

const initialState: officerAccountState = {
    id: "",
    name: "",
    location: "",
    nameLocation: "",
};

const officerAccountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setOfficerAccount(state, action: PayloadAction<officerAccountState>) {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.location = action.payload.location;
            state.nameLocation = action.payload.nameLocation;
        },
        resetOfficerAccount: () => initialState,
    },
});

export const { setOfficerAccount, resetOfficerAccount } =
    officerAccountSlice.actions;
export default officerAccountSlice.reducer;

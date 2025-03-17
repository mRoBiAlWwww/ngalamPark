import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userAccountState {
    callNumber: string;
    id: string;
    name: string;
    role: string;
    saldo: {
        ovo: number;
        shopeepay: number;
    };
    PIN: string;
}

const initialState: userAccountState = {
    callNumber: "",
    id: "",
    name: "",
    role: "",
    saldo: {
        ovo: 0,
        shopeepay: 0,
    },
    PIN: "",
};

const userAccountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setUserAccount(state, action: PayloadAction<userAccountState>) {
            state.callNumber = action.payload.callNumber;
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.role = action.payload.role;
            state.saldo = action.payload.saldo;
        },
        resetUserAccount: () => initialState,
    },
});

export const { setUserAccount, resetUserAccount } = userAccountSlice.actions;
export default userAccountSlice.reducer;

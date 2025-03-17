import { configureStore } from "@reduxjs/toolkit";
import userAccountReducer from "./slice/userAccountSlice";
import officerAccountReducer from "./slice/officerAccountSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "@react-native-async-storage/async-storage";

const persistConfig = {
    key: "root",
    storage,
    version: 1,
};

const persistedUserAccountReducer = persistReducer(
    persistConfig,
    userAccountReducer
);
const persistedOfficerAccountReducer = persistReducer(
    persistConfig,
    officerAccountReducer
);

const store = configureStore({
    reducer: {
        userAccount: persistedUserAccountReducer,
        officerAccount: persistedOfficerAccountReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

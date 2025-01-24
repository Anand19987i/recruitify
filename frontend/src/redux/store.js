
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
<<<<<<< HEAD
import applicationSlice from "./applicationSlice";
import companySlice from "./companySlice";
=======
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";
>>>>>>> bf8bb31a862e6643cc03d1db27ac85dd554a0117
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
<<<<<<< HEAD
import storageSession from 'redux-persist/lib/storage/session'; 
import storage from 'redux-persist/lib/storage';

const storageType = process.env.NODE_ENV === 'production' ? storage : storageSession; 
=======
import storageSession from 'redux-persist/lib/storage/session'; // Use sessionStorage for persistence
>>>>>>> bf8bb31a862e6643cc03d1db27ac85dd554a0117

// Persist configuration
const persistConfig = {
    key: 'root',
    version: 1,
<<<<<<< HEAD
    storage: storageType,
=======
    storage: storageSession,  // Using sessionStorage for persistence (cleared on tab close)
>>>>>>> bf8bb31a862e6643cc03d1db27ac85dd554a0117
};

// Combine reducers from different slices
const rootReducer = combineReducers({
    auth: authSlice,
    job: jobSlice,
    company: companySlice,
    application: applicationSlice,
});

<<<<<<< HEAD
=======
// Create persisted reducer using persistReducer
>>>>>>> bf8bb31a862e6643cc03d1db27ac85dd554a0117
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

<<<<<<< HEAD
export const persistor = persistStore(store);

=======
// Export the store
>>>>>>> bf8bb31a862e6643cc03d1db27ac85dd554a0117
export default store;

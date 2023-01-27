import { configureStore, combineReducers, applyMiddleware, getDefaultMiddleware } from "@reduxjs/toolkit";
import trackingSlice from './slices/tracking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    persistStore, 
    persistReducer
} from 'redux-persist';

const persistTracking = {
    key: 'ronix1020',
    storage: AsyncStorage
}

const rootReducer = combineReducers({
    tracking: persistReducer(persistTracking, trackingSlice),
});

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
});

let persistor = persistStore(store);

export {store, persistor};

// ejemplo para utilizar el store
// import { useSelector } from "react-redux";
// import { StoreInterface } from "../../interfaces/storeInterface";

// const store = useSelector((state:StoreInterface) => state.auth);
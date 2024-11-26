/*
 * @Author: yc
 * @Date: 2024-11-25 20:15:31
 * @LastEditors: yc
 * @LastEditTime: 2024-11-25 20:40:02
 * @Description: rudex
 */

import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import user from "./modules/user"
import menu from "./modules/menu"
import auth from "./modules/auth"

// create reducer
const reducer = combineReducers({
	user,
	menu,
	auth,
})

// redux persist
const persistConfig = {
	key: "redux-state",
	storage: storage,
}
const persistReducerConfig = persistReducer(persistConfig, reducer)

// store
export const store = configureStore({
	reducer: persistReducerConfig,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
	devTools: true,
})

// create persist store
export const persistor = persistStore(store)

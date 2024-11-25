/*
 * @Author: yc
 * @Date: 2024-11-25 11:20:04
 * @LastEditors: yc
 * @LastEditTime: 2024-11-25 14:46:32
 * @Description: 描述
 */
import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { thunk } from "redux-thunk"
import reducer from "./modules/reducer"

// redux 持久化配置
const persistConfig = {
	key: "redux-state",
	storage: storage,
}
const persistedReducer = persistReducer(persistConfig, reducer)

// 创建 store
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(thunk), // serializableCheck: false :禁用序列化检查，防止 redux-persist 抛出警告
	devTools: process.env.NODE_ENV !== "production",
})

// 创建持久化 store
const persistor = persistStore(store)

export { store, persistor }

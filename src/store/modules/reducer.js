import { createReducer } from "@reduxjs/toolkit"
import { setToken, updateCollapse, setMenuList } from "./action"

const globalState = {
	token: "",
	userInfo: "",
	isCollapse: false,
	menuList: [],
}

// global reducer
const global = createReducer(globalState, (builder) => {
	builder
		.addCase(setToken, (state, action) => {
			state.token = action.payload
		})
		.addCase(updateCollapse, (state, action) => {
			state.isCollapse = action.payload
		})
		.addCase(setMenuList, (state, action) => {
			state.menuList = action.payload
		})
})

export default global

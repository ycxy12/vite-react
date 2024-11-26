import { createSlice } from "@reduxjs/toolkit"
import { getFlatMenuList } from "@/utils"

const menuState = {
	isCollapse: false,
	menuList: [],
	flatMenuList: [],
}

const menuSlice = createSlice({
	name: "menu",
	initialState: menuState,
	reducers: {
		updateCollapse(state, { payload }) {
			state.isCollapse = payload
		},
		setMenuList(state, { payload }) {
			state.menuList = payload
			state.flatMenuList = getFlatMenuList(payload)
		},
	},
})

export default menuSlice.reducer
export const { updateCollapse, setMenuList } = menuSlice.actions

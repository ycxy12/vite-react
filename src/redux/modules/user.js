import { createSlice } from "@reduxjs/toolkit"

const userState = {
	token: "",
	userInfo: undefined,
}

const userSlice = createSlice({
	name: "user",
	initialState: userState,
	reducers: {
		setToken(state, { payload }) {
			state.token = payload
		},
		setUserInfo(state, { payload }) {
			state.userInfo = payload
		},
	},
})

export const { setToken, setUserInfo } = userSlice.actions
export default userSlice.reducer

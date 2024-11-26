import { createSlice } from "@reduxjs/toolkit"

const authState = {
	authRouter: [], //权限路由
}

const authSlice = createSlice({
	name: "auth",
	initialState: authState,
	reducers: {
		setAuthRouter(state, { payload }) {
			state.authRouter = payload
		},
	},
})

export const { setAuthButtons, setAuthRouter } = authSlice.actions
export default authSlice.reducer

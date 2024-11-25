import * as types from "@/store/mutation-types"
import { getMenuList } from "@/api/login"


// * updateCollapse
export const updateCollapse = (isCollapse) => ({
	type: types.UPDATE_COLLAPSE,
	isCollapse,
})

// * setMenuList
export const setMenuList = (menuList) => ({
	type: types.SET_MENU_LIST,
	menuList,
})

// ? 下面方法仅为测试使用，不参与任何功能开发

// * redux-thunk
export const getMenuListActionThunk = () => {
	return async (dispatch) => {
		const res = await getMenuList()
		dispatch({
			type: types.SET_MENU_LIST,
			menuList: res.data || [],
		})
	}
}

// * redux-promise《async/await》
export const getMenuListAction = async () => {
	const res = await getMenuList()
	return {
		type: types.SET_MENU_LIST,
		menuList: res.data ? res.data : [],
	}
}

// * redux-promise《.then/.catch》
export const getMenuListActionPromise = () => {
	return getMenuList().then((res) => {
		return {
			type: types.SET_MENU_LIST,
			menuList: res.data ? res.data : [],
		}
	})
}

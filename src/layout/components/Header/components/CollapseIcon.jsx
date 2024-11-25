import { useDispatch, useSelector } from "react-redux" // 使用 useSelector 和 useDispatch
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { updateCollapse } from "@/store/modules/action"

const CollapseIcon = () => {
	const dispatch = useDispatch() // 使用 useDispatch 来获取 dispatch
	const isCollapse = useSelector((state) => state.isCollapse) // 使用 useSelector 获取 isCollapse 状态

	return (
		<div
			className="collapsed"
			onClick={() => {
				dispatch(updateCollapse(!isCollapse)) // 调度更新 isCollapse
			}}
		>
			{isCollapse ? <MenuUnfoldOutlined id="isCollapse" /> : <MenuFoldOutlined id="isCollapse" />}
		</div>
	)
}

export default CollapseIcon

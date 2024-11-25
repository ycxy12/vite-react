import { useSelector } from "react-redux" // 使用 useSelector 来获取 Redux store 状态
import logo from "@/assets/images/logo.png"

const Logo = () => {
	const isCollapse = useSelector((state) => state.isCollapse) // 获取 isCollapse 状态

	return (
		<div className="logo-box">
			<img src={logo} alt="logo" className="logo-img" />
			{!isCollapse ? <h2 className="logo-text">React Admin</h2> : null}
		</div>
	)
}

export default Logo

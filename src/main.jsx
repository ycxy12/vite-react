import React from "react"
import ReactDOM from "react-dom/client"
//使用normalize 重置css
import "normalize.css/normalize.css"
import "@/styles/index.less"
import "virtual:svg-icons-register" //引入svg
import { Provider } from "react-redux" //通过Provider将数据传递react子组件
import { PersistGate } from "redux-persist/integration/react" //持久化数据 & 页面刷新缓存初始化问题
import { store, persistor } from "./store"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
)

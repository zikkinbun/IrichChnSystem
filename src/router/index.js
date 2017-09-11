import Router from "vue-router";

//	路由与对应的组件文件
import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import Applist from "@/components/Applist";
import Appreport from "@/components/Appreport";


const router = new Router({
	mode: "history",
	routes: [{
		path: "/",
		name: "login",
		component: Login
	}, {
		path: "/dashboard",
		component: Dashboard,
		children: [{
			path: "",
			name: "dashboard",
			component: Appreport
		}, {
			path: "applist",
			name: "applist",
			component: Applist
		}, {
			path: "appreport",
			name: "appreport",
			component: Appreport
		}]
	}]
});

export default router;

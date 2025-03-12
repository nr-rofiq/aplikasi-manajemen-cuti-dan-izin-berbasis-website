import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import type { AuthContext } from "../auth";

interface MyRouterContext {
	auth: AuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<>
			<Outlet />
		</>
	),
});

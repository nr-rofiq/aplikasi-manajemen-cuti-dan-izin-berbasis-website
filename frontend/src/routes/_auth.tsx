import {
	Link,
	Outlet,
	createFileRoute,
	redirect,
	useRouter,
	useRouterState,
} from "@tanstack/react-router";
import { useAuth } from "../auth";
import { useEffect } from "react";

export const Route = createFileRoute("/_auth")({
	beforeLoad: ({ context, location }) => {
		if (!context.auth.isAuthenticated) {
			throw redirect({
				to: "/",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: AuthLayout,
});

function AuthLayout() {
	const currentRoot = useRouterState().location.pathname;
	const router = useRouter();
	const { data, logout } = useAuth();

	useEffect(() => {
		if (data?.is_ppk) {
			router.navigate({ to: "/admin" });
		} else {
			router.navigate({ to: "/user" });
		}
	}, [data, router]);

	return (
		<>
			<div className="flex h-screen">
				<div className="w-2/8 p-4 lg:w-1/8 text-center flex flex-col justify-between text-white bg-indigo-800">
					<div className="space-y-2">
						<h1 className="text-xl border-b-2 border-white pb-4 cursor-default font-bold  leading-tight tracking-tight">
							APP CUTI
						</h1>
						<ul>
							<li className="py-2 px-4 cursor-pointer text-white hover:bg-indigo-950 hover:text-white/90 rounded-md">
								<Link to={"."} className="w-full">
									{currentRoot == "/admin" ? "Administrator" : "Dashboard"}
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<button
							className="py-2 px-4 cursor-pointer text-white hover:bg-indigo-950 hover:text-white/90 rounded-md"
							onClick={async () => await logout()}
						>
							Logout
						</button>
					</div>
				</div>

				<div className="w-6/8 lg:w-7/8 bg-gray-100 flex flex-col">
					<Outlet />
				</div>
			</div>
		</>
	);
}

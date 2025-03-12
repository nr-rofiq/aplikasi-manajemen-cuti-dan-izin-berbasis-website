import { createFileRoute } from "@tanstack/react-router";
import User from "../pages/dashboard/user";

export const Route = createFileRoute("/_auth/user")({
	component: User,
});

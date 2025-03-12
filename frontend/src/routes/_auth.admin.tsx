import { createFileRoute } from "@tanstack/react-router";
import Admin from "../pages/dashboard/admin";

export const Route = createFileRoute("/_auth/admin")({
	component: Admin,
});

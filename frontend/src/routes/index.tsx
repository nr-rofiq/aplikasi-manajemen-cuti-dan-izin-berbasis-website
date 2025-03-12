import { createFileRoute } from "@tanstack/react-router";
import Login from "../pages/login";
import { z } from "zod";

export const Route = createFileRoute("/")({
	validateSearch: z.object({
		redirect: z.string().optional().catch(""),
	}),
	component: Login,
});

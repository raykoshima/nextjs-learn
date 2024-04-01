import { validateRequest } from "@/libs/auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
	const { user } = await validateRequest();

	if (user) {
		redirect("/");
	}

	return (
		<div>
			{children}
		</div>
	);
}

import { validateRequest } from "@/libs/auth";
import { redirect } from "next/navigation";
import { Navbar } from "../components/navbar";

export default async function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const { user } = await validateRequest();

	if (!user) {
		redirect("/auth/sign-in");
	}

	return (
    <>
    <Navbar user={user} />
    {children}
    </>
    )
}

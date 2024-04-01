"use server";

import { lucia, validateRequest } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { error } from "console";
import { generateId } from "lucia";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";


interface loginform{
    email: string,
    password: string,
}

interface registerform{
    email: string,
    password: string,
    confirmPassword: string,
    firstname? : string,
    lastname? : string,
}

export async function login(data:loginform) {
    const finduser = await prisma.user.findFirst({
        where : {
            email: data.email,
        }
    })
    if (!finduser){
        return {
            error : "ไม่พบผู้ใช้หรือกรอกข้อมูลไม่ถูกต้อง"
        }
    }
    const validationPass = await new Argon2id().verify(
        finduser.password,
        data.password
    )
    if (!validationPass){
        return {
            error : "ไม่พบผู้ใช้หรือกรอกข้อมูลไม่ถูกต้อง"
        }
    }
    const header = headers();
    const session = await lucia.createSession(finduser.id, {
        userAgent: header.get("user-agent") ?? "",
		ip: (header.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0],
    });
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	return {
        error: null
    }   
}

export async function register(data:registerform) {
    if(data.confirmPassword !== data.password){
        return {
            error : "รหัสผ่านไม่ตรงกัน"
        }
    }
    const checkifExisted = await prisma.user.findFirst({
        where : {
            email : data.email,
        }
    })
    if (checkifExisted){
        return {
            error : "มีผู้ใช้นี้แล้ว"
        }
    }

    const userId = generateId(15);
    const hashedPassword = await new Argon2id().hash(data.password);

    const user = await prisma.user.create({
        data: {
            id : userId,
            email : data.email,
            password: hashedPassword,
        }
    })

    const header = headers();
    const session = await lucia.createSession(userId, {
        userAgent: header.get("user-agent") ?? "",
		ip: (header.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0],
    });
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    
	return {
        error: null
    }   
}

export async function logout() {
	const { session } = await validateRequest();

	if (!session) {
		return {
			error: "Unauthorized",
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	return redirect("/auth/sign-in");
}


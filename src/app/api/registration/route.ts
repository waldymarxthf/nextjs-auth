import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
	const body = await req.json();
	const { firstName, lastName, email, password, name } = body;

	if (!password) {
		return NextResponse.json({ error: "Password is required" });
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const existingUser = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (existingUser) {
			return NextResponse.json({ error: "User already exists" });
		}

		const user = await prisma.user.create({
			data: {
				firstName,
				lastName,
				email,
				name,
				password: hashedPassword,
			},
		});

		return NextResponse.json({ user });
	} catch (error) {
		return NextResponse.json({ error: "Unable to create user" });
	}
}

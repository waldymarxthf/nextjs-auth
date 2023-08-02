import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import type { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
const prisma = new PrismaClient();

export const authConfig: AuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		Credentials({
			credentials: {
				email: { label: "email", type: "text", placeholder: "email@email.com" },
				password: { label: "Password", type: "password", placeholder: "Password" },
			},
			async authorize(credentials) {
				const user = await prisma.user.findUnique({
					where: {
						email: credentials?.email,
					},
				});

				if (!user) {
					return null;
				}

				if (!user || !credentials?.password || !user.password) {
					throw new Error("Invalid credentials");
				}

				const isValid = await bcrypt.compare(credentials?.password, user.password);

				if (isValid) {
					return { id: user.id, email: user.email, name: user.name };
				}

				return null;
			},
		}),
	],
	pages: {
		signIn: "/user/login",
	},
};

import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		userId: string;
	}

	interface JWT {
		id: string;
	}
}

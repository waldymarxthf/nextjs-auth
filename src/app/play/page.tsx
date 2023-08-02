import { getServerSession } from "next-auth";

import { Title } from "@/components/index";
import { authConfig } from "@/configs/auth";

export default async function Roulette() {
	const session = await getServerSession(authConfig);
	return <Title align="center">This is game of {session?.user?.name}</Title>;
}

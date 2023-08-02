import { getServerSession } from "next-auth";
import { HeaderMegaMenu } from "./TheHeader";
import { authConfig } from "@/configs/auth";
import { Anchor, Button, Group } from "@/components/index";
import User from "./User";

export default async function Header() {
	const session = await getServerSession(authConfig);
	return (
		<>
			<HeaderMegaMenu>
				{session ? (
					<User session={session} />
				) : (
					<Group>
						<Anchor href="/user/login">
							<Button variant="outline" radius="xl">
								Sign in
							</Button>
						</Anchor>
					</Group>
				)}
			</HeaderMegaMenu>
		</>
	);
}

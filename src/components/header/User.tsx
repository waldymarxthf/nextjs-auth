"use client";

import {
	Avatar,
	Group,
	IconChevronDown,
	IconLogout,
	IconSettings,
	Menu,
	Text,
	UnstyledButton,
	createStyles,
	rem,
} from "@/components/index";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

const useStyles = createStyles((theme) => ({
	user: {
		borderRadius: theme.radius.sm,
		color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
		padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
		transition: "background-color 100ms ease",
		height: "40px",
		display: "flex",
		alignItems: "center",

		"&:hover": {
			backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
		},

		[theme.fn.smallerThan("xs")]: {
			display: "none",
		},
	},
}));

interface SessionProps {
	session?: Session;
}

export default function User({ session }: SessionProps) {
	const { classes, cx } = useStyles();
	return (
		<Menu
			withinPortal
			position="bottom-end"
			transitionProps={{ transition: "pop-top-right" }}
			width={260}
		>
			<Menu.Target>
				<UnstyledButton className={cx(classes.user)}>
					<Group spacing={7}>
						<Avatar color="cyan" radius="xl" size={30} src={session?.user?.image}>
							{session?.user?.name?.slice(0, 2)}
						</Avatar>
						<Text mr={3} size="sm" sx={{ lineHeight: 1 }} weight={500}>
							{session?.user?.name}
						</Text>
						<IconChevronDown size={rem(12)} stroke={1.5} />
					</Group>
				</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Label>Settings</Menu.Label>
				<Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>Account settings</Menu.Item>
				<Menu.Item
					icon={<IconLogout size="0.9rem" stroke={1.5} />}
					onClick={() =>
						void signOut({
							callbackUrl: "/",
						})
					}
				>
					Logout
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}

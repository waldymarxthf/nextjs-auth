"use client";

import {
	createStyles,
	Header,
	HoverCard,
	Group,
	Button,
	UnstyledButton,
	Text,
	SimpleGrid,
	ThemeIcon,
	Anchor,
	Divider,
	Center,
	Box,
	Burger,
	Drawer,
	Collapse,
	ScrollArea,
	rem,
	Title,
	useDisclosure,
	IconNotification,
	IconCode,
	IconBook,
	IconChartPie3,
	IconFingerprint,
	IconCoin,
	IconChevronDown,
} from "@/components/index";

const useStyles = createStyles((theme) => ({
	link: {
		alignItems: "center",
		color: theme.colorScheme === "dark" ? theme.white : theme.black,
		display: "flex",
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,
		height: "100%",
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
		textDecoration: "none",

		[theme.fn.smallerThan("sm")]: {
			alignItems: "center",
			display: "flex",
			height: rem(42),
			width: "100%",
		},

		...theme.fn.hover({
			backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
		}),
	},
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

	userActive: {
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
	},

	subLink: {
		borderRadius: theme.radius.md,
		padding: `${theme.spacing.xs} ${theme.spacing.md}`,
		width: "100%",

		...theme.fn.hover({
			backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
		}),

		"&:active": theme.activeStyles,
	},

	dropdownFooter: {
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
		borderTop: `${rem(1)} solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
		}`,
		margin: `calc(${theme.spacing.md} * -1)`,
		marginTop: theme.spacing.sm,
		padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
		paddingBottom: theme.spacing.xl,
	},

	hiddenMobile: {
		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
	},

	hiddenDesktop: {
		[theme.fn.largerThan("sm")]: {
			display: "none",
		},
	},
}));

const mockdata = [
	{
		icon: IconCode,
		title: "Open source",
		description: "This Pokémon’s cry is very loud and distracting",
	},
	{
		icon: IconCoin,
		title: "Free for everyone",
		description: "The fluid of Smeargle’s tail secretions changes",
	},
	{
		icon: IconBook,
		title: "Documentation",
		description: "Yanma is capable of seeing 360 degrees without",
	},
	{
		icon: IconFingerprint,
		title: "Security",
		description: "The shell’s rounded shape and the grooves on its.",
	},
	{
		icon: IconChartPie3,
		title: "Analytics",
		description: "This Pokémon uses its flying ability to quickly chase",
	},
	{
		icon: IconNotification,
		title: "Notifications",
		description: "Combusken battles with the intensely hot flames it spews",
	},
];

export const HeaderMegaMenu = ({ children }: { children: React.ReactNode }) => {
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
	const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
	const { classes, theme } = useStyles();

	const links = mockdata.map((item) => (
		<UnstyledButton key={item.title} className={classes.subLink}>
			<Group noWrap align="flex-start">
				<ThemeIcon radius="md" size={34} variant="default">
					<item.icon color={theme.fn.primaryColor()} size={rem(22)} />
				</ThemeIcon>
				<div>
					<Text fw={500} size="sm">
						{item.title}
					</Text>
					<Text color="dimmed" size="xs">
						{item.description}
					</Text>
				</div>
			</Group>
		</UnstyledButton>
	));

	return (
		<Box pb={120}>
			<Header height={60} px="md">
				<Group position="apart" sx={{ height: "100%" }}>
					<Anchor color="DefaultMantineColor" underline={false} href="/">
						<Title>Welcome</Title>
					</Anchor>

					<Group className={classes.hiddenMobile} spacing={0} sx={{ height: "100%" }}>
						<a className={classes.link} href="/play">
							Play
						</a>
						<HoverCard withinPortal position="bottom" radius="md" shadow="md" width={600}>
							<HoverCard.Target>
								<a className={classes.link} href="#">
									<Center inline>
										<Box component="span" mr={5}>
											Features
										</Box>
										<IconChevronDown color={theme.fn.primaryColor()} size={16} />
									</Center>
								</a>
							</HoverCard.Target>

							<HoverCard.Dropdown sx={{ overflow: "hidden" }}>
								<Group position="apart" px="md">
									<Text fw={500}>Features</Text>
									<Anchor fz="xs" href="#">
										View all
									</Anchor>
								</Group>

								<Divider
									color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
									mx="-md"
									my="sm"
								/>

								<SimpleGrid cols={2} spacing={0}>
									{links}
								</SimpleGrid>

								<div className={classes.dropdownFooter}>
									<Group position="apart">
										<div>
											<Text fw={500} fz="sm">
												Get started
											</Text>
											<Text color="dimmed" size="xs">
												Their food sources have decreased, and their numbers
											</Text>
										</div>
										<Button variant="default">Get started</Button>
									</Group>
								</div>
							</HoverCard.Dropdown>
						</HoverCard>
						<a className={classes.link} href="#">
							Learn
						</a>
						<a className={classes.link} href="#">
							Academy
						</a>
					</Group>

					{children}

					<Burger className={classes.hiddenDesktop} opened={drawerOpened} onClick={toggleDrawer} />
				</Group>
			</Header>

			<Drawer
				className={classes.hiddenDesktop}
				opened={drawerOpened}
				padding="md"
				size="100%"
				title="Navigation"
				zIndex={1000000}
				onClose={closeDrawer}
			>
				<ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
					<Divider color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} my="sm" />

					<a className={classes.link} href="#">
						Home
					</a>
					<UnstyledButton className={classes.link} onClick={toggleLinks}>
						<Center inline>
							<Box component="span" mr={5}>
								Features
							</Box>
							<IconChevronDown color={theme.fn.primaryColor()} size={16} />
						</Center>
					</UnstyledButton>
					<Collapse in={linksOpened}>{links}</Collapse>
					<a className={classes.link} href="#">
						Learn
					</a>
					<a className={classes.link} href="#">
						Academy
					</a>

					<Divider color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} my="sm" />

					{/* {session ? (
						<Title>authorized</Title>
					) : (
						<Group grow pb="xl" position="center" px="md">
							<Button variant="default">Log in</Button>
							<Button>Sign up</Button>
						</Group>
					)} */}
				</ScrollArea>
			</Drawer>
		</Box>
	);
};

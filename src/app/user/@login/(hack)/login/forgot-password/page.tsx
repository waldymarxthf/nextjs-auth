// import { ForgotPasswordPage } from "@/components/foggot-password";

// export default async function ForgotPassword() {
// 	return <ForgotPasswordPage />;
// }

"use client";

import {
	createStyles,
	TextInput,
	Button,
	Group,
	Anchor,
	Center,
	rem,
	Modal,
	IconAt,
} from "@/components/index";
import { IconArrowLeft } from "@/components/index";
import { useRouter } from "next/navigation";

const useStyles = createStyles((theme) => ({
	title: {
		fontSize: rem(26),
		fontWeight: 900,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
	},

	controls: {
		[theme.fn.smallerThan("xs")]: {
			flexDirection: "column-reverse",
		},
	},

	control: {
		[theme.fn.smallerThan("xs")]: {
			width: "100%",
			textAlign: "center",
		},
	},
}));

export default function ForgotPasswordPage() {
	const { classes } = useStyles();
	const router = useRouter();

	return (
		<Modal
			radius="md"
			size="sm"
			title="Enter your email to get a reset link"
			opened
			onClose={() => router.back()}
			centered
		>
			<TextInput
				label="Your email"
				placeholder="email@email.com"
				icon={<IconAt size="0.9rem" />}
				radius="md"
				required
			/>
			<Group position="apart" mt="lg" className={classes.controls}>
				<Anchor color="dimmed" size="sm" className={classes.control}>
					<Center inline>
						<IconArrowLeft size={rem(12)} stroke={1.5} />
						<Anchor href="/user/login" ml={5} color="default">
							Back to the login page
						</Anchor>
					</Center>
				</Anchor>
				<Button radius="xl" className={classes.control}>
					Reset password
				</Button>
			</Group>
		</Modal>
	);
}

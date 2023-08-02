"use client";

import {
	Anchor,
	Button,
	Checkbox,
	Divider,
	Group,
	IconAt,
	IconCheck,
	IconLock,
	Modal,
	PasswordInput,
	Text,
	TextInput,
	notifications,
	useForm,
} from "@/components/index";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GoogleButton } from "@/components/SocialButtons/GoogleButton";
import { TwitterButton } from "@/components/SocialButtons/TwitterButton";

interface FormProps {
	email: string;
	password: string;
}

export default function Login() {
	const router = useRouter();
	const form = useForm({
		initialValues: {
			email: "",
			password: "",
			rememberMe: "",
		},
	});

	const handleSubmit = async (value: FormProps) => {
		try {
			notifications.show({
				id: "load-data",
				loading: true,
				title: "Loading your data",
				message: "Data will be loaded in 3 seconds, you cannot close this yet",
				autoClose: false,
				withCloseButton: false,
			});
			const res = await signIn("credentials", { ...value, redirect: false });
			console.log(res);
			if (res?.error === "CredentialsSignin") {
				notifications.update({
					id: "load-data",
					title: "Login error",
					message: "The entered e-mail address or password is invalid",
					color: "red",
				});
			} else {
				notifications.update({
					id: "load-data",
					title: "Login successful",
					message: "You have successfully login",
					color: "teal",
					icon: <IconCheck size="1rem" />,
				});
				router.push("/play");
			}
		} catch (error) {
			notifications.show({
				title: "Unexpected error",
				message: "An unexpected error occurred",
				color: "red",
			});
		}
	};
	return (
		<>
			<Modal
				radius="md"
				size="sm"
				title="Welcome to Lorem, login with:"
				opened
				onClose={() => router.back()}
				centered
			>
				<form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
					<TextInput
						label="Email"
						placeholder="you@mantine.dev"
						required
						radius="md"
						icon={<IconAt size="0.9rem" />}
						{...form.getInputProps("email")}
					/>
					<PasswordInput
						label="Password"
						placeholder="Your password"
						required
						radius="md"
						mt="md"
						icon={<IconLock size="0.9rem" />}
						{...form.getInputProps("password")}
					/>
					<Group position="apart" mt="lg">
						<Checkbox
							radius="md"
							label="Remember me"
							size="sm"
							{...form.getInputProps("rememberMe", { type: "checkbox" })}
						/>
						<Anchor href="/user/login/forgot-password" size="sm">
							Forgot password?
						</Anchor>
					</Group>

					<Button radius="xl" type="submit" fullWidth mt="xl">
						Sign in
					</Button>
				</form>
				<Divider label="Or continue with email" labelPosition="center" my="lg" />
				<Group grow mb="md" mt="md">
					<GoogleButton radius="xl">Google</GoogleButton>
					<TwitterButton radius="xl">Twitter</TwitterButton>
				</Group>
				<Text color="dimmed" size="sm" align="center" mt={5}>
					Do not have an account yet?{" "}
					<Anchor href="/user/register" size="sm">
						Create account
					</Anchor>
				</Text>
			</Modal>
		</>
	);
}

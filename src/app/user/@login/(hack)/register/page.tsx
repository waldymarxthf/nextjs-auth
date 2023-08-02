"use client";

import {
	Anchor,
	Button,
	Checkbox,
	Group,
	Modal,
	PasswordInput,
	Text,
	TextInput,
	useForm,
	IconLock,
	IconAt,
	IconUser,
	IconCheck,
} from "@/components/index";
import { useRouter } from "next/navigation";
import { notifications } from "@/components/index";

export default function Register() {
	const router = useRouter();
	const form = useForm({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			name: "",
			password: "",
			confirm_password: "",
		},
		validate: {
			firstName: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
			lastName: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
			name: (value) => (value.length < 2 ? "Username must have at least 2 letters" : null),
			password: (value) => (value.length < 8 ? "Password must have at least 8 charachters" : null),
			confirm_password: (value, values) =>
				value !== values.password ? "Passwords did not match" : null,
		},
	});
	const handleSubmit = async () => {
		notifications.show({
			id: "load-data",
			loading: true,
			title: "Loading your data",
			message: "Data will be loaded in 3 seconds, you cannot close this yet",
			autoClose: false,
			withCloseButton: false,
		});

		try {
			const response = await fetch("/api/registration", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form.values),
				cache: "no-store",
			});

			const data = await response.json();
			console.log(data);
			if (data.error) {
				notifications.update({
					id: "load-data",
					title: "Registration error",
					message: data.error,
					color: "red",
				});
			} else {
				notifications.update({
					id: "load-data",
					title: "Registration successful",
					message: "You have successfully registered",
					color: "teal",
					icon: <IconCheck size="1rem" />,
				});
				router.push("/user/login");
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
				title="Registration"
				opened
				onClose={() => router.back()}
				centered
			>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<Group grow>
						<TextInput
							label="First Name"
							placeholder="Your first name"
							required
							radius="md"
							{...form.getInputProps("firstName")}
						/>
						<TextInput
							label="Last Name"
							placeholder="Your last name"
							required
							radius="md"
							{...form.getInputProps("lastName")}
						/>
					</Group>
					<TextInput
						label="Email"
						placeholder="you@mantine.dev"
						required
						radius="md"
						mt="xs"
						icon={<IconAt size="0.9rem" />}
						{...form.getInputProps("email")}
					/>
					<TextInput
						label="Username"
						placeholder="Username"
						required
						radius="md"
						mt="xs"
						icon={<IconUser size="0.9rem" />}
						{...form.getInputProps("name")}
					/>
					<PasswordInput
						label="Password"
						placeholder="Your password"
						required
						radius="md"
						mt="xs"
						icon={<IconLock size="0.9rem" />}
						{...form.getInputProps("password")}
					/>
					<PasswordInput
						label="Confirm Password"
						placeholder="Confirm password"
						required
						radius="md"
						mt="xs"
						icon={<IconLock size="0.9rem" />}
						{...form.getInputProps("confirm_password")}
					/>
					<Group position="apart" mt="lg">
						<Checkbox
							radius="md"
							label="I agree to the processing of personal data"
							size="sm"
							required
						/>
					</Group>

					<Button radius="xl" type="submit" fullWidth mt="xl">
						Register
					</Button>
				</form>
				<Text color="dimmed" size="sm" align="center" mt={5}>
					<Anchor href="/user/login" size="sm">
						Have an account? Login
					</Anchor>
				</Text>
			</Modal>
		</>
	);
}

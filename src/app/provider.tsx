"use client";

import { MantineProvider } from "@mantine/core";
import React from "react";

import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";
import { CacheProvider } from "@emotion/react";
import { SessionProvider } from "next-auth/react";
import { Notifications } from "@mantine/notifications";

export const useGluedEmotionCache = (key = "emotion") => {
	const [cache] = useState(() => {
		const cache = createCache({ key });
		cache.compat = true;
		return cache;
	});

	useServerInsertedHTML(() => {
		const entries = Object.entries(cache.inserted);
		if (entries.length === 0) return null;
		const names = entries
			.map(([n]) => n)
			.filter((n) => typeof n === "string")
			.join(" ");
		const styles = entries.map(([, s]) => s).join("\n");
		const emotionKey = `${key} ${names}`;
		return <style dangerouslySetInnerHTML={{ __html: styles }} data-emotion={emotionKey} />;
	});

	return cache;
};

interface ProviderProps {
	children: React.ReactNode;
}

export const Provider = ({ children }: ProviderProps) => {
	const cache = useGluedEmotionCache();
	return (
		<CacheProvider value={cache}>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				emotionCache={cache}
				theme={{ colorScheme: "dark" }}
			>
				<Notifications />
				<SessionProvider>{children}</SessionProvider>
			</MantineProvider>
		</CacheProvider>
	);
};

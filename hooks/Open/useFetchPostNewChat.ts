'use client';

import { Inputs } from '@/Components/Open/ChatGenerator/ChatGenerator.type';
import { useMutation } from '@tanstack/react-query';

export const useFetchPostNewChat = (token: string) => {
	const mutation = useMutation({
		mutationFn: (data: Inputs) =>
			fetch('https://fastcampus-chat.net/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					serverId: process.env.NEXT_PUBLIC_SERVER_KEY as string,
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			}),
	});

	return mutation;
};
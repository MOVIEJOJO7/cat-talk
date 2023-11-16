'use client';

import { useSearchParams } from 'next/navigation';
import { getCookie } from '@/Components/Login/Cookie';
import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import ChatRoom from '@/Components/Chat/ChatRoom';

const Chat = ({ params }: { params: { id: string } }) => {
	const chatId = params.id;
	const query = useSearchParams();
	const privateValue = query?.get('isPrivate') as string;
	const accessToken = getCookie('accessToken');

	const [isConnect, setIsConnect] = useState(false);
	const [chatSocket, setchatSocket] = useState<Socket | null>(null);

	// 소켓 연결 시도
	useEffect(() => {
		if (isConnect === true) return;

		const socket = io(`https://fastcampus-chat.net/chat?chatId=${chatId}`, {
			extraHeaders: {
				Authorization: `Bearer ${accessToken}`,
				serverId: process.env.NEXT_PUBLIC_SERVER_ID as string,
			},
		});

		socket.off('connect');
		socket.off('connect_error');
		socket.off('disconnect');

		socket.on('connect', () => {
			setIsConnect(true);
			setchatSocket(socket);
		});

		socket.on('disconnect', () => {
			setchatSocket(null);
			setIsConnect(false);
		});

		socket.on('connect_error', () => {
			setchatSocket(null);
			throw new Error();
		});
	}, [accessToken, isConnect, chatId]);

	useEffect(() => {
		return () => {
			chatSocket?.disconnect();
		};
	}, [chatSocket]);

	return chatSocket ? (
		<div className="h-screen overflow-y-scroll">
			<ChatRoom
				socket={chatSocket}
				chatId={chatId}
				privateValue={privateValue}
				accessToken={accessToken}
			/>
		</div>
	) : (
		<></>
	);
};

export default Chat;

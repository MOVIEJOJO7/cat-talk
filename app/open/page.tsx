import React from 'react';
import { fetchAllChat, filterChat } from './open.utils';
import ChatList from '@/Components/Open/ChatList/ChatList';

//filter로 채팅방 중 private이 아닌 것만 가져오기

const Open = async () => {
	const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN as string;
	const { chats } = await fetchAllChat(accessToken);
	const filteredChatList = filterChat(chats);

	return (
		<div className="flex flex-col bg-red-300">
			<ChatList filteredChatList={filteredChatList} />
		</div>
	);
};

export default Open;

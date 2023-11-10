'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import ProfileModal from '../Common/ProfileModal';

type User = {
	id: string;
	password: string;
	name: string;
	picture: string;
	chats: string[];
};

const FriendProfiles = ({ allUsers }: { allUsers: User[] }) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [modalUser, setModalUser] = useState<User | object>({});

	const openModalHandler = (user: User) => {
		setIsModalOpen(true);
		setModalUser(user);
	};

	return (
		<div>
			<ProfileModal
				user={modalUser}
				open={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
			<div className="w-full mt-8 mb-5 pt-2 border-t border-gray-400 ">
				<h4 className="text-gray-400 font-bold">친구{allUsers.length}명</h4>
			</div>
			{allUsers.map((user) => {
				return (
					<li
						key={user.id}
						className="list-none cursor-pointer"
						onClick={() => {
							openModalHandler(user);
						}}
					>
						<FriendProfile user={user} />
					</li>
				);
			})}
		</div>
	);
};

const FriendProfile = ({ user }: { user: User }) => {
	const picture = user.picture || '/icon_cat.svg';

	return (
		<div className="flex w-full align-center mb-4">
			<div>
				<Image
					width={60}
					height={60}
					alt={user.name}
					src={picture}
					className="rounded-3xl mr-5"
				/>
			</div>
			<h4 className="w-1/2 py-4 text-l">{user.name}</h4>
		</div>
	);
};

export default FriendProfiles;
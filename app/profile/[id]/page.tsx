import { Chat } from '@/types';
import { fetchMyChats, fetchProfileData } from './profile.utils';
import ProfileModal from '@/Components/Profile/ProfileModal';

const Profile = async ({ params }: { params: { id: string } }) => {
	const accessToken = process.env.NEXT_PUBLIC_ACCESSTOKEN as string;
	const user = await fetchProfileData(accessToken, params.id);
	const myChats: Chat[] = await fetchMyChats(accessToken);
	const existPrivateChat: Chat | undefined = myChats.filter(
		(chat) =>
			chat.users.length === 2 &&
			(chat.users[0].id === params.id || chat.users[1].id === params.id),
	)[0];

	return (
		<ProfileModal
			user={user}
			existPrivateChat={existPrivateChat}
		></ProfileModal>
	);
};

export default Profile;

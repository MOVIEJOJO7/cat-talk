'use client';

import {
	SpeedDial,
	SpeedDialHandler,
	SpeedDialContent,
	SpeedDialAction,
	Typography,
} from '@material-tailwind/react';
import { chatModalAtom } from '@/atoms/chatModalAtom';
import { useSetRecoilState } from 'recoil';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const SpeedDialWithTextInside = () => {
	const setModalOpen = useSetRecoilState(chatModalAtom);
	const params = usePathname();
	const router = useRouter();

	const handleOpenModal = (query: string) => {
		router.replace(`${params}?${new URLSearchParams({ type: query })}`);
		setModalOpen(true);
	};

	return (
		<div className="absolute shadow-xl rounded-full w-fit h-fit z-50 bottom-3 right-3">
			<SpeedDial>
				<SpeedDialHandler>
					<div className="flex flex-col justify-center items-center text-center text-sm rounded-full  hover:scale-105 transition-all duration-500 ease-in-out  w-16 h-16 bg-primary cursor-pointer">
						채팅
						<br />
						만들기
					</div>
				</SpeedDialHandler>
				<SpeedDialContent>
					<SpeedDialAction
						className="h-16 w-16 shadow-md"
						onClick={() => handleOpenModal('open')}
					>
						<Link href={`?${new URLSearchParams({ type: 'open' })}`}>
							<Typography color="blue-gray" className="text-xs font-normal">
								오픈채팅
							</Typography>
						</Link>
					</SpeedDialAction>
					<SpeedDialAction
						className="h-16 w-16 shadow-md"
						onClick={() => handleOpenModal('private')}
					>
						<Link href={`?${new URLSearchParams({ type: 'private' })}`}>
							<Typography color="blue-gray" className="text-xs font-normal">
								개인채팅
							</Typography>
						</Link>
					</SpeedDialAction>
				</SpeedDialContent>
			</SpeedDial>
		</div>
	);
};

export default SpeedDialWithTextInside;

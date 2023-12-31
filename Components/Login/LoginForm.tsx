'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchLogin } from '../../app/login/login.utils';
import { setCookie } from '@/Components/Login/Cookie';
import { Button } from '@material-tailwind/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { Input } from '@material-tailwind/react';
import Image from 'next/image';
import useAsyncLoading from '@/hooks/Open/useAsyncLoading';
import { IFormInput } from './Login.types';
import icon_cat from '@/public/icon_cat.svg';
import icon_cat_words from '@/public/icon_cat_words.svg';

const LoginForm = () => {
	const loadingControl = useAsyncLoading();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>();

	// 로그인 버튼 클릭 시
	const onSubmit: SubmitHandler<IFormInput> = async ({ id, password }) => {
		loadingControl(true);
		const { accessToken, refreshToken } = await fetchLogin(id, password);
		// 현재 시간
		const time = new Date();
		// 1일 뒤
		time.setMinutes(time.getMinutes() + 60 * 24);

		if (accessToken && refreshToken) {
			setCookie('accessToken', accessToken, { path: '/', expires: time });
			setCookie('refreshToken', refreshToken, { path: '/' });
			setCookie('userId', id, { path: '/', expires: time });
			router.replace('/users');
		} else {
			Swal.fire({
				text: '로그인 정보를 확인해주세요 ‼',
				showCancelButton: false,
				confirmButtonText: '확인',
				confirmButtonColor: '#3085d6',
			});
		}
		loadingControl(false);
	};

	return (
		<div className="flex flex-col h-full relative items-center justify-center">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col items-center justify-center w-2/3"
			>
				<Image
					src={icon_cat}
					alt="Picture of me"
					width={100}
					height={100}
					className="w-48 mb-12"
				/>
				{/* 영어와 숫자만 */}
				<Input
					placeholder="id"
					className="!border !border-gray-300 bg-white text-gray-900 shadow-lg ring-4 ring-transparent placeholder:text-gray-500"
					labelProps={{
						className: 'hidden',
					}}
					{...register('id', {
						required: true,
					})}
					crossOrigin={'anonymous'}
				/>
				{errors?.id ? <p className="error">{errors.id?.message}</p> : null}

				{/* 5자 이상 */}
				<Input
					placeholder="password"
					type="password"
					className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500"
					labelProps={{
						className: 'hidden',
					}}
					containerProps={{ className: 'min-w-[100px]' }}
					{...register('password')}
					crossOrigin={'anonymous'}
				/>
				<Button type="submit" className="bg-text w-full mt-10">
					로그인
				</Button>
				<Link href="/join" passHref>
					<div className="text-md text-black mt-3 transition-colors duration-300 ease-linear hover:text-white">
						새로운 집사 되기!
					</div>
				</Link>
			</form>

			<Image
				src={icon_cat_words}
				alt="logo"
				width={50}
				height={50}
				className="absolute bottom-3 w-24"
			/>
		</div>
	);
};

export default LoginForm;

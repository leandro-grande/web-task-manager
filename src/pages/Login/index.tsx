import { ArrowRight } from '@phosphor-icons/react';
import { InputContent, InputControl } from '../../components/Input';
import { useLogin } from './useLogin';

import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

export function Login() {
	const { register, errors, handleLogin } = useLogin();

	return (
		<div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-tr from-black to-bg-dark">
			<div className='w-[406px] flex flex-col items-center justify-center'>
				<img
					src={logo}
					className='w-[406px]'
					alt="Logo do task manager"
				/>

				<div className='mt-16 flex items-center gap-3'>
					<h1 className='text-2xl text-white'>Login</h1>
					<div className='h-6 w-6 rounded-full border border-dashed border-t-cyan-400 border-l-cyan-400 border-b-teal-400 border-r-teal-400 flex items-center justify-center'>
						<ArrowRight className='w-3.5 h-3.5 text-white' />
					</div>
				</div>

				<form
					className='flex flex-col gap-3 w-full mt-6'
					onSubmit={handleLogin}
				>
					<InputContent error={errors.email?.message}>
						<InputControl
							type='text'
							autoComplete='email'
							placeholder='digite seu e-mail'
							{...register('email')}
						/>
					</InputContent>

					<InputContent error={errors.password?.message}>
						<InputControl
							type='password'
							autoComplete='current-password'
							placeholder='digite sua senha'
							{...register('password')}
						/>
					</InputContent>

					<button
						type='submit'
						className='h-14 mt-2 rounded bg-gradient-to-r from-cyan-500 to-cyan-700 text-lg font-bold text-bg-dark hover:brightness-90 cursor-pointer'
					>
						Entrar
					</button>
				</form>

				<span
					className='mt-5 text-zinc-300'
				>
					Não possui login, <Link className='underline hover:text-white' to='/register'>faça seu cadastro</Link>
				</span>
			</div>
		</div>
	);
}

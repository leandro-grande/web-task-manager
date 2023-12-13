import { motion } from 'framer-motion';
import { SignOut, Plus } from '@phosphor-icons/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ErrorMessage } from "@hookform/error-message";
import { useAuth } from '../../hooks/useAuth';

import { InputControl } from '../../components/Input';
import { TaskItem } from '../../components/TaskItem';

import logo from '../../assets/logo.svg';

import { useHome } from './useHome';


export function Home() {

	const { listTask,
					isAsideRetrailed,
					isFetching,
					errors,
					register,
					handleSubmit,
					handleAddTask,
					handleCompleteTask,
					handleDeleteTask,
				} = useHome();

	const { signout, user } = useAuth();

	const [animationParent] = useAutoAnimate();

	return (
		<div
			data-mobile={isAsideRetrailed}
			className="h-screen w-screen bg-gradient-to-tr from-black to-bg-dark grid grid-cols-task data-[mobile=true]:grid-cols-[100px_1fr]"
		>
			<motion.aside
				layout data-mobile={isAsideRetrailed}
				className="flex flex-col items-center justify-between bg-black px-4 py-14"
			>
				<img
					src={logo}
					className='w-32'
					alt="Logo task manager!"
				/>
				<button
					onClick={signout}
					className='w-full flex items-center justify-center gap-2 py-2 px-4 rounded bg-gradient-to-r from-teal-400 to-cyan-400 hover:brightness-90'
				>
					<SignOut className='h-6 w-6 text-bg-dark' />
					<span data-mobile={isAsideRetrailed}  className='text-sm data-[mobile=true]:hidden'>Sair</span>
				</button>
			</motion.aside>

			<motion.main layout>
				<div className='max-w-[588px] mt-16 ml-24 text-white'>
					<div className='flex items-center justify-between'>
						<h1 className='text-3xl'>Minhas Tarefas</h1>
						<span className='text-zinc-300'>Olá, {user?.name} 😀</span>
					</div>

					<span className='block mt-12 text-lg'>Adicionar Tarefa</span>

					<form
						className='relative w-full flex justify-between gap-5 mt-4'
						onSubmit={handleSubmit(handleAddTask)}
					>
						<InputControl
							className='w-full bg-transparent border-b border-b-cyan-400 outline-none'
							type='text'
							{...register('task')}
						/>
						<ErrorMessage
							errors={errors}
							name='task'
							render={({ message }) => (
								<p className='absolute bottom-12 right-12 p-1.5 rounded bg-red-700 select-none'>
									{message}
								</p>
								)}
							/>
						<button
							type='submit'
							className='p-2 bg-cyan-400 text-cyan-950 rounded shadow-md shadow-cyan-400/20 hover:brightness-90'
						>
							<Plus weight='bold' />
						</button>
					</form>

					<div
						className='flex flex-col gap-2 mt-6 max-w-[418px]'
						ref={animationParent}
					>
						{ listTask.length == 0 && <p className='text-gray-400'>Não há tarefas cadastradas</p> }

						{ isFetching && listTask.length > 0 ? (
							<p className='text-gray-200 animate-pulse'>Carregando...</p>
						) : (
							listTask.map(task => (
								<TaskItem
									key={task.id}
									task={task}
									onComplete={handleCompleteTask}
									onDelete={handleDeleteTask}
									completed={task.isCompleted}
								/>
							))
						) }

					</div>
				</div>
			</motion.main>
		</div>
	);
}

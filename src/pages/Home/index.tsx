import {  useState } from 'react';
import { motion } from 'framer-motion';
import { SignOut, Plus } from '@phosphor-icons/react';
import { toast } from 'react-hot-toast';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { api } from '../../lib/axios';
import { useAuth } from '../../hooks/useAuth';

import { InputControl } from '../../components/Input';
import { Task, TaskItem } from '../../components/TaskItem';

import logo from '../../assets/logo.svg';
import { useQuery } from '@tanstack/react-query';


export function Home() {
	const [isAsideRetrailed] = useState(false);
	const [task, setTask] = useState('');
	const [listTask, setListTask] = useState<Task[]>([]);

	const { signout, user } = useAuth();

	const [animationParent] = useAutoAnimate()


	async function handleAddTask() {
		if (!task) {
			return toast.error('Preencha o campo Adicionar Tarefa');
		}

		try {
			const { data } = await api.post('/tasks', {
				title: task
			});

			setListTask(prevState => [...prevState, {
				id: data.id,
				title: data.title,
				isCompleted: data.isCompleted
			}])

			setTask('');
		} catch (error) {
			toast.error('Ocorreu um erro, tente novamente')
		}

	}

	async function handleCompleteTask(taskId: string) {
		const task = [...listTask];

		const taskIndex = task.findIndex(item => item.id === taskId);

		task[taskIndex].isCompleted = !task[taskIndex].isCompleted;

		const taskCompleted = task[taskIndex].isCompleted;


		try {
			await api.patch(`/tasks/${taskId}/completed`, {
				completed: taskCompleted,
			})

			setListTask(task);
		} catch (error) {
			toast.error('Ocorreu um erro, tente novamente.')
		}


	}

	async function handleDeleteTask(taskId: string) {

		try {
			await api.delete(`/tasks/${taskId}`)

			setListTask(prevState => [...prevState.filter(task => task.id !== taskId)]);
		} catch (error) {
			return toast.error('Ocorreu um erro, tente novamente')
		}
	}


	const { isFetching } = useQuery({
		queryKey: ['userTasks'],
		queryFn: async () => {
			const { data } = await api.get('/tasks');

			setListTask(data);

			return data;
		},
	})


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
					alt="Logo do task manager"
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

					<div className='w-full flex justify-between gap-5 mt-4'>
						<InputControl
							className='w-full bg-transparent border-b border-b-cyan-400 outline-none'
							type='text'
							onChange={(event) => setTask(event.target.value)}
							value={task}
						/>
						<button
							type='button'
							className='p-2 bg-cyan-400 text-cyan-950 rounded shadow-md shadow-cyan-400/20 hover:brightness-90'
							onClick={handleAddTask}
						>
							<Plus weight='bold' />
						</button>
					</div>


					<div
						className='flex flex-col gap-2 mt-6 max-w-[418px]'
						ref={animationParent}
					>
						{ isFetching ? (
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

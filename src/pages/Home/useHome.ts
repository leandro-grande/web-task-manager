import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { api } from "../../lib/axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task } from "../../components/TaskItem";

const formData = z.object({
	task: z.string().nonempty('O campo adicionar tarefa é obrigatório')
})

type FormData = z.infer<typeof formData>;

export function useHome() {
	const [isAsideRetrailed] = useState(false);
	const [listTask, setListTask] = useState<Task[]>([]);

	const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
		resolver: zodResolver(formData)
	});

	async function handleAddTask({ task }: FormData) {
		try {
			const { data } = await api.post('/tasks', {
				title: task
			});

			setListTask(prevState => [...prevState, {
				id: data.id,
				title: data.title,
				isCompleted: data.isCompleted
			}])

			reset();
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

	return {
		isAsideRetrailed,
		listTask,
		isFetching,
		errors,
		register,
		handleSubmit,
		handleAddTask,
		handleCompleteTask,
		handleDeleteTask,
	}
}

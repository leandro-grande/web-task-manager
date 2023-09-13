import { VariantProps, tv } from 'tailwind-variants'
import { Trash, Check } from '@phosphor-icons/react';


export interface Task {
	id: string;
	title: string;
	isCompleted: boolean
}

interface TaskItemProps extends VariantProps<typeof taskItem> {
	task: Task;
	onComplete: (taskId: string) => void;
	onDelete: (taskId: string) => void;
}

const taskItem = tv({
	slots: {
		taskTitle: ''
	},

	variants: {
		completed: {
			true: {
				taskTitle: 'text-zinc-500'
			},
			false: {
				taskTitle: 'text-zinc-300'
			}
		}
	},

	defaultVariants: {
		completed: false
	}
})

export function TaskItem({ task, completed, onComplete, onDelete }: TaskItemProps) {
	const { taskTitle } = taskItem({ completed })

	return (
		<div className="flex items-center gap-3">
			<button
				type="button"
				className="h-6 w-6 flex items-center justify-center p-1 rounded border border-zinc-300"
				onClick={() => onComplete(task.id)}
			>
				{task.isCompleted && (
					<Check className='text-green-500' weight='bold' />
				)}
			</button>

			<span className={taskTitle()}>{ task.title }</span>

			<button
				className="p-1 flex items-center justify-center hover:brightness-50 ml-auto"
				onClick={() => onDelete(task.id)}
			>
				<Trash className='h-6 w-6 text-red-600' />
			</button>
		</div>
	)
}

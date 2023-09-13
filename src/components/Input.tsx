import { ComponentProps, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputContentProps extends ComponentProps<'div'> {
	error?: string;
}

export function InputContent({ error, className, ...props }: InputContentProps) {
	return (
		<>
			<div
				className={twMerge([
					'w-full flex items-center gap-2 py-3 px-6 bg-bg-dark border border-input-stroke rounded focus-within:border-cyan-400',
					error && '!border-red-600',
					className
				])}
				{...props}
			/>

			{ error && <span className='text-red-400'>{error}</span> }
		</>
	);
}

interface InputProps extends ComponentProps<'input'> {}

export const InputControl = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
	return (
		<input
			ref={ref}
			className='w-full  bg-bg-dark text-white outline-none'
			{...props}
		/>
	);
});

InputControl.displayName = 'Input';

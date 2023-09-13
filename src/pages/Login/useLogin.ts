import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { useAuth } from '../../hooks/useAuth';
import { api } from '../../lib/axios';
import { AxiosError } from 'axios';

const formData = z.object({
	email: z.string().email('O e-mail é obrigatório'),
	password: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres')
});

type FormData = z.infer<typeof formData>;

export function useLogin() {
	const { register, formState: {errors}, handleSubmit } = useForm<FormData>({
		resolver: zodResolver(formData)
	});

	const { signin } = useAuth();

	const { mutateAsync } = useMutation({
		mutationFn: async (data: FormData) => {
			const response =  await api.post('/session', data);

			return {
				token: response.data.token
			};
		}
	});

	const handleLogin = handleSubmit(async (data: FormData) => {

		try {
			const { token } = await mutateAsync(data);

			signin(token);
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error.response?.data)
				return toast.error('Credenciais inválidas');
			}
			toast.error('Erro ao realizar o login');
		}
	});


	return { register, handleLogin, errors };
}




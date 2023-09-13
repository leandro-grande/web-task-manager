import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { api } from '../../lib/axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';

const formData = z.object({
	name: z.string().nonempty('O nome é obrigatório'),
	email: z.string().email('O e-mail é obrigatório'),
	password: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres')
});

type FormData = z.infer<typeof formData>;


export function useRegister() {
	const { register, formState: {errors}, handleSubmit } = useForm<FormData>({
		resolver: zodResolver(formData)
	});

	const { mutateAsync } = useMutation({
		mutationFn: async (data: FormData) => {
			const response = await api.post('/users', data);

			return {
				token: response.data.token
			};
		}
	});

	const { signin } = useAuth();

	const handleRegister = handleSubmit(async (data: FormData) => {

		try {
			const { token } = await mutateAsync(data);

			signin(token);
		} catch (error) {
			toast.error('Erro ao realizar o cadastro');
		}
	});



	return { register, handleRegister, errors };
}

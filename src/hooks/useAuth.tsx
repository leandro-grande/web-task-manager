import { useQuery } from '@tanstack/react-query';
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../lib/axios';
import { toast } from 'react-hot-toast';

interface User {
	id: string;
	name: string;
	email: string;
}

interface AuthContextProviderProps {
	children: ReactNode;
}

interface AuthContextData {
	signedIn: boolean;
	signin: (token: string) => void;
	signout: () => void;
	user: User | undefined;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthContextProvider = ({children}: AuthContextProviderProps) => {
	const [signedIn, setSignedIn] = useState<boolean>(() => {
		const storageToken = localStorage.getItem('@task-manager:token');

		return !!storageToken;
	});


	useEffect(() => {
		const storageToken = localStorage.getItem('@task-manager:token');

		if (storageToken) {
			api.defaults.headers.authorization = `Bearer ${storageToken}`;
		}
	}, []);


	const { isError, remove, data: user } = useQuery({
		queryKey: ['users', 'me'],
		queryFn: async () => {
			const { data } = await api.get<User>('users/me');

			return data;
		},
		enabled: signedIn
	});

		const signin = useCallback((token: string) => {
		localStorage.setItem('@task-manager:token', token)

		api.defaults.headers.authorization = `Bearer ${token}`;

		setSignedIn(true);
	}, []);


	const signout = useCallback(() => {
		localStorage.removeItem('@task-manager:token');
		remove();
		setSignedIn(false);
	}, [remove]);



	useEffect(() => {
		if (isError) {
			toast.error('Sua sessão expirou!')
			signout();
		}

	}, [isError, signout]);


	return (
		<AuthContext.Provider value={{
			signedIn,
			signin,
			signout,
			user
		}}>
			{children}
		</AuthContext.Provider>
	);
};


export function useAuth() {
	return useContext(AuthContext);
}

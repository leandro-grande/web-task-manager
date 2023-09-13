import { Toaster } from 'react-hot-toast';
import { AppRoutes } from './routes';
import { AuthContextProvider } from './hooks/useAuth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false
		}
	}
})

function App() {
	return (
			<QueryClientProvider client={queryClient}>
				<AuthContextProvider>
					<AppRoutes />
					<Toaster position='bottom-center' />
				</AuthContextProvider>

				<ReactQueryDevtools />
			</QueryClientProvider>
	);
}

export default App;

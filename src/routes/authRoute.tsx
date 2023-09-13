import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface AuthRouteProps {
	isPrivate: boolean;
}

export function AuthRoute({ isPrivate }: AuthRouteProps) {
	const { signedIn } = useAuth();

	if (!signedIn && isPrivate ) {
		return <Navigate to='/login' replace />;
	}

	if (signedIn && !isPrivate) {
		return <Navigate to='/' replace />;
	}

	return <Outlet />
}

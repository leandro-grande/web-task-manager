import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { AuthRoute } from './authRoute';
import { Home } from '../pages/Home';


export function AppRoutes() {
	return (
		<BrowserRouter >
			<Routes>
				<Route element={<AuthRoute isPrivate={false} /> }>
					<Route path='/login' element={<Login />}  />
					<Route path='/register' element={<Register />}  />
				</Route>

				<Route element={<AuthRoute isPrivate /> }>
					<Route path='/' element={<Home />}  />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

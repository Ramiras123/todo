import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MenuLayout from './layout/MenuLayout/MenuLayout.tsx';
import Menu from './pages/Menu/Menu.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MenuLayout />,
		children: [
			{
				path: '/',
				element: <Menu />
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router}></RouterProvider>
	</React.StrictMode>
);

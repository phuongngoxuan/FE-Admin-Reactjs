import React, { lazy } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './styles/global.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { userInputs } from './data';

const Home = lazy(() => import('./pages/home/Home'));
const Users = lazy(() => import('./pages/users/Users'));
const Products = lazy(() => import('./pages/products/Products'));
const Orders = lazy(() => import('./pages/orders/Orders'));
const Warehouse = lazy(() => import('./pages/warehouse/Warehouse'));
const Navbar = lazy(() => import('./components/navbar/Navbar'));
const Footer = lazy(() => import('./components/footer/Footer'));
const Product = lazy(() => import('./pages/product/Product'));
const User = lazy(() => import('./pages/user/User'));
const New = lazy(() => import('./pages/new/New'));
const Menu = lazy(() => import('./components/menu/Menu'));

const queryClient = new QueryClient();

const Layout = () => {
    return (
        <div className="layout">
            <Navbar />
            <div className="container">
                <div className="menuContainer">
                    <Menu />
                </div>
                <div className="contentContainer">
                    <QueryClientProvider client={queryClient}>
                        <Outlet />
                    </QueryClientProvider>
                </div>
            </div>
            <Footer />
        </div>
    );
};

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '',
                    element: <Home />,
                },
                {
                    path: 'home',
                    element: <Home />,
                },
                {
                    path: 'profile',
                    element: <Home />,
                },
                {
                    path: 'users',
                    element: <Users />,
                },
                {
                    path: 'users/:id',
                    element: <User />,
                },
                {
                    path: 'products/:id',
                    element: <Product />,
                },
                {
                    path: 'orders',
                    element: <Orders />,
                },
                {
                    path: 'products',
                    element: <Products />,
                },
                {
                    path: 'posts',
                    element: <Products />,
                },
                {
                    path: 'warehouse',
                    element: <Warehouse />,
                },
                {
                    path: `users/new`,
                    element: <New inputs={userInputs} title="user" />,
                },
            ],
        },
        {
            path: 'login',
            element: <div> Login</div>,
        },
    ]);

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
        </React.Suspense>
    );
}

export default App;

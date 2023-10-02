import React, { lazy } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './styles/global.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { userInputs } from './data';
import NotFound from './pages/notFound/NotFound';
import { Provider } from 'react-redux';
import store from './redux/store';
import AuthChecker from './components/auth/AuthChecker';
import Loading from './components/loadding/Loading';

const Home = lazy(() => import('./pages/home/Home'));
const Users = lazy(() => import('./pages/users/Users'));
const Products = lazy(() => import('./pages/products/Products'));
const Orders = lazy(() => import('./pages/orders/Orders'));
const Warehouse = lazy(() => import('./pages/warehouse/Warehouse'));
const Navbar = lazy(() => import('./components/navbar/Navbar'));
const Footer = lazy(() => import('./components/footer/Footer'));
const Product = lazy(() => import('./pages/product/Product'));
const User = lazy(() => import('./pages/user/User'));
const NewUser = lazy(() => import('./pages/newUser/NewUser'));
const Menu = lazy(() => import('./components/menu/Menu'));
const Login = lazy(() => import('./pages/login/Login'));

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

const App = () => {
    const user = JSON.parse(localStorage.getItem('user') as any);

    const auth = createBrowserRouter([
        {
            path: '*',
            element: <AuthChecker />,
        },
        {
            path: 'login',
            element: <Login />,
        },
    ]);

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
                    element: <NewUser inputs={userInputs} title="user" />,
                },
            ],
        },
        {
            path: 'login',
            element: user?.accessToken ? <AuthChecker /> : <Login />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]);

    return (
        <>
            <React.Suspense fallback={<Loading />}>
                <Provider store={store}>
                    <RouterProvider router={user?.accessToken ? router : auth} />
                </Provider>
            </React.Suspense>
        </>
    );
};

export default App;

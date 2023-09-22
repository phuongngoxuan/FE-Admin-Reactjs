import Home from './pages/home/Home';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Users from './pages/users/Users';
import Products from './pages/products/Products';
import Orders from './pages/orders/Orders';
import Warehouse from './pages/warehouse/Warehouse';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';
import './styles/global.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Product from './pages/product/Product';
import User from './pages/user/User';

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
                    path: '/users/:id',
                    element: <User />,
                },
                {
                    path: '/products/:id',
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
            ],
        },
        {
            path: 'login',
            element: <div> Login</div>,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;

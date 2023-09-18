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

const Layout = () => {
    return (
        <div className="layout">
            <Navbar />
            <div className="container">
                <div className="menuContainer">
                    <Menu />
                </div>
                <div className="contentContainer">
                    <Outlet />
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

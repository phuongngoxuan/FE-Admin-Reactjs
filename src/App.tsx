import Home from './pages/home/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Users from './pages/users/Users';
import Products from './pages/products/Products';
import Orders from './pages/orders/Orders';
import Warehouse from './pages/warehouse/Warehouse';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';

const Layout = () => {
    return (
        <div className="layout">
            <Navbar />
            <div className="container">
                <div className="menuContainer">
                    <Menu />
                </div>
                <div className="contentContainer">{/* <Outlet/> */}</div>
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
                    path: '/',
                    element: <Home />,
                },
                {
                    path: 'users',
                    element: <Users />,
                },
                {
                    path: 'products',
                    element: <Products />,
                },
                {
                    path: 'orders',
                    element: <Orders />,
                },
                {
                    path: 'warehouse',
                    element: <Warehouse />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;

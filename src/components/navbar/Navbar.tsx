import { Link } from 'react-router-dom';
import './navbar.scss';
import Setting from '../setting/Setting';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logo">
                <Link to="/">
                    <img src="../logo.svg" alt="" />
                    <span>Admin Demo App</span>
                </Link>
            </div>
            <div className="icon">
                <img src="/search.svg" alt="icon" />
                <img src="/app.svg" alt="icon" />
                <img src="/expand.svg" alt="icon" />
                <div className="notifications">
                    <img src="/notifications.svg" alt="" />
                    <span>1</span>
                </div>
                <div className="user">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz0UUafJaZ1XJ3qb75UBiDewMhkv2tvuVYlICl_dBdlFHVXMK0afYkwDV4syh99Fmc06M&usqp=CAU"
                        alt=""
                    />
                    <span>Nate</span>
                </div>
                <Setting />
            </div>
        </div>
    );
};

Navbar.propTypes = {};

export default Navbar;

import './navbar.scss';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logo">
                <img src="logo.svg" alt="" />
                <span>Admin Demo App</span>
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
                <img src="/setting.svg" alt="icon" />
            </div>
        </div>
    );
};

Navbar.propTypes = {};

export default Navbar;

import './login.scss';

const login = () => {
    return (
        <div className="login">
            <h1>Login</h1>
            <form method="post">
                <input type="text" name="u" placeholder="Username" required={true} />
                <input type="password" name="p" placeholder="Password" required={true} />
                <button type="submit" className="btn btn-primary btn-block btn-large">
                    Let me in.
                </button>
            </form>
        </div>
    );
};

login.propTypes = {};

export default login;

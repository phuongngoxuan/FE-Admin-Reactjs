import { useState } from 'react';
import './login.scss';
import { getDataForm } from '../../utils/form';
import { axiosLogin } from '../../shares/api/base.api';
import { useDispatch, useSelector } from 'react-redux';
const Login = () => {
    const slug = 'auth/login';
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);

    const [dataForm, setDataForm] = useState({
        email: '',
        password: '',
    });

    const handlerChange = async (e: any) => {
        getDataForm(e, dataForm, setDataForm);
    };

    const handlerSubmit = (e: any) => {
        e.preventDefault();

        axiosLogin({ slug, body: dataForm, dispatch });
    };
    console.log(user.error);

    return (
        <div className="login">
            <h1>Please Login</h1>
            <form method="post" onSubmit={handlerSubmit}>
                <input type="text" name="email" placeholder="Email" required={true} onChange={handlerChange} />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required={true}
                    onChange={handlerChange}
                />

                <button type="submit" disabled={user?.pending} className="btn btn-primary btn-block btn-large">
                    Login
                </button>
                {user?.error && <span className="error"> Some thing went wrong</span>}
            </form>
        </div>
    );
};

Login.propTypes = {};

export default Login;

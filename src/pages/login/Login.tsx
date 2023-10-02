import { useState } from 'react';
import './login.scss';
import { getDataForm } from '../../utils/form';
import { axiosLogin } from '../../shares/api/base.api';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { update } from '../../redux/userSlice';

const Login = () => {
    const slug = 'auth/login';
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);

    const [isFetching, setIsFetching] = useState(false);

    const [dataForm, setDataForm] = useState({
        email: '',
        password: '',
    });

    const handlerChange = async (e: any) => {
        getDataForm(e, dataForm, setDataForm);
    };

    const handlerSubmit = (e: any) => {
        e.preventDefault();

        axiosLogin({ slug, body: dataForm, setIsFetching }).then((e) => {
            const { accessToken, refreshToken, iat, exp } = e;
            dispatch(
                update({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    iat,
                    exp,
                }),
            );
            localStorage.setItem('user', JSON.stringify({ accessToken, refreshToken }));
            window.location.reload();
        });
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <form method="post" onSubmit={handlerSubmit}>
                <input type="text" name="email" placeholder="Email" required={true} onChange={handlerChange} />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required={true}
                    onChange={handlerChange}
                />
                <button type="submit" disabled={isFetching} className="btn btn-primary btn-block btn-large">
                    Let me in.
                </button>
            </form>
        </div>
    );
};

Login.propTypes = {};

export default Login;

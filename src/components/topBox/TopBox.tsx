import './topBox.scss';
import { topDealUsers } from '../../data';

const TopBox = () => {
    return (
        <div className="topBox">
            <h1>Top Detail</h1>
            <div className="list">
                {topDealUsers.map((user) => (
                    <div className="listItem" key={user.id}>
                        <div className="user">
                            <img src={user.img} alt="" />
                            <div className="userText">
                                <div className="username">{user.username}</div>
                                <div className="email">{user.email}</div>
                            </div>
                        </div>
                        <span className="amount">${user.amount}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

TopBox.propTypes = {};

export default TopBox;

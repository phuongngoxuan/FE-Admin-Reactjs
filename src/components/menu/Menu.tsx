import './menu.scss';
import { Link } from 'react-router-dom';
import { menu } from '../../data';

const Menu = () => {
    return (
        <div className="menu">
            {menu.map((_) => (
                <div className="item" key={_.id}>
                    <span className="title">{_.title}</span>
                    {_.listItems.map((listItem) => (
                        <Link to={listItem.url} className="listItem" key={listItem.id}>
                            <img src={listItem.icon} alt="" />
                            <span className="listItemTitle">{listItem.title}</span>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    );
};

Menu.propTypes = {};

export default Menu;

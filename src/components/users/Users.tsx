import DataTable from '../dataTable/DataTable';
import './users.scss';
const User = () => {
    return (
        <div className="users">
            <div className="info">
                <h1>Users</h1>
                <button>Add New User</button>
            </div>
            <DataTable />
        </div>
    );
};

User.propTypes = {};

export default User;

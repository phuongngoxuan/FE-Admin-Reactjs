import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import DataTable from '../../components/dataTable/DataTable';
import { userRows } from '../../data';
import './users.scss';
import Add from '../../components/add/Add';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'img',
        headerName: 'Avatar',
        width: 100,
        renderCell: (params) => {
            return <img src={params.row.img || '/noavatar.png'} alt="" />;
        },
    },
    {
        field: 'firstName',
        type: 'string',
        headerName: 'First name',
        width: 150,
    },
    {
        field: 'lastName',
        type: 'string',
        headerName: 'Last name',
        width: 150,
    },
    {
        field: 'email',
        type: 'string',
        headerName: 'Email',
        width: 200,
    },
    {
        field: 'phone',
        type: 'string',
        headerName: 'Phone',
        width: 200,
    },
    {
        field: 'createdAt',
        type: 'string',
        headerName: 'Created At',
        width: 150,
    },
    {
        field: 'verified',
        headerName: 'Verified',
        width: 150,
        type: 'boolean',
    },
];

function Users() {
    const [open, setOpen] = useState(false);
    return (
        <div className="users">
            <div className="info">
                <h1>Users</h1>
                <button onClick={() => setOpen(true)}>Add New User</button>
            </div>
            <DataTable slug="users" columns={columns} rows={userRows} />

            <div>{open && <Add slug="user" columns={columns} setOpen={setOpen} />}</div>
        </div>
    );
}

Users.propTypes = {};

export default Users;

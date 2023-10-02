import { GridColDef } from '@mui/x-data-grid';
import { ReactElement, useState } from 'react';
import DataTable from '../../components/dataTable/DataTable';
import './users.scss';
import { Link } from 'react-router-dom';
import { convertRow } from '../../utils/convert';
import { mutationGets } from '../../shares/api/base.api';
import Loading from '../../components/loadding/Loading';

const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
        field: 'img',
        headerName: 'Avatar',
        width: 100,
        renderCell: (params) => {
            if (params.row.img.includes('http')) {
                return <img src={params.row.img || '/noavatar.png'} alt="" />;
            } else {
                return <img src={`${import.meta.env.VITE_BASE_URL}/` + params.row.img || '/noavatar.png'} alt="" />;
            }
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

function Users(): ReactElement<any, any> {
    const slug = 'users';
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);

    const { isLoading, data } = mutationGets({ slug, page, limit, setTotal });

    const rowData = convertRow(data);

    return (
        <div className="users">
            <div className="info">
                <h1>Users</h1>
                <Link to="new">
                    <button>Add New User</button>
                </Link>
            </div>

            {isLoading ? (
                <Loading />
            ) : (
                <DataTable
                    slug="users"
                    columns={columns}
                    rows={rowData}
                    page={page}
                    limit={limit}
                    setPage={setPage}
                    setLimit={setLimit}
                    total={total}
                />
            )}
        </div>
    );
}

Users.propTypes = {};

export default Users;

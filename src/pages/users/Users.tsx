import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import DataTable from '../../components/dataTable/DataTable';
import './users.scss';
import Add from '../../components/add/Add';
import { QueryClient, useQuery } from '@tanstack/react-query';

const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 90 },
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
    const queryClient = new QueryClient();

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        queryClient.invalidateQueries('allusers');
    }, [page, limit]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isLoading, isError, data, error } = useQuery(['allusers', page, limit], () =>
        fetch(`http://localhost:3343/api/v1/users?page=${page}&limit=${limit}`).then((res) => res.json()),
    );

    const rowData = data?.data?.result;

    return (
        <div className="users">
            <div className="info">
                <h1>Users</h1>
                <button onClick={() => setOpen(true)}>Add New User</button>
            </div>

            {isLoading ? (
                'Loading...'
            ) : (
                <DataTable
                    slug="users"
                    columns={columns}
                    rows={rowData?.map((item: any) => {
                        return { ...item, id: item?._id };
                    })}
                />
            )}

            <div>{open && <Add slug="users" columns={columns} setOpen={setOpen} />}</div>
        </div>
    );
}

Users.propTypes = {};

export default Users;

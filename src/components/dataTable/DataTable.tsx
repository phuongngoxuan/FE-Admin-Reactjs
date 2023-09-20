import './dataTable.scss';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface Props {
    columns: GridColDef[];
    rows: object[];
    slug: string;
}

const DataTable = (props: Props) => {
    const queryClient = useQueryClient();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    const mutation = useMutation({
        mutationFn: (id: string) => {
            return fetch(`http://localhost:3343/api/v1/${props.slug}/${id}`, { method: 'delete' });
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`all${props.slug}`]);
        },
    });
    // axios.delete('/api/${slug}/id')
    const handleDelete = (id: string) => {
        mutation.mutate(id);
    };

    const actionColumn: GridColDef = {
        field: 'action',
        headerName: 'Action',
        width: 150,
        sortable: false,
        hideSortIcons: true,
        disableColumnMenu: true,
        renderCell: (params) => {
            return (
                <div className="action">
                    <Link to={`/${props.slug}/${params.row?._id}`}>
                        <img src="/view.svg" alt="" />
                    </Link>
                    <Link className="delete" onClick={() => handleDelete(params.row?._id)} to={''}>
                        <img src="/delete.svg" alt="" />
                    </Link>
                </div>
            );
        },
    };

    return (
        <div className="dataTable">
            <Box sx={{ height: '100%', width: '100%' }}>
                <DataGrid
                    className="dataGrid"
                    rows={props.rows}
                    columns={[...props.columns, actionColumn]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                                page: 10,
                            },
                        },
                    }}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                        },
                    }}
                    pageSizeOptions={[20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    disableColumnFilter
                    disableDensitySelector
                    disableColumnSelector
                />
            </Box>
        </div>
    );
};

DataTable.propTypes = {};

export default DataTable;

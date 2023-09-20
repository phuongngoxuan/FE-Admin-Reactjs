import './dataTable.scss';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { userRows } from '../../data';
import { Link } from 'react-router-dom';

interface Props {
    columns: GridColDef[];
    rows: object[];
    slug: string;
}

const DataTable = (props: Props) => {
    // axios.delete('/api/${slug}/id')
    const handleDelete = (id: number) => {
        console.log(id);
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
                    <Link to={`/${props.slug}/${params.row.id}`}>
                        <img src="/view.svg" alt="" />
                    </Link>
                    <Link className="delete" to="/delete" onClick={() => handleDelete(params.row.id)}>
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
                                pageSize: 10,
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
                    pageSizeOptions={[5]}
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

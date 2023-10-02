import './dataTable.scss';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarQuickFilter,
} from '@mui/x-data-grid';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { PropsDataTable } from '../../shares/interface/dataTable.interface';
import { mutationDelete, mutationDeletes } from '../../shares/api/base.api';

const DataTable = (props: PropsDataTable) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const mutation = mutationDelete(props);

    const mutationDeleteSelected = mutationDeletes(props);

    const handleDelete = (id: string) => {
        mutation.mutate(id);
    };

    const handleDeleteSelected = () => {
        mutationDeleteSelected.mutate(selectedRows);
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
        <>
            <div className="dataTable">
                <Box sx={{ height: '100%', width: '100%' }}>
                    <DataGrid
                        className="dataGrid"
                        rows={props.rows}
                        columns={[...props.columns, actionColumn]}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 1,
                                },
                            },
                        }}
                        slots={{
                            toolbar: CustomToolbar,
                        }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                            },
                        }}
                        pageSizeOptions={[5, 10, 25, 50, 100]}
                        checkboxSelection
                        pagination
                        rowCount={props.total}
                        paginationMode="server"
                        paginationModel={{ pageSize: props.limit, page: props.page }}
                        onPaginationModelChange={(e) => {
                            props.setLimit(e.pageSize);
                            props.setPage(e.page);
                        }}
                        onRowSelectionModelChange={(rowSelect: any) => {
                            if (rowSelect.length > 1) {
                                setSelectedRows(rowSelect);
                            } else {
                                setSelectedRows([]);
                            }
                        }}
                    />
                </Box>
            </div>
        </>
    );

    function CustomToolbar() {
        return (
            <GridToolbarContainer className="gridToolbar">
                <div className="left">
                    {selectedRows.length > 0 ? (
                        <IconButton className="btnDeleteSelected" onClick={handleDeleteSelected} color="secondary">
                            <DeleteIcon />
                        </IconButton>
                    ) : null}
                </div>
                <div className="right">
                    <GridToolbarQuickFilter className="quickFilter" />
                    <GridToolbarExport />
                </div>
            </GridToolbarContainer>
        );
    }
};

DataTable.propTypes = {};

export default DataTable;

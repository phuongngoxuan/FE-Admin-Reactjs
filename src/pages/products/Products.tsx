import { useState } from 'react';
import Add from '../../components/add/Add';
import DataTable from '../../components/dataTable/DataTable';
import './products.scss';
import { GridColDef } from '@mui/x-data-grid';
import { convertRow } from '../../utils/convert';
import { mutationGets } from '../../shares/api/base.api';
import Loading from '../../components/loadding/Loading';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'img',
        headerName: 'Image',
        width: 100,
        renderCell: (params) => {
            return <img src={params.row.img || '/noavatar.png'} alt="" />;
        },
    },
    {
        field: 'title',
        type: 'string',
        headerName: 'Title',
        width: 250,
    },
    {
        field: 'color',
        type: 'string',
        headerName: 'Color',
        width: 150,
    },
    {
        field: 'price',
        type: 'string',
        headerName: 'Price',
        width: 200,
    },
    {
        field: 'producer',
        headerName: 'Producer',
        type: 'string',
        width: 200,
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        width: 200,
        type: 'string',
    },
    {
        field: 'inStock',
        headerName: 'In Stock',
        width: 150,
        type: 'boolean',
    },
];

const Products = () => {
    const slug = 'products';
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);

    const { isLoading, data } = mutationGets({ slug, page, limit, setTotal });

    const rowData = convertRow(data);

    return (
        <div className="products">
            <div className="info">
                <h1>Product</h1>
                <button onClick={() => setOpen(true)}>Add New Product</button>
            </div>
            {isLoading ? (
                <Loading />
            ) : (
                <DataTable
                    slug="products"
                    columns={columns}
                    rows={rowData}
                    page={page}
                    limit={limit}
                    setPage={setPage}
                    setLimit={setLimit}
                    total={total}
                />
            )}
            <div>{open && <Add slug="product" columns={columns} setOpen={setOpen} />}</div>
        </div>
    );
};

Products.propTypes = {};

export default Products;

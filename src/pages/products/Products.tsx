import { useState } from 'react';
import Add from '../../components/add/Add';
import DataTable from '../../components/dataTable/DataTable';
import './products.scss';
import { GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';

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

// interface Props {
//     columns: GridColDef[];
//     rows: object[];
//     slug: string;
//     page: number;
//     limit: number;
//     setPage: React.Dispatch<React.SetStateAction<number>>;
//     setLimit: React.Dispatch<React.SetStateAction<number>>;
//     total: number;
// }

const Products = () => {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isLoading, isError, data, error } = useQuery(['allproducts'], () =>
        fetch(`${import.meta.env.VITE_BASE_URL}/products?page=${page + 1}&limit=${limit}`)
            .then((res) => res.json())
            .then((data) => {
                setTotal(data?.data?.total);
                return data;
            }),
    );

    const rowData = data?.data?.result;

    return (
        <div className="products">
            <div className="info">
                <h1>Product</h1>
                <button onClick={() => setOpen(true)}>Add New Product</button>
            </div>
            <DataTable
                slug="products"
                columns={columns}
                rows={
                    rowData?.map((item: any) => {
                        return { ...item, id: item?._id };
                    }) || []
                }
                page={page}
                limit={limit}
                setPage={setPage}
                setLimit={setLimit}
                total={total}
            />
            <div>{open && <Add slug="product" columns={columns} setOpen={setOpen} />}</div>
        </div>
    );
};

Products.propTypes = {};

export default Products;

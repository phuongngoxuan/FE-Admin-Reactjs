import { GridColDef } from '@mui/x-data-grid';

export interface PropsDataTable {
    columns: GridColDef[];
    rows: object[];
    slug: string;
    page: number;
    limit: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
    total: number;
}

export interface PayloadDeletes {
    props: PropsDataTable;
}

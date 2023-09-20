import { GridColDef } from '@mui/x-data-grid';
import './add.scss';

interface Props {
    slug: string;
    columns: GridColDef[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Add = (props: Props) => {
    const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // add new item
        // axios.post('/api/${slug}s',{})
    };

    return (
        <div className="add">
            <div className="modal">
                <span className="close" onClick={() => props.setOpen(false)}>
                    X
                </span>
                <h1>Add new {props.slug}</h1>
                <form action="" onSubmit={handlerSubmit}>
                    {props.columns
                        .filter((item) => item.field !== 'id' && item.field != 'img')
                        .map((column) => {
                            return (
                                <div className="item" key={column.headerName}>
                                    <label> {column.headerName}</label>
                                    <input type={column.type} placeholder={column.field} />
                                </div>
                            );
                        })}

                    <button>Send</button>
                </form>
            </div>
        </div>
    );
};

Add.propTypes = {};

export default Add;

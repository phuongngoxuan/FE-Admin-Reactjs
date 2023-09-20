import { GridColDef } from '@mui/x-data-grid';
import './add.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
    slug: string;
    columns: GridColDef[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Add = (props: Props) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => {
            console.log('in');
            return fetch(`http://localhost:3343/api/v1/${props.slug}`, {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    img: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1600',
                    lastName: 'Parsons',
                    firstName: 'Leah',
                    email: 'uzozor@gmail.com',
                    phone: '123 456 789',
                    createdAt: '01.02.2023',
                    password: '123',
                }),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`all${props.slug}`]);
        },
    });

    const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutation.mutate();
        props.setOpen(false);
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

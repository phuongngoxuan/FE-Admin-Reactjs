import './new.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';

interface Props {
    title: string;
    inputs: object[];
}

const New = (props: Props) => {
    const queryClient = useQueryClient();
    const [file, setFile] = useState<Blob | null>(null);

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
            // queryClient.invalidateQueries([`all${props.slug}`]);
        },
    });

    const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // mutation.mutate();
    };

    return (
        <div className="new">
            <div className="top">
                <h1> Add New User</h1>
            </div>
            <div className="bottom">
                <div className="left">
                    <img
                        src={
                            file
                                ? URL.createObjectURL(file)
                                : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                        }
                    />
                </div>
                <div className="right">
                    <form onSubmit={handlerSubmit}>
                        <div className="item">
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e: any) => {
                                        setFile(e?.target?.files?.[0]);
                                    }}
                                    style={{ display: 'none' }}
                                />
                            </div>
                            {props?.inputs?.map((input: any) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input type={input.type} placeholder={input.placeholder} />
                                </div>
                            ))}
                        </div>

                        <button>Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export const getFormattedFormData = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
        data[key] = value.toString();
    });

    return data;
};

New.propTypes = {};

export default New;

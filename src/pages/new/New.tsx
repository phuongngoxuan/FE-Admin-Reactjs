import './new.scss';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';
import { handleFormInput } from '../../utils/form';
import { mutationCreate } from '../../shares/api/new.api';
import { uploadImage } from '../../shares/api/upload.api';

interface Props {
    title: string;
    inputs: object[];
}

const New = (props: Props) => {
    const [file, setFile] = useState<Blob | null>(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        img: '',
    });

    const handleInputChange = (e: any) => {
        handleFormInput(e, formData, setFormData);
    };

    const mutationCreateNewItem = mutationCreate({ slug: 'user', method: 'post' });

    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append('image', formData.img);

            uploadImage(data).then(async (e) => {
                const { url } = e;
                const { firstName, lastName, email, password, phone } = formData;

                const formDataToSend = {
                    firstName,
                    lastName,
                    email,
                    password,
                    phone,
                    img: url,
                };

                mutationCreateNewItem.mutate(formDataToSend);

                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    phone: '',
                    img: '',
                });
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handlerSubmit}>
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
                        <div className="item">
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    name="img"
                                    id="file"
                                    onChange={(e: any) => {
                                        setFile(e?.target?.files?.[0]);
                                        handleInputChange(e);
                                    }}
                                    style={{ display: 'none' }}
                                />
                            </div>
                            {props?.inputs?.map((input: any) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        type={input.type}
                                        name={input.name}
                                        placeholder={input.placeholder}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            ))}
                        </div>

                        <button>Send</button>
                    </div>
                </div>
            </div>
        </form>
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

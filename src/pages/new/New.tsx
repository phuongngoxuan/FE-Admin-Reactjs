import './new.scss';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';
import { handleFormInput } from '../../utils/form';
import { mutationCreate } from '../../shares/api/new.api';
import { mutationUploadImage } from '../../shares/api/upload.api';

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

    const mutationDeleteSelected = mutationCreate({ slug: 'user', method: 'delete' });
    const mutationUpload = mutationUploadImage();

    const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // step 1: Tải lên ảnh và nhận URL

            console.log(formData.img);
            const x = mutationUpload.mutate(formData.img);
            if (typeof formData.img === 'string' && !formData.img.startsWith('http')) {
                console.log(formData.img);
                const x = mutationUpload.mutate(formData.img);
                console.log('x_____');
                console.log(x);
            }
            // step 2: Gửi yêu cầu POST đến API sử dụng mutation
            // const formDataToSend = {
            //     firstName: formData.firstName,
            //     lastName: formData.lastName,
            //     email: formData.email,
            //     password: formData.password,
            //     phone: formData.phone,
            //     img: imageUrl,
            // };
            // const response = await axios.post('YOUR_API_URL', formDataToSend);
            // console.log(response.data);
            // setFormData({
            //     firstName: '',
            //     lastName: '',
            //     email: '',
            //     password: '',
            //     phone: '',
            //     img: '',
            // });
        } catch (error) {
            console.error(error);
        }
    };
    // const mutation = useMutation({
    //     mutationFn: () => {
    //         console.log('in');
    //         return fetch(`http://localhost:3343/api/v1/${props.slug}`, {
    //             method: 'post',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 img: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1600',
    //                 lastName: 'Parsons',
    //                 firstName: 'Leah',
    //                 email: 'uzozor@gmail.com',
    //                 phone: '123 456 789',
    //                 createdAt: '01.02.2023',
    //                 password: '123',
    //             }),
    //         });
    //     },
    //     onSuccess: () => {
    //         // queryClient.invalidateQueries([`all${props.slug}`]);
    //     },
    // });

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

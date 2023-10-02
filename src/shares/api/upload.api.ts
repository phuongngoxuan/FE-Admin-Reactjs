import axios from 'axios';

export const uploadImage = (formData: any) => {
    return axios({
        url: `${import.meta.env.VITE_BASE_URL}/upload/image`,
        data: formData,
        method: 'post',
    }).then((e) => {
        return e?.data?.data;
    });
};

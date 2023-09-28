import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from './base.api';

export const mutationUploadImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (image: any) => {
            return request({
                url: `${import.meta.env.VITE_BASE_URL}/upload/image`,
                method: 'post',
                body: {
                    ...image,
                },
                headers: {
                    'Content-Type': 'application/json, multipart/form-data',
                },
            });
        },
        onSuccess: (e) => {
            console.log(e);
        },
        onError: (e) => {
            console.log(e);
        },
    });
};

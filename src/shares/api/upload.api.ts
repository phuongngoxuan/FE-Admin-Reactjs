import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from './base.api';

export const mutationUploadImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (fileBase64: string) => {
            return request({
                url: `${import.meta.env.VITE_BASE_URL}/upload/image`,
                method: 'post',
                body: {
                    file: fileBase64,
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
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

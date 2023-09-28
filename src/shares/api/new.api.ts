import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from './base.api';

export interface PropsCreateNew {
    slug: string;
    method: string;
}

export const mutationCreate = (props: PropsCreateNew) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body: object) => {
            return request({
                url: `${import.meta.env.VITE_BASE_URL}/${props.slug}`,
                method: props.method,
                body: {
                    ...body,
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`all${props.slug}`]);
        },
    });
};

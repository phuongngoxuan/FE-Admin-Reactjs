import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PropsDataTable } from '../interface/dataTable.interface';
import { request } from './base.api';

export const mutationDelete = (props: PropsDataTable) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => {
            return request({ url: `${import.meta.env.VITE_BASE_URL}/${props.slug}/${id}`, method: 'delete' });
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`all${props.slug}`]);
        },
    });
};

export const mutationDeletes = (props: PropsDataTable) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (ids: string[]) => {
            return request({
                url: `${import.meta.env.VITE_BASE_URL}/${props.slug}`,
                method: 'delete',
                body: {
                    ids,
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`all${props.slug}`]);
        },
    });
};

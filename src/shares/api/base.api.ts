import { Payload } from '../interface/base.interface';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ERROR } from '../message/error';

export const request = (payload: Payload) => {
    const { url, body, method, headers } = payload;

    return fetch(url, {
        method: method,
        body: body ? JSON.stringify(body) : null,
        headers: headers
            ? headers
            : {
                  'Content-Type': 'application/json',
              },
    });
};

// [GET]
interface ParamGetColumData {
    slug: string;
    id: string;
}

export const mutationGet = ({ slug, id }: ParamGetColumData) => {
    return useQuery([`all${slug}`], () => fetch(`${import.meta.env.VITE_BASE_URL}/${slug}/${id}`));
};

// [GET] many
interface ParamGetData {
    slug: string;
    page: number;
    limit: number;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
}

export const mutationGets = ({ slug, page, limit, setTotal }: ParamGetData) => {
    return useQuery([`all${slug}`, page, limit], () =>
        fetch(`${import.meta.env.VITE_BASE_URL}/${slug}?page=${page + 1}&limit=${limit}`)
            .then((res) => res.json())
            .then((data) => {
                setTotal(data?.data?.total);
                return data;
            }),
    );
};

// [DELETE]
interface propsDelete {
    slug: string;
}

export const mutationDelete = (props: propsDelete) => {
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

// [DELETE] Many
interface PropsDelete {
    slug: string;
}

export const mutationDeletes = (props: PropsDelete) => {
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

// [POST]
interface propsPost {
    slug: string;
}

export const mutationPost = (props: propsPost) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body: any) => {
            return request({ url: `${import.meta.env.VITE_BASE_URL}/${props.slug}`, method: 'post', body });
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`all${props.slug}`]);
        },
    });
};

// [PATCH]
interface propsPatch {
    slug: string;
    id: string;
}

export const mutationPatch = (props: propsPatch) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body: any) => {
            return request({
                url: `${import.meta.env.VITE_BASE_URL}/${props.slug}/${props.id}`,
                method: 'patch',
                body,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`all${props.slug}`]);
        },
    });
};

// [LOGIN]

interface ParamLogin {
    slug: string;
    body: any;
    setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

export const axiosLogin = async ({ slug, body, setIsFetching }: ParamLogin) => {
    setIsFetching(true);
    return axios({
        url: `${import.meta.env.VITE_BASE_URL}/${slug}`,
        data: body,
        method: 'post',
    })
        .then((e) => {
            return e?.data?.data;
        })
        .catch(() => {
            alert(ERROR.AUTH_INVALID_PASS_OR_EMAIL);
        })
        .finally(() => setIsFetching(false));
};

// export const mutationLogin = (props: ParamLogin) => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: (body: any) => {
//             console.log(body);
//             return request({ url: `${import.meta.env.VITE_BASE_URL}/${props.slug}`, method: 'post', body });
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries([`all${props.slug}`]);
//         },
//     });
// };

export const convertRow = (data: any) => {
    return (
        data?.data?.result?.map((item: any) => {
            return { ...item, id: item?._id };
        }) || []
    );
};

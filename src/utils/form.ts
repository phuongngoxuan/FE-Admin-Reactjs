type FormEvent = React.ChangeEvent<HTMLInputElement>;

interface FormData {
    [key: string]: string;
}

export const getDataForm = (e: FormEvent, formData: FormData, setFormData: any) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
        const reader = new FileReader();
        reader.readAsDataURL(files?.[0] as any);

        setFormData({ ...formData, [name]: files?.[0] });
    } else {
        setFormData({ ...formData, [name]: value });
    }
};

export const getBase64 = (file: any): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

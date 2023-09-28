type FormEvent = React.ChangeEvent<HTMLInputElement>;

interface FormData {
    [key: string]: string;
}

export const handleFormInput = (e: FormEvent, formData: FormData, setFormData: any) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
        getBase64(files?.[0]).then((e) => {
            const base64Image = e.split(',')[1];
            setFormData({ ...formData, [name]: base64Image });
        });
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

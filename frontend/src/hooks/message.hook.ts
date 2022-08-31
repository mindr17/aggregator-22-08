import { useCallback } from 'react';
import { toast } from 'react-toastify';

const useMessage = () => {
    return useCallback((text: string) => {
        toast.error(text, {
            position: 'top-center',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    }, []);
};

export default useMessage;

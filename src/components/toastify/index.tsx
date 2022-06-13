import { toast, ToastPromiseParams } from 'react-toastify';

const position = toast.POSITION.TOP_CENTER;

const toastError = (error: any) =>
    toast.error(error, {
        autoClose: false,
        closeButton: true,
        position,
    });

const ToastError = (error: any, stringCallBack?: (s: string) => string) => {
    if (error instanceof Error) {
        const { message } = error;
        return !stringCallBack
            ? toastError(message)
            : toastError(stringCallBack(message));
    }
    if (typeof error === 'string') {
        return toastError(error);
    }
    return toastError(JSON.stringify(error));
};

const ToastInfo = (info: any) =>
    toast.info(info, {
        closeButton: true,
        position,
    });

const ToastPromise = <T extends Object>({
    promise,
    pending,
    success,
    error,
}: Readonly<{
    pending: ToastPromiseParams['pending'];
    success: ToastPromiseParams['success'];
    error: ToastPromiseParams['error'];
    promise: Promise<T>;
}>) =>
    toast.promise(
        promise,
        {
            pending,
            success,
            error,
        },
        {
            autoClose: 250,
        }
    );

export { ToastError, ToastInfo, ToastPromise };

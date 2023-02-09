import { toast, ToastPromiseParams } from 'react-toastify';
import { processErrorMessage } from '../../util/error';

const position = toast.POSITION.TOP_CENTER;

const ToastError = (
    error: any,
    option?: Readonly<{
        autoClose?: number;
    }>
) =>
    toast.error(processErrorMessage(error), {
        autoClose: option?.autoClose ?? false,
        closeButton: true,
        position,
    });

const ToastInfo = (info: any) =>
    toast.info(info, {
        closeButton: true,
        position,
    });

const ToastPromise = <T extends Object>({
    promise,
    pending,
}: Readonly<{
    pending: ToastPromiseParams['pending'];
    promise: Promise<T>;
}>) =>
    toast.promise(
        promise,
        {
            pending,
            success: {
                render: ({ data }) => data as any,
            },
            error: {
                render: ({ data }) => data as any,
            },
        },
        {
            autoClose: 1000,
        }
    );

export { ToastError, ToastInfo, ToastPromise };

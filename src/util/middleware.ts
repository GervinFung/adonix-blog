import type { NextApiRequest, NextApiResponse } from 'next';

const initMiddleware =
    <T>(
        middleware: (
            req: NextApiRequest,
            res: NextApiResponse<T>,
            callback: (result: unknown) => void
        ) => void
    ) =>
    (req: NextApiRequest, res: NextApiResponse<T>) =>
        new Promise((resolve, reject) => {
            middleware(req, res, (result: unknown) =>
                result instanceof Error ? reject(result) : resolve(result)
            );
        });

export default initMiddleware;

import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import { DeepReadonly } from '../../type';
import { parseAsStringEnv } from '../../env';

type Response<T> = string | DeepReadonly<T>;

type EndPointFunc<T> = (
    req: NextApiRequest,
    res: NextApiResponse<Response<T>>
) => Promise<void>;

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
// ref: https://github.com/vercel/next.js/blob/canary/examples/api-routes-cors/lib/init-middleware.js
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

const cors = <T>() =>
    initMiddleware<Response<T>>(
        Cors({
            credentials: true,
            origin: parseAsStringEnv({
                env: process.env.ORIGIN,
                name: 'ORIGIN',
            }),
        })
    );

export type { EndPointFunc };

export default cors;

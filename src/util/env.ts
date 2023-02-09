const parseAsStringEnv = ({
    env,
    name,
}: Readonly<{
    env: unknown;
    name: string;
}>) => {
    if (typeof env === 'string') {
        return env;
    }
    throw new TypeError(
        `Expect process.env.${name} to be string, got typeof "${typeof env}" with value of "${env}" instead`
    );
};

export { parseAsStringEnv };

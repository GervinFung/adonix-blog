import ci from 'ci-info';
import childProcess from 'child_process';
import { parseAsString } from 'parse-dont-validate';

const main = () => {
    const environment = parseAsString(process.argv.at(2))
        .orElseThrowCustom('Must have environment')
        .replace(/-/g, '');
    console.log({ environment });
    if (!ci.isCI) {
        childProcess.execSync(`cp .env.${environment} .env`, {
            stdio: 'inherit',
        });
    }
};

main();

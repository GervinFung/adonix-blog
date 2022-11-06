import promiseifyMongoDb from '../../../src/database/mongo';
import testPost from './post';
import testAuthRecord from './auth-record';
import testCases from 'cases-of-test';
import { afterAll, describe } from 'vitest';

const testMongo = () =>
    describe('MongoDB', () => {
        testCases({
            tests: [[testAuthRecord], [testPost]],
        });
        afterAll(async () => {
            (await promiseifyMongoDb).close();
        });
    });

export default testMongo;

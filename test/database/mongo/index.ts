import Database from '../../../src/database/mongo';
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
            (await Database.instance()).close();
        });
    });

export default testMongo;

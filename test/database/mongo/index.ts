import Database from '../../../src/database/mongo';
import testAuthRecord from './auth-record/insert-update-one';
import testQueryInsertUpdateOne from './post/query-insert-update-one';
import testQueryPaginated from './post/query-paginated';
import testQueryPublishUnpublishDeleteRestore from './post/query-publish-unpubish-delete-restore-one';
import { afterAll, describe } from 'vitest';

describe('MongoDB', () => {
    testAuthRecord();
    testQueryInsertUpdateOne();
    testQueryPaginated();
    testQueryPublishUnpublishDeleteRestore();
    afterAll(async () => {
        (await Database.instance()).close();
    });
});

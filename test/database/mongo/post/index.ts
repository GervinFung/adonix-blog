import testQueryInsertUpdateOne from './query-insert-update-one';
import testQueryPaginated from './query-paginated';
import testQueryPublishUnpublishDeleteRestore from './query-publish-unpubish-delete-restore-one';
import testCases from 'cases-of-test';
import { describe } from 'vitest';

const testPost = () =>
    describe('Post', () => {
        testCases({
            tests: [
                [testQueryPublishUnpublishDeleteRestore],
                [testQueryInsertUpdateOne],
                [testQueryPaginated],
            ],
        });
    });

export default testPost;

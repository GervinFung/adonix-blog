import testInsertUpdate from './insert-update-one';
import { describe } from 'vitest';

const testAuthRecord = () =>
    describe('Auth Record', () => {
        testInsertUpdate();
    });

export default testAuthRecord;

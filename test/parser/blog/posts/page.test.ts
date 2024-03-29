import blogParser from '../../../../src/parser/blog';
import { describe, expect, it } from 'vitest';

describe('Page Parser', () => {
    const { paginated } = blogParser();
    it('should parse valid page', () => {
        const page = 100;
        expect(paginated.parseAsPage(`${page}`)).toBe(page);
    });
    it('should fail to parse invalid total page and return min page', () => {
        const totalPosts = 'asd';
        expect(paginated.parseAsPage(totalPosts)).toBe(1);
    });
});

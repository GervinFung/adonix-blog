import blogParser from '../../../../src/parser/blog';
import { describe, expect, it } from 'vitest';

describe('Total Post Parser', () => {
    const { paginated } = blogParser();
    it('should parse valid total posts', () => {
        const totalPosts = 100;
        expect(paginated.parseAsTotalPosts(totalPosts)).toBe(totalPosts);
    });
    it('should fail to parse invalid total posts and return min total posts', () => {
        const totalPosts = '100';
        expect(paginated.parseAsTotalPosts(totalPosts)).toBe(0);
    });
});

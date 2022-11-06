import { describe, it, expect } from 'vitest';
import { isInputNotEmptyOrBlank } from '../../../src/common/validation';

const testValidation = () =>
    describe('Input Validation', () => {
        it.each(['', ' '])(
            'should validate that "%s" is either empty or blank',
            (string) => {
                expect(isInputNotEmptyOrBlank(string)).toBe(false);
            }
        );
        it.each(['asd', ' 123 '])(
            'should validate that "%s" is neither empty nor blank',
            (string) => {
                expect(isInputNotEmptyOrBlank(string)).toBe(true);
            }
        );
    });

export default testValidation;

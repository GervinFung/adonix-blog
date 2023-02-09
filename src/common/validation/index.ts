import { PostCommonProps } from '../type/post';

const isBlank = (s: string) =>
    s.split('').filter((c) => ' ' === c).length === s.length;
const isEmpty = (s: string) => s === '';

const isInputNotEmptyOrBlank = (input: string) =>
    !(isBlank(input) || isEmpty(input));

const isAllTextValid = <T extends PostCommonProps>({
    content,
    description,
    title,
}: T) =>
    isInputNotEmptyOrBlank(content) &&
    isInputNotEmptyOrBlank(description) &&
    isInputNotEmptyOrBlank(title);

export { isInputNotEmptyOrBlank, isAllTextValid };

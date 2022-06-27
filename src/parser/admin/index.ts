import { parseAsCustomType, parseAsString } from 'parse-dont-validate';
import { PostsQueryOption, UpdatePostStatus } from '../../common/type/post';
import { admin } from '../../util/const';

const adminPropsParser = () => {
    const parseAsPostQueryOption = (option: unknown) =>
        parseAsCustomType<PostsQueryOption>(option, (option) =>
            admin.postQueryOptions.includes(option)
        );
    return {
        auth: {
            parseAsToken: (token: unknown) =>
                parseAsString(token).orElseThrowDefault('token'),
            parseAsNullableToken: (token: unknown) =>
                parseAsString(token).orElseGetUndefined(),
        },
        posts: {
            parseAsPostQueryOption: (option: unknown) =>
                parseAsPostQueryOption(option).orElseThrowDefault('option'),
            parseAsNullablePostQueryOption: (option: unknown) =>
                parseAsPostQueryOption(option).orElseLazyGet(
                    () => 'published' as PostsQueryOption
                ),
            parseAsNullablePostStatus: (status: unknown) =>
                parseAsCustomType<UpdatePostStatus>(status, (status) =>
                    admin.updatePostStatus.includes(status)
                ).orElseGetUndefined(),
        },
    } as const;
};

export default adminPropsParser;

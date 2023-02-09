const api = (() => {
    const postRoute = (route: 'update' | 'insert' | 'query') =>
        `admin/post/${route}` as const;
    return {
        admin: {
            login: 'admin/login',
            logout: 'admin/logout',
            post: {
                update: postRoute('update'),
                insert: postRoute('insert'),
                query: postRoute('query'),
            },
        },
        post: {
            paginated: 'post/paginated',
            one: 'post/one',
        },
    } as const;
})();

const val = {
    post: {
        paginated: 'paginated',
        one: 'one',
    },
} as const;

const admin = {
    postQueryOptions: ['published', 'unpublished', 'deleted'],
    updatePostStatus: ['publish', 'unpublish', 'delete', 'restore'],
} as const;

const postsPerPage = 9;

export { api, postsPerPage, val, admin };

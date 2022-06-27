type Aud =
    | 'Adonix-os-blog-local'
    | 'Adonix-os-blog-staging'
    | 'Adonix-os-blog-production';

type FilterForUpdateAuth = Readonly<{
    uid: string;
    aud: Aud;
    authTime: number;
}>;

type InsertAuth = Readonly<
    FilterForUpdateAuth & {
        timeCreated: Date;
        email: string;
    }
>;

type UpdateAuth = Readonly<{
    timeLoggedOut: Date;
}>;

export type { Aud, FilterForUpdateAuth, InsertAuth, UpdateAuth };

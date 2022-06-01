export interface IUser {
    ID: number;
    roles: string[];
    data: any;
    caps: any;
}

export interface IApp {
    loading: boolean;
    error: boolean;
    success: boolean;
    errorMessage?: string;
    successMessage?: string;
    user: IUser;
    singlePost: ISinglePost;
    singlePostSlug: null | string;
}

export interface ISinglePost {
    ID?: number;
    post_title?: string;
    post_date?: string;
    post_content?: string;
    readed?: boolean;
    slug?: string;
}

export interface ITerm {
    term_id: number;
    name: string;
    slug: string;
    unread_count: number;
}

export interface IPosts {
    news: ISinglePost[];
    newsReaded: string[];
    docs: Array<any>;
    docsReaded: string[];
    docsCategories: ITerm[];
    forManagers: ISinglePost[];
    forManagersReaded: string[];
    newsUnreadedCount: number;
    docsUnreadedCount: number;
    forManagersUnreadedCount: number;
    interval: null | number;
}

export interface IPostsList {
    posts: ISinglePost[];
    isDocs: boolean;
}

export interface IIcon {
    unreadedCount: number;
    onClick: () => void;
}

export interface IModalTabs {
    open: boolean;
    onClick: () => void;
}

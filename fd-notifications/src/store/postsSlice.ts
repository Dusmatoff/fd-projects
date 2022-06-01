import {createSlice} from '@reduxjs/toolkit';
import {RootState} from './store';
import {showLoader, hideLoader, showError} from './appSlice';
import {ajaxGet} from '../utils';
import {IPosts} from './interfaces';

const initialState: IPosts = {
    news: [],
    newsReaded: [],
    docs: [],
    docsReaded: [],
    docsCategories: null,
    forManagers: [],
    forManagersReaded: [],
    newsUnreadedCount: 0,
    docsUnreadedCount: 0,
    forManagersUnreadedCount: 0,
    interval: null,
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setNews: (state, action) => {
            state.news = action.payload;
        },
        setNewsReaded: (state, action) => {
            state.newsReaded = action.payload;
        },
        setDocs: (state, action) => {
            state.docs = action.payload;
        },
        setDocsReaded: (state, action) => {
            state.docsReaded = action.payload;
        },
        setDocsCategories: (state, action) => {
            state.docsCategories = action.payload;
        },
        setForManagers: (state, action) => {
            state.forManagers = action.payload;
        },
        setForManagersReaded: (state, action) => {
            state.forManagersReaded = action.payload;
        },
        setNewsUnreadedCount: (state, action) => {
            state.newsUnreadedCount = action.payload;
        },
        setDocsUnreadedCount: (state, action) => {
            state.docsUnreadedCount = action.payload;
        },
        setForManagersUnreadedCount: (state, action) => {
            state.forManagersUnreadedCount = action.payload;
        },
        setInterval: (state, action) => {
            state.interval = action.payload;
        },
    },
});

export function fetchPosts() {
    return async dispatch => {
        dispatch(showLoader());

        try {
            const response = await ajaxGet('fd_notifications_get_posts');

            dispatch(setNews(response.news));
            dispatch(setNewsReaded(response.newsReaded));

            dispatch(setDocs(response.docs));
            dispatch(setDocsReaded(response.docsReaded));
            dispatch(setDocsCategories(response.docsCategories));

            dispatch(setForManagers(response.forManagers));
            dispatch(setForManagersReaded(response.forManagersReaded));

            dispatch(setNewsUnreadedCount(response.newsUnreadedCount));
            dispatch(setDocsUnreadedCount(response.docsUnreadedCount));
            dispatch(setForManagersUnreadedCount(response.forManagersUnreadedCount));

            dispatch(setInterval(response.interval));
        } catch (error) {
            dispatch(showError(error.message))
        }finally {
            dispatch(hideLoader());
        }
    }
}

export const { setNews, setNewsReaded, setDocs, setDocsReaded, setForManagers, setForManagersReaded, setNewsUnreadedCount, setDocsUnreadedCount, setForManagersUnreadedCount, setDocsCategories, setInterval } = postsSlice.actions;

//Selectors
export const selectNews = (state: RootState) => state.posts.news;
export const selectNewsReaded = (state: RootState) => state.posts.newsReaded;
export const selectDocs = (state: RootState) => state.posts.docs;
export const selectDocsReaded = (state: RootState) => state.posts.docsReaded;
export const selectForManagers = (state: RootState) => state.posts.forManagers;
export const selectUnreadeds = (state: RootState) => [state.posts.newsUnreadedCount, state.posts.docsUnreadedCount, state.posts.forManagersUnreadedCount];
export const selectUnreadedsCount = (state: RootState) => state.posts.newsUnreadedCount + state.posts.docsUnreadedCount + state.posts.forManagersUnreadedCount;
export const selectDocsCategories = (state: RootState) => state.posts.docsCategories;
export const selectInterval = (state: RootState) => state.posts.interval;

export default postsSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ajaxGet } from '../utils';
import { IApp, IUser } from './interfaces';

const initialState: IApp = {
    loading: false,
    error: false,
    success: false,
    user: null,
    singlePost: null,
    singlePostSlug: null,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        showLoader: (state) => {
            state.loading = true;
        },
        hideLoader: (state) => {
            state.loading = false;
        },
        showError: (state, action: PayloadAction<string>) => {
            state.error = true;
            state.errorMessage = action.payload;
        },
        hideError: (state) => {
            state.error = false;
        },
        showSuccess: (state, action: PayloadAction<string>) => {
            state.success = true;
            state.successMessage = action.payload;
        },
        hideSuccess: (state) => {
            state.success = false;
        },
        setUserData: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        setSinglePost: (state, action) => {
            state.singlePost = action.payload;
        },
        clearSinglePost: (state) => {
            state.singlePost = null;
            state.singlePostSlug = null;
        },
        setSinglePostSlug: (state, action) => {
            state.singlePostSlug = action.payload;
        },
    },
});

export function fetchUser() {
    return async dispatch => {
        const user = await ajaxGet('fd_notifications_get_user');

        dispatch(setUserData(user));
    }
}

export function setPostReaded(postId: number, slug: string) {
    return async dispatch => {
        dispatch(showLoader());

        try {
            const response = await ajaxGet('fd_notifications_set_post_readed', {postId, slug});

            dispatch(showSuccess(response.message));
        } catch (error) {
            dispatch(showError(error.message));
        }finally {
            dispatch(hideLoader());
        }
    }
}

export function fetchSinglePost(postId: number) {
    return async dispatch => {
        dispatch(showLoader());

        try {
            const singlePost = await ajaxGet('fd_notifications_get_single_post', {postId});

            dispatch(setSinglePost(singlePost));
        } catch (error) {
            dispatch(showError(error.message));
        }finally {
            dispatch(hideLoader());
        }
    }
}

export const { showLoader, hideLoader, showError, hideError, showSuccess, hideSuccess, setUserData, setSinglePost, clearSinglePost, setSinglePostSlug } = appSlice.actions;

//Selectors
export const selectSuccess = (state: RootState) => state.app.success;
export const selectSuccessMessage = (state: RootState) => state.app.successMessage;
export const selectError = (state: RootState) => state.app.error;
export const selectErrorMessage = (state: RootState) => state.app.errorMessage;
export const selectLoading = (state: RootState) => state.app.loading;
export const selectUser = (state: RootState): IUser => state.app.user;
export const selectUserId = (state: RootState) => state.app.user?.ID;
export const selectReadPost = (state: RootState) => state.app.singlePost;
export const selectSinglePostSlug = (state: RootState) => state.app.singlePostSlug;

export default appSlice.reducer;

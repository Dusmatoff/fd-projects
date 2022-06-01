import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import postsSlice from './postsSlice';

export const store = configureStore({
    reducer: {
        app: appSlice,
        posts: postsSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;

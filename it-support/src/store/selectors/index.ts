export const isLoader = (state): boolean => state.app.loadersCount > 0;
export const isError = (state): boolean => state.app.error;
export const getErrorMessage = (state): string => state.app.errorMessage;
export const isAlert = (state): boolean => state.app.alert;
export const getSuccessMessage = (state): string => state.app.successMessage;
export const isShowNewRequest = (state): boolean => state.app.showNewRequest;
export const isShowList = (state): boolean => state.app.showList;
export const isUserFetched = (state): boolean => Object.keys(state.user).length !== 0;
export const getUser = (state) => state.user;
export const getUserId = (state) => state.user?.data?.id || null;
export const isUserWorker = (state): boolean => state.user?.capabilities?.worker || false;
export const isUserLocManager = (state): boolean => state.user?.capabilities?.loc_manager || false;
export const isUserManager = (state): boolean => state.user?.capabilities?.manager || false;
export const isUserAdmin = (state): boolean => state.user?.capabilities?.administrator || false;
export const getRequests = (state): any => state.requests;
export const isRequestsFetched = (state): boolean => state.requests.length > 0;
export const getComments = (state): any => state.comments;
export const getUpdates = (state): any => state.updates;
export const getScreenshot = (state): string | null => state.app.screenshot;

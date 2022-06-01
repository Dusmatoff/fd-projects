export const isLoader = (state): boolean => state.app.loadersCount > 0;
export const isError = (state): boolean => state.app.error;
export const getErrorMessage = (state): string => state.app.errorMessage;
export const isAlert = (state): boolean => state.app.alert;
export const getSuccessMessage = (state): boolean => state.app.successMessage;
export const getPurchaseLogs = (state): Array<any> => state.app.purchaseLogs;
export const getEditPurchase = (state): Array<any> => state.app.editPurchase;

export const isUserDataFetched = (state) => Object.keys(state.user).length !== 0;
export const getUser = (state) => state.user;
export const getUserId = (state) => state.user?.data?.id || null;
export const isWorker = (state): boolean => state.user?.capabilities?.worker || false;
export const isLocManager = (state): boolean => state.user?.capabilities?.loc_manager || false;
export const isManager = (state): boolean => state.user?.capabilities?.manager || false;
export const isAdmin = (state): boolean => state.user?.capabilities?.administrator || false;

export const getPurchases = (state) => state.purchases.data;

export const getHallsCategories = (state) => state.user?.location;

export const isCategoriesFetched = (state) => Object.keys(state.categories).length !== 0;
export const getCategories = (state) => state.categories;

export const getTypes = (state) => state.types;

export const getVendors = (state) => state.vendors;

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createGenerateClassName, StylesProvider } from '@material-ui/core/styles';
import ErrorModal from './components/ErrorModal';
import Loader from './components/Loader';
import AlertSuccess from './components/AlertSuccess';
import TabsBlock from './components/TabsBlock';
import { isCategoriesFetched, isProductsFetched } from './selectors';
import { fetchProducts } from './actions/products';
import { fetchCategories } from './actions/categories';
import { fetchHalls } from './actions/halls';

const shopClassName = createGenerateClassName({
  productionPrefix: 'fd-shop-jss',
  disableGlobal: true,
  seed: 'fd-shop',
});

const App = (props) => {
  const {
    pageId, fetchProductsAction, fetchCategoriesAction, fetchHallsAction, categoriesFetched, productsFetched,
  } = props;

  useEffect(() => {
    fetchProductsAction();
    fetchCategoriesAction();
    fetchHallsAction();
  }, []);

  return (
    <StylesProvider generateClassName={shopClassName}>
      <div style={{ flexGrow: 1 }}>
        <Loader />
        <AlertSuccess />
        <ErrorModal />
        {productsFetched && categoriesFetched && <TabsBlock pageId={pageId} />}
      </div>
    </StylesProvider>
  );
};

const mapStateToProps = (state) => ({
  categoriesFetched: isCategoriesFetched(state),
  productsFetched: isProductsFetched(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchProductsAction: () => dispatch(fetchProducts()),
  fetchCategoriesAction: () => dispatch(fetchCategories()),
  fetchHallsAction: () => dispatch(fetchHalls()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

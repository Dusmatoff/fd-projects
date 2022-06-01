import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import MaterialTable from 'material-table';
import { fetchCategories } from '../../../actions/categories';
import { getCategories } from '../../../selectors';

const Categories = (props) => {
  const {
    categories,
    fetchCategoriesAction,
    addCategoryAction,
    updateCategoryAction,
    deleteCategoryAction,
  } = props;

  const validateFields = (data) => {
    if (Object.keys(data).length === 0) {
      alert('Please add info');
      return false;
    }

    if (typeof data.name === 'undefined' || data.name === '') {
      alert('Please add name');
      return false;
    }

    return true;
  };

  return (
    <Container maxWidth="sm">
      <MaterialTable
        title="Add category"
        options={{
          addRowPosition: 'first',
          draggable: false,
          paging: false,
          search: false,
          toolbarButtonAlignment: 'left',
        }}
        columns={[{ title: 'Name', field: 'name' }]}
        data={categories}
        editable={{
          onRowAdd: (newData) => new Promise((resolve, reject) => {
            if (validateFields(newData)) {
              Promise.resolve(addCategoryAction(newData.name)).then(() => {
                fetchCategoriesAction();
              }).then(() => {
                resolve();
              });
            } else {
              reject();
            }
          }),
          onRowUpdate: (newData) => new Promise((resolve, reject) => {
            if (validateFields(newData)) {
              Promise.resolve(updateCategoryAction(newData.id, newData.name)).then(() => {
                fetchCategoriesAction();
              }).then(() => {
                resolve();
              });
            } else {
              reject();
            }
          }),
          onRowDelete: (oldData) => new Promise((resolve) => {
            Promise.resolve(deleteCategoryAction(oldData.id)).then(() => {
              fetchCategoriesAction();
            }).then(() => {
              resolve();
            });
          }),
        }}
      />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  categories: getCategories(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategoriesAction: () => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);

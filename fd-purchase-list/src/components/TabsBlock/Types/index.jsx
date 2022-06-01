import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import MaterialTable from 'material-table';
import {
  fetchTypes, addType, updateType, deleteType,
} from '../../../actions/types';
import { getTypes, getCategories } from '../../../selectors';

const Types = (props) => {
  const {
    types,
    categories,
    fetchTypesAction,
    addTypeAction,
    updateTypeAction,
    deleteTypeAction,
  } = props;

  const categoriesObject = categories.reduce((result, item) => {
    result[item.id] = item.name;
    return result;
  }, {});

  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Category', field: 'categoryId', lookup: categoriesObject },
  ];

  const validateFields = (data) => {
    if (Object.keys(data).length === 0) {
      alert('Please add info');
      return false;
    }

    if (typeof data.categoryId === 'undefined' || data.categoryId === '') {
      alert('Please choose category');
      return false;
    }

    if (typeof data.name === 'undefined' || data.name === '') {
      alert('Please add name');
      return false;
    }

    return true;
  };

  return (
    <Container maxWidth="md">
      <MaterialTable
        title="Add type"
        options={{
          addRowPosition: 'first',
          draggable: false,
          paging: false,
          search: false,
          toolbarButtonAlignment: 'left',
        }}
        columns={columns}
        data={types}
        editable={{
          onRowAdd: (newData) => new Promise((resolve, reject) => {
            if (validateFields(newData)) {
              Promise.resolve(addTypeAction(newData.categoryId, newData.name)).then(() => {
                fetchTypesAction();
              }).then(() => {
                resolve();
              });
            } else {
              reject();
            }
          }),
          onRowUpdate: (newData) => new Promise((resolve, reject) => {
            if (validateFields(newData)) {
              Promise.resolve(updateTypeAction(newData.id, newData.categoryId, newData.name)).then(() => {
                fetchTypesAction();
              }).then(() => {
                resolve();
              });
            } else {
              reject();
            }
          }),
          onRowDelete: (oldData) => new Promise((resolve) => {
            Promise.resolve(deleteTypeAction(oldData.id)).then(() => {
              fetchTypesAction();
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
  types: getTypes(state),
  categories: getCategories(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTypesAction: () => dispatch(fetchTypes()),
  addTypeAction: (categoryId, name) => dispatch(addType(categoryId, name)),
  updateTypeAction: (id, categoryId, name) => dispatch(updateType(id, categoryId, name)),
  deleteTypeAction: (id) => dispatch(deleteType(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Types);

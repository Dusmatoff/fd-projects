import React from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import {
  fetchCategories, addTransactionCategory, updateTransactionCategory, deleteTransactionCategory,
} from '../../../actions/categories';
import { getCategories } from '../../../selectors';

const Categories = (props) => {
  const {
    categories,
    fetchCategoriesAction,
    addTransactionCategoryAction,
    updateTransactionCategoryAction,
    deleteTransactionCategoryAction,
  } = props;

  const columns = [
    { title: 'ID', field: 'id', editable: 'onAdd' },
    { title: 'Name', field: 'name' },
    { title: 'Payroll amount', field: 'payroll_amount', type: 'numeric' },
    { title: 'Payroll type', field: 'payroll_type', lookup: { 0: 'Disabled', sum: '$', percent: '%' } },
    { title: 'Debit/Credit Category', field: 'debit_credit_category_id', lookup: categories.debitCreditCategory },
  ];

  const validateFields = (data) => {
    if (Object.keys(data).length === 0) {
      alert('Please add info');
      return false;
    }

    if (typeof data.id === 'undefined' || data.id === '') {
      alert('Please add id');
      return false;
    }

    if (typeof data.name === 'undefined' || data.name === '') {
      alert('Please add name');
      return false;
    }

    if (typeof data.payroll_amount === 'undefined' || data.payroll_amount === '') {
      alert('Please add payroll amount');
      return false;
    }

    if (typeof data.payroll_type === 'undefined' || data.payroll_type === '') {
      alert('Please choose payroll type');
      return false;
    }

    if (typeof data.debit_credit_category_id === 'undefined' || data.debit_credit_category_id === '') {
      alert('Please choose debit credit category id');
      return false;
    }

    return true;
  };

  return (
    <MaterialTable
      title="ADD CATEGORY"
      options={{
        addRowPosition: 'first',
        draggable: false,
        paging: false,
        toolbarButtonAlignment: 'left',
      }}
      columns={columns}
      data={categories.all}
      editable={{
        onRowAdd: (newData) => new Promise((resolve, reject) => {
          if (validateFields(newData)) {
            Promise.resolve(addTransactionCategoryAction(newData)).then(() => {
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
            Promise.resolve(updateTransactionCategoryAction(newData)).then(() => {
              fetchCategoriesAction();
            }).then(() => {
              resolve();
            });
          } else {
            reject();
          }
        }),
        onRowDelete: (oldData) => new Promise((resolve) => {
          Promise.resolve(deleteTransactionCategoryAction(oldData.id)).then(() => {
            fetchCategoriesAction();
          }).then(() => {
            resolve();
          });
        }),
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  categories: getCategories(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategoriesAction: () => dispatch(fetchCategories()),
  addTransactionCategoryAction: (newData) => dispatch(addTransactionCategory(newData)),
  updateTransactionCategoryAction: (newData) => dispatch(updateTransactionCategory(newData)),
  deleteTransactionCategoryAction: (id) => dispatch(deleteTransactionCategory(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);

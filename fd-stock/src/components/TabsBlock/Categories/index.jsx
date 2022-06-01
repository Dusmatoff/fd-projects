import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import {
  fetchCategories, addCategory, updateCategory, deleteCategory,
} from '../../../store/actions/categories';
import { getCategories } from '../../../store/selectors';

const Categories = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => getCategories(state));

  const columns = [
    { title: 'Name', field: 'name' },
    {
      title: 'Description',
      field: 'description',
      editComponent: (props) => (
        <textarea onChange={(e) => props.onChange(e.target.value)}>
          {props.value}
        </textarea>
      ),
    },
  ];

  const validateFields = (data) => {
    if (Object.keys(data).length === 0 || typeof data.name === 'undefined' || data.name === '') {
      alert('Please add name');
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
        search: false,
        actionsColumnIndex: 2,
      }}
      columns={columns}
      data={categories}
      editable={{
        onRowAdd: (newData) => new Promise((resolve, reject) => {
          if (validateFields(newData)) {
            Promise.resolve(dispatch(addCategory(newData))).then(() => {
              dispatch(fetchCategories());
            }).then(() => {
              resolve();
            });
          } else {
            reject();
          }
        }),
        onRowUpdate: (newData) => new Promise((resolve, reject) => {
          if (validateFields(newData)) {
            Promise.resolve(dispatch(updateCategory(newData))).then(() => {
              dispatch(fetchCategories());
            }).then(() => {
              resolve();
            });
          } else {
            reject();
          }
        }),
        onRowDelete: (oldData) => new Promise((resolve) => {
          Promise.resolve(dispatch(deleteCategory(oldData.id))).then(() => {
            dispatch(fetchCategories());
          }).then(() => {
            resolve();
          });
        }),
      }}
    />
  );
};

export default Categories;

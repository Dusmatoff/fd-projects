import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import EditProduct from './editProduct';
import { setEditProduct } from '../../../actions/app';
import { fetchProducts, addProduct, deleteProduct } from '../../../actions/products';
import { getCategories, getProducts } from '../../../selectors';

const Products = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => getCategories(state));
  const products = useSelector((state) => getProducts(state));

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (rowData) => {
    dispatch(setEditProduct(rowData));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(setEditProduct(null));
  };

  const actions = [
    {
      icon: 'create',
      tooltip: 'Edit product',
      onClick: (event, rowData) => handleShowModal(rowData),
    },
  ];

  const columns = [
    {
      title: 'ID',
      field: 'id',
      editable: 'never',
      filtering: false,
      cellStyle: { padding: 0 },
    },
    {
      title: 'Name',
      field: 'name',
      filtering: false,
      cellStyle: { padding: 0 },
    },
    {
      title: 'Price type',
      field: 'price_type',
      lookup: { fixed: 'fixed', variable: 'variable' },
      filtering: false,
      cellStyle: { padding: 0 },
    },
    {
      title: 'Price',
      field: 'price',
      type: 'numeric',
      filtering: false,
      align: 'left',
      render: (rowData) => `$${parseFloat(rowData.price)}`,
      headerStyle: { width: '20%' },
      cellStyle: { padding: 0, width: '20%' },
    },
    {
      title: 'Category',
      field: 'category_id',
      lookup: categories.formatted,
      filterPlaceholder: 'Filter',
      cellStyle: { padding: 0 },
    },
    {
      title: 'Description',
      field: 'description',
      filtering: false,
      cellStyle: { padding: 0, minWidth: 450 },
    },
  ];

  const validateFields = (data) => {
    if (Object.keys(data).length === 0) {
      alert('Please add info');
      return false;
    }

    const {
      name, price_type, price, category_id,
    } = data;

    if (typeof name === 'undefined' || name === '') {
      alert('Please add name');
      return false;
    }

    if (typeof price_type === 'undefined' || price_type === '') {
      alert('Please choose price type');
      return false;
    }

    if (price_type === 'fixed' && (typeof price === 'undefined' || price === '')) {
      alert('Please add price');
      return false;
    }

    if (typeof category_id === 'undefined' || category_id === '') {
      alert('Please add category');
      return false;
    }

    return true;
  };

  return (
    <>
      <MaterialTable
        title="ADD PRODUCT"
        actions={actions}
        options={{
          addRowPosition: 'first',
          draggable: false,
          paging: false,
          toolbarButtonAlignment: 'left',
          filtering: true,
        }}
        columns={columns}
        data={products}
        editable={{
          onRowAdd: (newData) => new Promise((resolve, reject) => {
            if (validateFields(newData)) {
              Promise.resolve(dispatch(addProduct(newData))).then(() => {
                dispatch(fetchProducts());
              }).then(() => {
                resolve();
              });
            } else {
              reject();
            }
          }),
          onRowDelete: (oldData) => new Promise((resolve) => {
            Promise.resolve(dispatch(deleteProduct(oldData.id))).then(() => {
              dispatch(fetchProducts());
            }).then(() => {
              resolve();
            });
          }),
        }}
      />
      {showModal && <EditProduct showModal={showModal} hideModal={handleCloseModal} />}
    </>
  );
};

export default Products;

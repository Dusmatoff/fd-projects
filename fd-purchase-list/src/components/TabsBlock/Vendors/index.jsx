import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import MaterialTable from 'material-table';
import {
  fetchVendors, addVendor, updateVendor, deleteVendor,
} from '../../../actions/vendors';
import { getVendors } from '../../../selectors';

const Vendors = (props) => {
  const {
    vendors,
    fetchVendorsAction,
    addVendorAction,
    updateVendorAction,
    deleteVendorAction,
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
        title="Add vendor"
        options={{
          addRowPosition: 'first',
          draggable: false,
          paging: false,
          search: false,
          toolbarButtonAlignment: 'left',
        }}
        columns={[{ title: 'Name', field: 'name' }]}
        data={vendors}
        editable={{
          onRowAdd: (newData) => new Promise((resolve, reject) => {
            if (validateFields(newData)) {
              Promise.resolve(addVendorAction(newData.name)).then(() => {
                fetchVendorsAction();
              }).then(() => {
                resolve();
              });
            } else {
              reject();
            }
          }),
          onRowUpdate: (newData) => new Promise((resolve, reject) => {
            if (validateFields(newData)) {
              Promise.resolve(updateVendorAction(newData.id, newData.name)).then(() => {
                fetchVendorsAction();
              }).then(() => {
                resolve();
              });
            } else {
              reject();
            }
          }),
          onRowDelete: (oldData) => new Promise((resolve) => {
            Promise.resolve(deleteVendorAction(oldData.id)).then(() => {
              fetchVendorsAction();
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
  vendors: getVendors(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchVendorsAction: () => dispatch(fetchVendors()),
  addVendorAction: (name) => dispatch(addVendor(name)),
  updateVendorAction: (id, name) => dispatch(updateVendor(id, name)),
  deleteVendorAction: (id) => dispatch(deleteVendor(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Vendors);

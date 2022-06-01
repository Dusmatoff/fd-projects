import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { updatePurchase, addDebitAndCredit, fetchSinglePurchase } from '../../../actions/purchases';
import { fetchPurchaseLogs } from '../../../actions/app';
import {
  getHallsCategories,
  getCategories,
  getTypes,
  getVendors,
  isAdmin,
  getPurchaseLogs,
  getEditPurchase,
} from '../../../selectors';
import useStyles from '../../styles';

const EditModal = (props) => {
  const classes = useStyles();

  const {
    showModal,
    hideModal,
    editPurchase,
    updatePurchaseAction,
    runFilter,
    hallsCategories,
    categories,
    types,
    vendors,
    fetchPurchaseLogsAction,
    purchaseLogs,
    addDebitAndCreditAction,
    fetchSinglePurchaseAction,
  } = props;

  useEffect(() => {
    fetchPurchaseLogsAction(editPurchase.id);
  }, []);

  const logs = purchaseLogs.map((log) => (
    <li>
      {log.userLogin}
      {' '}
      set
      {' '}
      <b>{log.field}</b>
      {' '}
      to
      {' '}
      <b>{log.value}</b>
      {' '}
      on
      {' '}
      {moment.unix(log.timestamp).format('M/DD/YYYY')}
    </li>
  ));

  const hallsList = hallsCategories.map((hall) => (
    <option key={hall.id} value={hall.id}>{hall.name}</option>
  ));

  const categoriesList = categories.map((category) => (
    <option key={category.id} value={category.id}>{category.name}</option>
  ));

  const typesList = types.map((type) => (
    <option key={type.id} value={type.id}>{type.name}</option>
  ));

  const vendorsList = vendors.map((vendor) => (
    <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
  ));

  /* FORMIK */
  const validationSchema = Yup.object({
    urgency: Yup.number().required('What to buy is required'),
    whatToBuy: Yup.string().required('What to buy is required'),
    link: Yup.string().url('Please provide valid url'),
    quantity: Yup.number().min(0.01, 'Minimum 0.01').required('Quantity is required'),
    capacity: Yup.string().required('Capacity is required'),
    locationId: Yup.number().required('Location is required'),
    status: Yup.string().required('Status is required'),
    categoryId: Yup.number().min(1, 'Category is required').required('Category is required'),
    typeId: Yup.number().min(1, 'Type is required').required('Type is required'),
    vendorId: Yup.number().min(1, 'Vendor is required').required('Vendor is required'),
    price: Yup.number().min(0.02, 'Minimum 0.02').required('Price is required'),
  });

  const initialValues = {
    id: editPurchase.id,
    urgency: editPurchase.urgency,
    whatToBuy: editPurchase.whatToBuy,
    quantity: editPurchase.quantity,
    capacity: editPurchase.capacity,
    description: editPurchase.description,
    link: editPurchase.link,
    dateAdded: moment.unix(editPurchase.dateAdded).format('M/DD/YYYY'),
    dateOrdered: editPurchase.dateOrdered != null ? moment.unix(editPurchase.dateOrdered).format('M/DD/YYYY') : editPurchase.dateOrdered,
    locationId: editPurchase.locationId,
    status: editPurchase.status,
    userId: editPurchase.userId,
    categoryId: editPurchase.categoryId,
    typeId: editPurchase.typeId,
    dateDelivery: editPurchase.dateDelivery != null ? moment.unix(editPurchase.dateDelivery).format('M/DD/YYYY') : editPurchase.dateDelivery,
    note: editPurchase.note,
    dateReceived: editPurchase.dateOrdered ? moment.unix(editPurchase.dateOrdered).format('M/DD/YYYY') : ' ',
    vendorId: editPurchase.vendorId,
    price: editPurchase.price,
    userLogin: editPurchase.userLogin,
  };
    /* FORMIK */

  const addCredit = () => {
    if (window.confirm('Do you want add debit credit?')) {
      Promise.resolve(addDebitAndCreditAction(editPurchase)).then(() => {
        fetchSinglePurchaseAction(editPurchase.id);
        runFilter();
      });
    }
  };

  const dateOrdered = editPurchase.dateOrdered != null ? moment.unix(editPurchase.dateOrdered).format('M/DD/YYYY') : editPurchase.dateOrdered;
  const dateReceived = editPurchase.dateOrdered ? moment.unix(editPurchase.dateOrdered).format('M/DD/YYYY') : ' ';

  return (

    <Dialog maxWidth="md" open={showModal} onClose={hideModal}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => {
          Promise.resolve(updatePurchaseAction(values)).then(() => {
            fetchSinglePurchaseAction(editPurchase.id);
            runFilter();
          });
        }}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit}>
            <DialogTitle>{editPurchase.whatToBuy}</DialogTitle>
            <DialogContent>
              <Grid container spacing={1} justify="space-between" className={classes.mgb15}>
                <Grid item xs={2}>
                  <input
                    name="id"
                    type="hidden"
                    value={formikProps.values.id}
                  />
                  <FormControl variant="outlined" className={classes.width100}>
                    <InputLabel htmlFor="urgency">Urgency</InputLabel>
                    <Select
                      name="urgency"
                      label="Urgency"
                      native
                      inputProps={{ name: 'urgency', id: 'urgency' }}
                      onChange={formikProps.handleChange}
                      value={formikProps.values.urgency}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    name="quantity"
                    label="Qty"
                    type="number"
                    variant="outlined"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={formikProps.touched.quantity && Boolean(formikProps.errors.quantity)}
                    helperText={formikProps.touched.quantity && formikProps.errors.quantity}
                    className={`${classes.width100} ${classes.numberField}`}
                    value={formikProps.values.quantity}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControl variant="outlined" className={classes.width100}>
                    <InputLabel htmlFor="capacity">Units</InputLabel>
                    <Select
                      name="capacity"
                      label="Units"
                      native
                      inputProps={{ name: 'capacity', id: 'capacity' }}
                      onChange={formikProps.handleChange}
                      value={formikProps.values.capacity}
                    >
                      <option value="piece">piece</option>
                      <option value="pack">pack</option>
                      <option value="box">box</option>
                      <option value="bucket">bucket</option>
                      <option value="Kg">Kg</option>
                      <option value="Meter">Meter</option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    name="price"
                    label="Total amount"
                    type="number"
                    variant="outlined"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={formikProps.touched.price && Boolean(formikProps.errors.price)}
                    helperText={formikProps.touched.price && formikProps.errors.price}
                    className={`${classes.width100} ${classes.numberField}`}
                    value={formikProps.values.price}
                    onClick={() => parseFloat(formikProps.values.price) <= 0 && formikProps.setFieldValue('price', '')}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControl variant="outlined" className={classes.width100}>
                    <InputLabel htmlFor="status">Status</InputLabel>
                    <Select
                      name="status"
                      label="status"
                      native
                      inputProps={{ name: 'status', id: 'status' }}
                      onChange={formikProps.handleChange}
                      value={formikProps.values.status}
                    >
                      <option value="requested">requested</option>
                      <option value="ordered">ordered</option>
                      <option value="received">received</option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <input
                    name="userId"
                    type="hidden"
                    value={formikProps.values.userId}
                  />
                  <TextField
                    label="Author"
                    variant="outlined"
                    value={formikProps.values.userLogin}
                    className={`${classes.width100} ${classes.numberField}`}
                    disabled
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} justify="space-between" className={classes.mgb15}>
                <Grid item xs={6}>
                  <TextField
                    name="whatToBuy"
                    label="Product"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={formikProps.touched.whatToBuy && Boolean(formikProps.errors.whatToBuy)}
                    helperText={formikProps.touched.whatToBuy && formikProps.errors.whatToBuy}
                    className={`${classes.width100} ${classes.numberField}`}
                    value={formikProps.values.whatToBuy}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="link"
                    label="Link"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={formikProps.touched.link && Boolean(formikProps.errors.link)}
                    helperText={formikProps.touched.link && formikProps.errors.link}
                    className={`${classes.width100} ${classes.numberField}`}
                    value={formikProps.values.link}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} justify="space-between" className={classes.mgb15}>
                <Grid item xs={3}>
                  <FormControl variant="outlined" className={classes.width100}>
                    <InputLabel htmlFor="locationId">Location</InputLabel>
                    <Select
                      name="locationId"
                      label="Location"
                      native
                      inputProps={{ name: 'locationId', id: 'locationId' }}
                      onChange={formikProps.handleChange}
                      value={formikProps.values.locationId}
                    >
                      {hallsList}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl
                    variant="outlined"
                    error={formikProps.errors.categoryId && formikProps.touched.categoryId}
                    className={classes.width100}
                  >
                    <InputLabel htmlFor="categoryId">Category</InputLabel>
                    <Select
                      name="categoryId"
                      label="Category"
                      native
                      inputProps={{ name: 'categoryId', id: 'categoryId' }}
                      onChange={formikProps.handleChange}
                      value={formikProps.values.categoryId}
                    >
                      <option aria-label="None" value="-">---</option>
                      {categoriesList}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl
                    variant="outlined"
                    error={Boolean(formikProps.errors.typeId) && formikProps.touched.typeId}
                    className={classes.width100}
                  >
                    <InputLabel htmlFor="typeId">Type</InputLabel>
                    <Select
                      name="typeId"
                      native
                      label="Type"
                      inputProps={{ name: 'typeId', id: 'typeId' }}
                      onChange={formikProps.handleChange}
                      value={formikProps.values.typeId}
                    >
                      <option aria-label="None" value="-">---</option>
                      {typesList}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl
                    variant="outlined"
                    error={Boolean(formikProps.errors.vendorId) && formikProps.touched.vendorId}
                    className={classes.width100}
                  >
                    <InputLabel htmlFor="vendorId">Vendor</InputLabel>
                    <Select
                      name="vendorId"
                      native
                      label="Vendor"
                      inputProps={{ name: 'vendorId', id: 'vendorId' }}
                      onChange={formikProps.handleChange}
                      value={formikProps.values.vendorId}
                    >
                      <option aria-label="None" value="-">---</option>
                      {vendorsList}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={1} justify="space-between" className={classes.mgb15}>
                <Grid item xs={3}>
                  <TextField
                    name="dateAdded"
                    label="Created"
                    variant="outlined"
                    defaultValue={formikProps.values.dateAdded}
                    className={classes.width100}
                    disabled
                  />
                </Grid>
                {(editPurchase.status === 'ordered' || editPurchase.status === 'received') && (
                  <Grid item xs={3}>
                    <TextField
                      name="dateOrdered"
                      label="Date ordered"
                      variant="outlined"
                      defaultValue={dateOrdered}
                      className={classes.width100}
                      disabled
                    />
                  </Grid>
                )}
                {(editPurchase.status === 'ordered' || editPurchase.status === 'received') && (
                  <Grid item xs={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        name="dateDelivery"
                        label="Date delivery"
                        emptyLabel="Choose date"
                        format="M/dd/yy"
                        value={formikProps.values.dateDelivery}
                        disablePast
                        onChange={(dateValue) => formikProps.setFieldValue('dateDelivery', dateValue)}
                        animateYearScrolling
                        inputVariant="outlined"
                        className={classes.width100}
                        disabled={editPurchase.status === 'received'}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                )}
                {editPurchase.status === 'received' && (
                  <Grid item xs={3}>
                    <TextField
                      name="dateReceived"
                      label="Date received"
                      variant="outlined"
                      defaultValue={dateReceived}
                      className={classes.width100}
                      disabled
                    />
                  </Grid>
                )}
              </Grid>

              <Grid container spacing={1} justify="space-between">
                <Grid item xs={6}>
                  <TextField
                    name="description"
                    label="Description"
                    InputLabelProps={{ shrink: true }}
                    multiline
                    rows={2}
                    variant="outlined"
                    value={formikProps.values.description}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={formikProps.touched.description && Boolean(formikProps.errors.description)}
                    helperText={formikProps.touched.description && formikProps.errors.description}
                    className={classes.width100}
                  />
                  {isAdmin && <ul>{logs}</ul>}
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="note"
                    label="Manager Note"
                    InputLabelProps={{ shrink: true }}
                    multiline
                    rows={2}
                    variant="outlined"
                    value={formikProps.values.note}
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={formikProps.touched.note && Boolean(formikProps.errors.note)}
                    helperText={formikProps.touched.note && formikProps.errors.note}
                    className={classes.width100}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              {formikProps.values.status === 'ordered' && editPurchase.debitCreditId === null
                            && (
                            <Button variant="contained" color="secondary" onClick={addCredit}>
                              Add credit record
                            </Button>
                            )}
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
              <Button variant="contained" onClick={hideModal}>
                Close
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>

  );
};

const mapStateToProps = (state) => ({
  editPurchase: getEditPurchase(state),
  hallsCategories: getHallsCategories(state),
  categories: getCategories(state),
  types: getTypes(state),
  vendors: getVendors(state),
  isAdmin: isAdmin(state),
  purchaseLogs: getPurchaseLogs(state),
});

const mapDispatchToProps = (dispatch) => ({
  updatePurchaseAction: (fields) => dispatch(updatePurchase(fields)),
  fetchPurchaseLogsAction: (purchaseId) => dispatch(fetchPurchaseLogs(purchaseId)),
  addDebitAndCreditAction: (fields) => dispatch(addDebitAndCredit(fields)),
  fetchSinglePurchaseAction: (id) => dispatch(fetchSinglePurchase(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);

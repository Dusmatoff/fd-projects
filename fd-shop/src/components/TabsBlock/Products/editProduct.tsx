import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
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
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { fetchProducts, updateProduct } from '../../../actions/products';
import { getEditProduct, getCategories, getHalls } from '../../../selectors';
import useStyles from '../../styles';

const EditProduct = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const editProduct = useSelector((state) => getEditProduct(state));
  const categories = useSelector((state) => getCategories(state));
  const halls = useSelector((state) => getHalls(state));
  const losAngelesHallsIds = Object.keys(halls[1]);
  const newYorkHallsIds = Object.keys(halls[2]);
  const chicagoHallsIds = Object.keys(halls[3]);

  const { showModal, hideModal } = props;

  const [showHallsList, setShowHallsList] = useState(editProduct.halls !== null);

  const [checkedHalls, setCheckedHalls] = useState(editProduct.halls || []);
  const [allLosAngeles, setAllLosAngeles] = useState(losAngelesHallsIds.every((i) => checkedHalls.includes(i)));
  const [allNewYork, setAllNewYork] = useState(newYorkHallsIds.every((i) => checkedHalls.includes(i)));
  const [allChicago, setAllChicago] = useState(chicagoHallsIds.every((i) => checkedHalls.includes(i)));
  const handleCheckbox = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setCheckedHalls([...checkedHalls, name]);
    } else {
      const newArray = checkedHalls.filter((id) => id !== name);
      setCheckedHalls(newArray);
    }
  };

  const handleCheckboxCity = (event) => {
    const { name, checked } = event.target;
    let ids;
    switch (name) {
      case 'la':
        ids = losAngelesHallsIds;
        setAllLosAngeles(!allLosAngeles);
        break;
      case 'ny':
        ids = newYorkHallsIds;
        setAllNewYork(!allNewYork);
        break;
      default:
        ids = chicagoHallsIds;
        setAllChicago(!allChicago);
        break;
    }

    if (checked) {
      const newArray = [...checkedHalls, ...ids];
      const uniqueArray = newArray.filter((item, pos, self) => self.indexOf(item) === pos);
      setCheckedHalls(uniqueArray);
    } else {
      const newArray = checkedHalls.filter((id) => !ids.includes(id));
      setCheckedHalls(newArray);
    }
  };

  const categoriesList = categories.all.map((category) => (
    <option key={category.id} value={category.id}>{category.name}</option>
  ));

  /* FORMIK */
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    categoryId: Yup.number().min(1, 'Category is required').required('Category is required'),
    priceType: Yup.string().required('Location is required'),
    price: Yup.number().when('priceType', {
      is: (priceType) => priceType === 'fixed',
      then: Yup.number().min(0.02, 'Minimum 0.02').required('Price is required'),
    }),
  });

  const initialValues = {
    id: editProduct.id,
    name: editProduct.name,
    categoryId: editProduct.category_id,
    description: editProduct.description,
    priceType: editProduct.price_type,
    price: editProduct.price,
    hidden: Boolean(+editProduct.hidden),
    allHalls: editProduct.halls === null,
    halls: null,
  };
  /* FORMIK */

  return (

    <Dialog maxWidth="md" fullWidth open={showModal} onClose={hideModal}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (!values.allHalls) {
            if (checkedHalls.length > 0) {
              values.halls = checkedHalls.join();
            } else {
              alert('Please choose "Available in All Studios" or single halls');
              return;
            }
          }

          Promise.resolve(dispatch(updateProduct(values))).then(() => {
            dispatch(fetchProducts());
            hideModal();
          });
        }}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit}>
            <DialogTitle>{editProduct.name}</DialogTitle>
            <DialogContent>
              <Grid container spacing={1} justify="space-between" className={classes.mgb15}>
                <Grid item xs={6}>
                  <TextField
                    name="name"
                    label="Name"
                    variant="outlined"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={formikProps.touched.name && Boolean(formikProps.errors.name)}
                    helperText={formikProps.touched.name && formikProps.errors.name}
                    className={`${classes.width100} ${classes.numberField}`}
                    value={formikProps.values.name}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="outlined" className={`${classes.width100} ${classes.numberField}`}>
                    <InputLabel htmlFor="categoryId">Category</InputLabel>
                    <Select
                      name="categoryId"
                      label="Category"
                      native
                      inputProps={{ name: 'categoryId', id: 'categoryId' }}
                      onChange={formikProps.handleChange}
                      value={formikProps.values.categoryId}
                      className={classes.height35}
                    >
                      {categoriesList}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={1} justify="space-between" className={classes.mgb15}>
                <Grid item xs={12}>
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
                </Grid>
              </Grid>

              <Grid container spacing={1} justify="space-between" className={classes.mgb15}>
                <Grid item xs={3}>
                  <FormControl variant="outlined" className={`${classes.width100} ${classes.numberField}`}>
                    <InputLabel htmlFor="priceType">Price type</InputLabel>
                    <Select
                      name="priceType"
                      label="Price type"
                      native
                      inputProps={{ name: 'priceType', id: 'priceType' }}
                      onChange={formikProps.handleChange}
                      value={formikProps.values.priceType}
                    >
                      <option value="variable">variable</option>
                      <option value="fixed">fixed</option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    name="price"
                    label="Price"
                    type="number"
                    variant="outlined"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    error={formikProps.touched.price && Boolean(formikProps.errors.price)}
                    helperText={formikProps.touched.price && formikProps.errors.price}
                    className={`${classes.width100} ${classes.numberField}`}
                    value={formikProps.values.price}
                    disabled={formikProps.values.priceType === 'variable'}
                    inputProps={{ step: 0.01 }}
                    onClick={() => parseFloat(formikProps.values.price) <= 0 && formikProps.setFieldValue('price', '')}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControlLabel
                    control={(
                      <Switch
                        name="hidden"
                        checked={formikProps.values.hidden}
                        onChange={formikProps.handleChange}
                      />
)}
                    label="Hidden"
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControlLabel
                    control={(
                      <Switch
                        name="allHalls"
                        checked={formikProps.values.allHalls}
                        onChange={(event) => {
                          formikProps.handleChange(event);
                          setShowHallsList(!showHallsList);
                        }}
                      />
                      )}
                    label="Available in All Studios"
                  />
                </Grid>
              </Grid>

              {showHallsList && (
              <Grid container spacing={1} justify="space-between" className={classes.mgb15}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={(<Checkbox name="la" checked={allLosAngeles} onChange={handleCheckboxCity} />)}
                    label="Los Angeles"
                    labelPlacement="start"
                  />

                  {!allLosAngeles && (
                  <FormGroup row>
                    {losAngelesHallsIds.map((item) => (
                      <FormControlLabel
                        control={(<Checkbox name={item} checked={checkedHalls.includes(item)} onChange={handleCheckbox} />)}
                        label={halls[1][item]}
                      />
                    ))}
                  </FormGroup>
                  ) }
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={(<Checkbox name="ny" checked={allNewYork} onChange={handleCheckboxCity} />)}
                    label="New York"
                    labelPlacement="start"
                  />

                  {!allNewYork && (
                  <FormGroup row>
                    {newYorkHallsIds.map((item) => (
                      <FormControlLabel
                        control={(<Checkbox name={item} checked={checkedHalls.includes(item)} onChange={handleCheckbox} />)}
                        label={halls[2][item]}
                      />
                    ))}
                  </FormGroup>
                  ) }
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={(<Checkbox name="ch" checked={allChicago} onChange={handleCheckboxCity} />)}
                    label="Chicago"
                    labelPlacement="start"
                  />

                  {!allChicago && (
                  <FormGroup row>
                    {chicagoHallsIds.map((item) => (
                      <FormControlLabel
                        control={(<Checkbox name={item} checked={checkedHalls.includes(item)} onChange={handleCheckbox} />)}
                        label={halls[3][item]}
                      />
                    ))}
                  </FormGroup>
                  ) }
                </Grid>
              </Grid>
              )}
            </DialogContent>
            <DialogActions>
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

export default EditProduct;

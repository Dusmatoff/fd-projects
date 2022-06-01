import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { addInventory, fetchInventory } from '../../../store/actions/inventory';
import { getItems, getCurrentLocation, isUserAdmin } from '../../../store/selectors';
import useStyles from '../../styles';


const AddItem = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const items = useSelector((state) => getItems(state));
  const currentLocation = useSelector((state) => getCurrentLocation(state));
  const isAdmin = useSelector((state) => isUserAdmin(state));
  const isDeletedParam = isAdmin ? 1 : 0;

  const [showModal, setShowModal] = React.useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [itemId, setItemId] = React.useState(0);
  const handleChangeItem = (event: React.ChangeEvent<{ value: unknown }>) => {
    setItemId(event.target.value as number);
    setQtyError(false);
  };
  const [isSelectError, setSelectError] = React.useState(false);

  const [qty, setQty] = React.useState(1);
  const handleChangQty = (event: React.ChangeEvent<{ value: unknown }>) => {
    setQty(event.target.value as number);
    setSelectError(false);
  };
  const [isQtyError, setQtyError] = React.useState(false);

  const addItem = () => {
    if (itemId === 0) {
      setSelectError(true);
      return;
    }

    // @ts-ignore
    if (qty === '' || qty < 1) {
      setQtyError(true);
      return;
    }

    Promise.resolve(dispatch(addInventory({ 0: { newData: { id: itemId, new_qty: qty } } }, currentLocation))).then(() => {
      dispatch(fetchInventory(currentLocation, isDeletedParam));
    }).then(() => {
      setItemId(0);
      setQty(0);
      toggleModal();
    });
  };

  return (
    <>
      <Button variant="contained"  onClick={toggleModal} className={`${classes.mb10} ${classes.DarkGreenButton}`}>
        ADD BACKDROPS
      </Button>
      <Dialog open={showModal} onClose={toggleModal}>
        <DialogTitle>
          <Typography variant="h5">Add item</Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={toggleModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <FormControl className={classes.formControl} error={isSelectError}>
                <InputLabel id="item-select">Backdrops</InputLabel>
                <Select
                  labelId="item-select"
                  value={itemId}
                  onChange={handleChangeItem}
                >
                  <MenuItem value={0}>-Select-</MenuItem>
                  {items.map((item) => <MenuItem value={item.id} style={{ backgroundColor: item.meta?.color }}>{item.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <div>
                <TextField
                  label="Quantity"
                  type="number"
                  value={qty}
                  onChange={handleChangQty}
                  error={isQtyError}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <Button  onClick={addItem} className={`${classes.mt15} ${classes.DarkGreenButton}` }>
                SUBMIT
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddItem;

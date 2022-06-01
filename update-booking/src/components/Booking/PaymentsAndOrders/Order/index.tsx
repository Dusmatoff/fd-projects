import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Close from '@material-ui/icons/Close';
import Send from '@material-ui/icons/Send';
import PaymentLink from './PaymentLink';
import ProductItem from './ProductItem';
import CartItem from './CartItem';
import Payments from './Payments';
import { getTransactions, getCart, getBooking } from '../../../../selectors';
import { GreenButton } from '../../../buttons';
import useStyles from '../../../styles';

const Order = () => {
  const classes = useStyles();

  const booking = useSelector((state) => getBooking(state));

  const totalRate = Number(booking?.calcObj.total_rate);

  const transactions = useSelector((state) => getTransactions(state));
  const { products, categories } = transactions;
  const cart = useSelector((state) => getCart(state));
  const { items, total } = cart;

  const [showPayment, setShowPayment] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [productsList, setProductsList] = useState([]);
  const [showPaymentLinkModal, setShowPaymentLinkModal] = useState(false);

  const categoriesList = Object.keys(categories).map((item) => <option key={item} value={item}>{categories[item]}</option>);

  const changeCategory = (id) => {
    const filteredProducts = products.filter((product) => product.category_id === id);
    setProductsList(filteredProducts);
    setCategoryId(id);
  };

  const toggleShopModal = () => {
    setShowCartModal(!showCartModal);
  };

  const rentEstimatedRate = {
    id: '1',
    name: 'Rent (estimated rate)',
    price_type: 'fixed',
    price: totalRate,
    description: '',
    isEstimate: true,
  };

  const togglePaymentLinkModal = () => {
    setShowPaymentLinkModal(!showPaymentLinkModal);
    setShowCartModal(!showCartModal);
  };

  return (
    <>
      <Badge badgeContent={items.length} color="primary" className={classes.pdB10}>
        <GreenButton variant="contained" startIcon={<AddShoppingCart />} onClick={toggleShopModal}>
          ORDER
        </GreenButton>
      </Badge>

      <Dialog className={classes.dialogWindow}  maxWidth="xl" open={showCartModal} onClose={toggleShopModal}>
        <DialogTitle className={classes.textCenter}>
          <Typography variant="h4">Shop</Typography>
          <IconButton aria-label="close" className={`${classes.closeButton} positionAbsolute`} onClick={toggleShopModal}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.pdContent}>
          <Grid container spacing={1} justify="space-between" className={classes.modalSize} >
            <Grid item xs={12} lg={6} className={classes.borderRight}>
              {showPayment ? <Payments toggleShopModal={toggleShopModal} setShowPayment={setShowPayment} />
                : (
                  <>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="categoryId">Category</InputLabel>
                      <Select
                        name="categoryId"
                        label="Category"
                        value={categoryId}
                        onChange={(event) => changeCategory(event.target.value)}
                        inputProps={{ name: 'categoryId', id: 'categoryId' }}
                        displayEmpty
                        native
                      >
                        <option value="-">-Choose category-</option>
                        {categoriesList}
                      </Select>
                    </FormControl>
                    {productsList.length > 0 ? (
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell className={classes.widthColumn}>Name</TableCell>
                            <TableCell className={classes.widthColumn}>Description</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Qty</TableCell>
                            <TableCell align="right">&nbsp;</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {productsList.map((product) => <ProductItem key={product.id} product={product} />)}
                          {categoryId === '10' && <ProductItem product={rentEstimatedRate} />}
                        </TableBody>
                      </Table>
                    )
                      : <p>Not found products. Please choose other category</p>}
                  </>
                )}
            </Grid>
            <Grid item xs={12} lg={6}>
              {items.length > 0
              && (
              <div className={classes.cartBlock}>
                <div>
                  <Typography variant="h5" align="center">Cart</Typography>
                  <br />
                  <Table padding="checkbox">
                    <TableHead>
                      <TableRow className={classes.fontSize15}>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Qty</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items.map((item, index) => <CartItem key={item.id} item={item} index={index} />)}
                    </TableBody>
                  </Table>
                  <br />
                  <Typography align="right" variant="body1" className={classes.fontWeight500}>
                    Total:
                    {total}
                  </Typography>
                </div>
                <div>
                  <div className={classes.dFlex}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<Send />}
                      onClick={togglePaymentLinkModal}
                    >
                      Send payment link
                    </Button>
                    <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      onClick={() => setShowPayment(!showPayment)}
                    >
                      {showPayment ? 'To Shop' : 'Buy'}
                    </Button>
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      onClick={toggleShopModal}
                    >
                      Save
                    </Button>
                  </div>

                </div>
              </div>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      <PaymentLink
        open={showPaymentLinkModal}
        setShowPaymentLinkModal={setShowPaymentLinkModal}
        setShowCartModal={setShowCartModal}
      />
    </>
  );
};

export default Order;

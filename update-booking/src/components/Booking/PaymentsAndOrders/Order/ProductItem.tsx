import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { BlueButton } from '../../../buttons';
import { setCart } from '../../../../actions/app';
import { getCart } from '../../../../selectors';
import { validateAddProduct } from '../../../../utils';
import useStyles from '../../../styles';

const ProductItem = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { product } = props;
  const {
    id, name, description, price, price_type: priceType, isEstimate,
  } = product;

  const cart = useSelector((state) => getCart(state));
  const { items } = cart;
  const formattedPrice = price !== '0.00' ? price : ''

  const [productPrice, setPrice] = useState(formattedPrice);
  const [quantity, setQuantity] = useState(1);

  const changeQty = (value) => {
    const val = parseInt(value, 10);

    if (Number.isNaN(val)) {
      setQuantity(null);
    } else {
      if (val < 1) {
        setQuantity(1);
        return;
      }
      if (val) {
        setQuantity(val);
      }
    }
  };

  const changePrice = (value) => {
    const val = Number.parseFloat(value);

    if (Number.isNaN(val)) {
      setPrice('');
    } else {
      setPrice(val);
    }
  };

  const addToCart = () => {
    if (isEstimate) {
      const isEstimateAdded = items.some((item) => item.name === 'Rent (estimated rate)');

      if (isEstimateAdded) {
        alert('You can add Estimate rate only once');
        return;
      }
    }

    if (validateAddProduct({ quantity, productPrice })) {
      const addPrice = priceType === 'variable' ? productPrice : Number(price);
      dispatch(setCart([...items, {
        id, name, qty: quantity, price: addPrice,
      }]));
      setPrice(formattedPrice);
    }
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">{name}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell align="right">
        {priceType === 'fixed'
          ? <span>{productPrice}</span>
          : (
            <TextField
              type="number"
              label="Price"
              variant="outlined"
              InputProps={{ inputProps: { min: 0 } }}
              value={productPrice || ''}
              className={`${classes.numberField} ${classes.width100}`}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => changePrice(e.target.value)}
            />
          )}
      </TableCell>
      <TableCell align="right">
        {isEstimate ? <span>1</span>
          : (
            <TextField
              type="number"
              label="Qty"
              variant="outlined"
              value={quantity || ''}
              className={`${classes.numberField} ${classes.width100}`}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => changeQty(e.target.value)}
            />
          )}
      </TableCell>
      <TableCell align="right">
        <BlueButton variant="contained" onClick={addToCart}>
          Add
        </BlueButton>
      </TableCell>
    </TableRow>
  );
};

export default ProductItem;

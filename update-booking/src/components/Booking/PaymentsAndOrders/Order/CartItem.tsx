import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import { setCart } from '../../../../actions/app';
import { getCart } from '../../../../selectors';

const CartItem = (props) => {
  const dispatch = useDispatch();

  const { item, index } = props;

  const cart = useSelector((state) => getCart(state));

  const deleteProduct = () => {
    if (window.confirm('Do you want delete this product?')) {
      const newCart = cart.items.filter((product, i) => i !== index);
      dispatch(setCart(newCart));
    }
  };

  return (
    <TableRow key={item.id}>
      <TableCell component="th" scope="row">
        {item.name}
      </TableCell>
      <TableCell align="right">{item.qty}</TableCell>
      <TableCell align="right">{item.price}</TableCell>
      <TableCell align="right">{Number(item.qty * item.price).toFixed(2)}</TableCell>
      <TableCell align="right">
        <IconButton
          size="small"
          color="secondary"
          title="Delete"
          onClick={deleteProduct}
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;

import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import useStyles from '../../../styles';

const OrderItems = (props) => {
  const classes = useStyles();

  const { items } = props;

  return (
    items ? (
      <Table padding="checkbox" className={classes.orderItemsTable}>
        <TableBody>
          {items.map((product) => (
            <TableRow>
              <TableCell component="th" scope="row">{product.name}</TableCell>
              <TableCell>
                x
                {product.quantity}
              </TableCell>
              <TableCell>{product.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ) : <p className={classes.textCenter}>Not found order items</p>
  );
};

export default OrderItems;

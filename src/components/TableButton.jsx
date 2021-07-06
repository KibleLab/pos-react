import {makeStyles} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {getOrder} from '../reducers/orderSheet';

const TableButton = (props) => {
  const classes = useStyles(props);
  const table_no = props.table_no;

  const order = useSelector((state) => [...state.orderSheet.order[table_no - 1]]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder(table_no));
  }, [dispatch, table_no]);

  const orderList = order.map((data, index) => (
    <Order key={index} index={index} name={data.menu_name} quantity={data.order_quantity} />
  ));

  return (
    <Container className={classes.root} maxWidth={false} component={Button}>
      <Typography className={classes.tableTitle}>{props.title}</Typography>
      <Container className={classes.orderListC} maxWidth={false}>
        {orderList}
      </Container>
    </Container>
  );
};

const Order = (props) => {
  const classes = useStyles(props);
  return (
    <Container className={classes.order} maxWidth={false}>
      <Typography className={classes.name}>{props.name}</Typography>
      <Typography className={classes.quantity}>×{props.quantity}</Typography>
    </Container>
  );
};

const useStyles = makeStyles({
  root: (props) => ({
    position: 'absolute',
    background: '#ffd1d1',
    width: 410,
    height: 380,
    left: (props.index % 4) * 410 + (props.index % 4) * 40,
    top: Math.floor(props.index / 4) * 380 + Math.floor(props.index / 4) * 40,
    borderRadius: 0,
    textTransform: 'none',
    '&:hover': {backgroundColor: '#ffd1d1'},
  }),
  tableTitle: {
    position: 'absolute',
    fontSize: 24,
    left: 16,
    top: 16,
  },
  orderListC: {
    position: 'absolute',
    width: 410,
    height: 300,
    left: 0,
    bottom: 16,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {width: 5},
    '&::-webkit-scrollbar-thumb': {
      background: '#c7c7c7',
      borderRadius: 10,
    },
  },
  order: (props) => ({
    position: 'absolute',
    left: 0,
    top: props.index * 20 + props.index * 16,
  }),
  name: {
    position: 'absolute',
    left: 32,
    top: 0,
    fontSize: 18,
  },
  quantity: {
    position: 'absolute',
    right: 32,
    top: 0,
    color: 'red',
    fontSize: 18,
  },
});

export default TableButton;

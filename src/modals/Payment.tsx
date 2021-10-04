import { FC, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { RootDispatch, RootState } from '..';
import { PaymentProps } from '../types/modals';
import Modal from 'react-modal';

import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  GET_ORDER_ORDER_SHEET_REQUEST,
  RESET_ORDER_ORDER_SHEET_REQUEST,
} from '../reducers/orderSheet';
import {
  ADD_SALES_DAILY_SALES_REQUEST,
  GET_SALES_DAILY_SALES_REQUEST,
  QUAN_INCR_DAILY_SALES_REQUEST,
} from '../reducers/dailySales';
import { MODAL_OPEN_MODAL_REQUEST } from '../reducers/modal';

Modal.setAppElement('body');

const Payment: FC<PaymentProps> = ({ match }) => {
  const classes = useStyles();
  const { table } = match.params;
  const { order, sales, open, isDone_order, isDone_sales } = useSelector(
    (state: RootState) => ({
      order: [...state.orderSheet.data[Number(table)]],
      sales: [...state.dailySales.data],
      open: [...state.modal.open],
      isDone_order: state.orderSheet.isDone,
      isDone_sales: state.dailySales.isDone,
    }),
    shallowEqual,
  );
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(GET_ORDER_ORDER_SHEET_REQUEST({ table }));
    dispatch(GET_SALES_DAILY_SALES_REQUEST());
  }, [dispatch, table]);

  const close = () => {
    dispatch(MODAL_OPEN_MODAL_REQUEST({ index: 3, open: false }));
  };

  const payCalc = () => {
    if (isDone_order === true && isDone_sales === true) {
      for (let i = 0; i < order.length; i++) {
        const index = sales.findIndex((sales) => sales.menu_name === order[i].menu_name);
        let orderData = order[i];
        let salesData = sales[index];
        index === -1
          ? dispatch(ADD_SALES_DAILY_SALES_REQUEST({ orderData }))
          : dispatch(QUAN_INCR_DAILY_SALES_REQUEST({ orderData, salesData }));
      }
      dispatch(RESET_ORDER_ORDER_SHEET_REQUEST({ table }));
      dispatch(MODAL_OPEN_MODAL_REQUEST({ index: 3, open: false }));
    }
  };

  return (
    <Modal className={classes.root} isOpen={open[3]}>
      <Container className={classes.contents} maxWidth={false}>
        <Typography className={classes.title}>
          IC 카드를 삽입하여 주십시오.
          <br />
          <br />
          마그네틱 카드인 경우
          <br />
          카드리더기에 긁어 주십시오.
          <br />
          <br />
          카드를 삽입하거나 긁은 후
          <br />
          결제 버튼을 눌러주십시오.
        </Typography>
      </Container>
      <Button className={classes.backB} onClick={close}>
        Back
      </Button>
      <Button className={classes.payB} onClick={payCalc} component={Link} to={'/'}>
        결제
      </Button>
    </Modal>
  );
};

const useStyles = makeStyles({
  root: {
    position: 'relative',
    background: 'linear-gradient(to right, #48c6ef 0%, #6f86d6 100%)',
    width: 720,
    height: 900,
    left: 600,
    top: 90,
    borderRadius: 15,
    outline: 'none',
  },
  contents: {
    position: 'absolute',
    background: 'white',
    width: 640,
    height: 610,
    left: 40,
    top: 40,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    width: 640,
    left: 0,
    fontSize: 36,
    textAlign: 'center',
  },
  backB: {
    position: 'absolute',
    background: '#adff00',
    width: 640,
    height: 80,
    left: 40,
    bottom: 145,
    borderRadius: 15,
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': { backgroundColor: '#adff00' },
  },
  payB: {
    position: 'absolute',
    background: `linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)`,
    width: 640,
    height: 80,
    right: 40,
    bottom: 40,
    borderRadius: 15,
    color: 'white',
    fontSize: 38,
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: `linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)`,
    },
  },
});

export default withRouter(Payment);

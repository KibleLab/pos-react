import {makeStyles} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import Payment from '../modals/Payment';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import {Link} from 'react-router-dom';

import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {GET_ORDER_ORDER_SHEET_REQUEST} from '../reducers/orderSheet';
import {MODAL_OPEN} from '../reducers/modal';

const OrderSheet = ({match}) => {
  const classes = useStyles();
  const {table} = match.params;
  const {order} = useSelector(
    (state) => ({order: [...state.orderSheet.data[table - 1]]}),
    shallowEqual
  );
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GET_ORDER_ORDER_SHEET_REQUEST({table}));
  }, [dispatch, table]);

  const totalPrice = () => {
    let total = 0;
    order.forEach((element) => {
      total += element.menu_price * element.order_quantity;
    });
    return total;
  };

  const taxPrice = () => {
    let tax = totalPrice() * (1 / 11);
    return Math.floor(tax);
  };

  const supplyPrice = () => {
    let supplyPrice = totalPrice() - taxPrice();
    return supplyPrice;
  };

  const payment = () => {
    if (Array.isArray(order) && order.length === 0) {
      setMessage('결제할 내역이 없습니다.');
      setOpen(true);
    } else {
      dispatch(MODAL_OPEN({index: 3, open: true}));
    }
  };

  const formatNumber = (number) => {
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const currencyFormatter = (params) => {
    return formatNumber(params.value);
  };

  return (
    <Container className={classes.root} maxWidth={false}>
      <Helmet>
        <title>{table}번 테이블 주문서 - Kible POS System</title>
      </Helmet>
      <Container className={classes.gridC} maxWidth={false}>
        <div
          className="ag-theme-alpine"
          style={{width: '100%', height: '100%', padding: 0, fontSize: 26}}
        >
          <AgGridReact rowData={order} suppressMovableColumns={true}>
            <AgGridColumn
              field={'menu_name'}
              headerName={'상품명'}
              cellStyle={{'font-size': '24px'}}
              flex={2}
            />
            <AgGridColumn
              field={'menu_price'}
              headerName={'단가'}
              cellStyle={{'font-size': '24px'}}
              valueFormatter={currencyFormatter}
              flex={1}
            />
            <AgGridColumn
              field={'order_quantity'}
              headerName={'수량'}
              cellStyle={{'font-size': '24px'}}
              valueFormatter={currencyFormatter}
              flex={1}
            />
          </AgGridReact>
        </div>
      </Container>
      <Container className={classes.payInfo} maxWidth={false}>
        <Container className={classes.payPriceC} maxWidth={false}>
          <Typography className={classes.payTitle}>결제 금액</Typography>
          <Typography className={classes.payPrice}>
            {Number(totalPrice()).toLocaleString()}원
          </Typography>
        </Container>
        <Container className={classes.supplyPriceC} maxWidth={false}>
          <Typography className={classes.supplyTitle}>공급가액</Typography>
          <Typography className={classes.supplyPrice}>
            {Number(supplyPrice()).toLocaleString()}원
          </Typography>
        </Container>
        <Container className={classes.taxPriceC} maxWidth={false}>
          <Typography className={classes.taxTitle}>부가가치세</Typography>
          <Typography className={classes.taxPrice}>
            {Number(taxPrice()).toLocaleString()}원
          </Typography>
        </Container>
      </Container>
      <Button className={classes.backB} component={Link} to={'/'}>
        Back
      </Button>
      <Button className={classes.addMenuB} component={Link} to={'/menu-slct/' + table}>
        메뉴 추가
      </Button>
      <Container className={classes.tableNameC} maxWidth={false}>
        <Typography className={classes.tableName}>{'Table' + table}</Typography>
      </Container>
      <Button className={classes.payment} onClick={() => payment()}>
        결제
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={1500}
        onClose={() => setOpen(false)}
        message={message}
        action={
          <IconButton
            aria-label="close"
            style={{color: 'yellow'}}
            className={classes.close}
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        }
      />
      <Payment />
    </Container>
  );
};

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    background: 'linear-gradient(to right, #48c6ef 0%, #6f86d6 100%)',
    width: 1920,
    height: 1080,
    left: 0,
    top: 0,
    padding: 40,
  },
  gridC: {
    position: 'absolute',
    background: 'white',
    width: 1120,
    height: 896,
    left: 40,
    top: 40,
    padding: 16,
    borderRadius: 24,
  },
  payInfo: {
    position: 'absolute',
    background: '#E5D1FF',
    width: 680,
    height: 896,
    right: 40,
    top: 40,
    padding: 0,
    borderRadius: 24,
  },
  payPriceC: {
    position: 'absolute',
    width: 616,
    height: 60,
    left: 32,
    top: 32,
    padding: 0,
    borderBottom: '4px double black',
    display: 'flex',
    alignItems: 'center',
  },
  payTitle: {
    position: 'absolute',
    left: 0,
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  payPrice: {
    position: 'absolute',
    right: 0,
    color: 'red',
    fontSize: 24,
    textAlign: 'right',
  },
  supplyPriceC: {
    position: 'absolute',
    width: 616,
    height: 40,
    left: 32,
    top: 112,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
  },
  supplyTitle: {
    position: 'absolute',
    left: 16,
    fontSize: 24,
    textAlign: 'left',
  },
  supplyPrice: {
    position: 'absolute',
    right: 0,
    color: 'red',
    fontSize: 24,
    textAlign: 'right',
  },
  taxPriceC: {
    position: 'absolute',
    width: 616,
    height: 40,
    left: 32,
    top: 152,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
  },
  taxTitle: {
    position: 'absolute',
    left: 16,
    fontSize: 24,
    textAlign: 'left',
  },
  taxPrice: {
    position: 'absolute',
    right: 0,
    color: 'red',
    fontSize: 24,
    textAlign: 'right',
  },
  backB: {
    position: 'absolute',
    background: '#adff00',
    width: 312,
    height: 80,
    left: 40,
    bottom: 40,
    borderRadius: 15,
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': {backgroundColor: '#adff00'},
  },
  addMenuB: {
    position: 'absolute',
    background: '#ebff00',
    width: 312,
    height: 80,
    left: 400,
    bottom: 40,
    borderRadius: 15,
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': {backgroundColor: '#ebff00'},
  },
  tableNameC: {
    position: 'absolute',
    background: '#ffd1d1',
    width: 400,
    height: 80,
    left: 760,
    bottom: 40,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
  },
  tableName: {
    position: 'relative',
    width: '100%',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  payment: {
    position: 'absolute',
    background: `linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)`,
    width: 680,
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

export default OrderSheet;

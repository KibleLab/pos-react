import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { RootDispatch, RootState } from '..';

import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import Deadline from '../modals/Deadline';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { GET_SALES_DAILY_SALES_REQUEST } from '../reducers/dailySales';
import { MODAL_OPEN_MODAL_REQUEST } from '../reducers/modal';

const DailySales = () => {
  const classes = useStyles();
  const { sales } = useSelector(
    (state: RootState) => ({ sales: [...state.dailySales.data] }),
    shallowEqual,
  );
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(GET_SALES_DAILY_SALES_REQUEST());
  }, [dispatch]);

  const total = () => {
    let total = 0;
    sales.forEach((element) => {
      total += parseInt(element.total_price);
    });
    return total;
  };

  const deadline = () => {
    if (Array.isArray(sales) && sales.length === 0) {
      setMessage('정산할 내역이 없습니다.');
      setOpen(true);
    } else {
      dispatch(MODAL_OPEN_MODAL_REQUEST({ index: 4, open: true }));
    }
  };

  const formatNumber = (number: number) => {
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const currencyFormatter = (params: { value: number }) => {
    return formatNumber(params.value);
  };

  return (
    <Container className={classes.root} maxWidth={false}>
      <Helmet>
        <title>일 매출 조회 - Kible POS System</title>
      </Helmet>
      <Container className={classes.gridC} maxWidth={false}>
        <div
          className='ag-theme-alpine'
          style={{ width: '100%', height: '100%', padding: 0, fontSize: 26 }}>
          <AgGridReact rowData={sales} suppressMovableColumns={true}>
            <AgGridColumn
              field={'menu_name'}
              headerName={'상품명'}
              cellStyle={{ 'font-size': '24px' }}
              flex={2}
            />
            <AgGridColumn
              field={'sales_quantity'}
              headerName={'판매수량'}
              cellStyle={{ 'font-size': '24px' }}
              valueFormatter={currencyFormatter}
              flex={1}
            />
            <AgGridColumn
              field={'menu_price'}
              headerName={'단가'}
              cellStyle={{ 'font-size': '24px' }}
              valueFormatter={currencyFormatter}
              flex={1}
            />
            <AgGridColumn
              field={'total_price'}
              headerName={'합계'}
              cellStyle={{ 'font-size': '24px' }}
              valueFormatter={currencyFormatter}
              flex={1}
            />
          </AgGridReact>
        </div>
      </Container>
      <Container className={classes.salesC} maxWidth={false}>
        <Typography className={classes.salesTitle}>총 매출액</Typography>
        <Typography className={classes.salesTotal}>{Number(total()).toLocaleString()}원</Typography>
      </Container>
      <Button className={classes.homeB} component={Link} to={'/'}>
        Home
      </Button>
      <Button className={classes.businessDeadLineB} onClick={() => deadline()}>
        영업마감
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
          <IconButton aria-label='close' style={{ color: 'yellow' }} onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        }
      />
      <Deadline />
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
    width: 1840,
    height: 896,
    left: 40,
    top: 40,
    padding: 16,
    borderRadius: 24,
  },
  salesC: {
    position: 'absolute',
    background: '#E5D1FF',
    width: 900,
    height: 80,
    left: 40,
    bottom: 40,
    padding: 0,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
  },
  salesTitle: {
    position: 'absolute',
    left: 32,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  salesTotal: {
    position: 'absolute',
    right: 32,
    color: 'red',
    fontSize: 24,
    textAlign: 'right',
  },
  homeB: {
    position: 'absolute',
    background: '#ebff00',
    width: 430,
    height: 80,
    right: 510,
    bottom: 40,
    borderRadius: 15,
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': { backgroundColor: '#ebff00' },
  },
  businessDeadLineB: {
    position: 'absolute',
    background: `linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)`,
    width: 430,
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

export default DailySales;

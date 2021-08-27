import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { withRouter } from 'react-router-dom';

import AddMenu from '../modals/AddMenu';
import DelMenu from '../modals/DelMenu';
import EditStock from '../modals/EditStock';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { GET_MENU_MENU_MGNT_REQUEST } from '../reducers/menuMgnt';
import { MODAL_OPEN } from '../reducers/modal';
import { SET_SELECT, RESET_SELECT } from '../reducers/select';

const MenuMgnt = ({ history }) => {
  const classes = useStyles();
  const { rows, select } = useSelector(
    (state) => ({
      rows: [...state.menuMgnt.data],
      select: state.select.select,
    }),
    shallowEqual,
  );
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GET_MENU_MENU_MGNT_REQUEST());
  }, [dispatch]);

  const goBack = () => {
    dispatch(RESET_SELECT());
    history.goBack();
  };

  const onClick = (index) => {
    if (Object.keys(select).length === 0) {
      setMessage('상품을 선택해주세요.');
      setOpen(true);
    } else {
      dispatch(MODAL_OPEN({ index: index, open: true }));
    }
  };

  const onRowSelected = (selection) => {
    dispatch(SET_SELECT(selection.data));
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
        <title>메뉴 관리 - Kible POS System</title>
      </Helmet>
      <Container className={classes.gridC} maxWidth={false}>
        <div
          className='ag-theme-alpine'
          style={{ width: '100%', height: '100%', padding: 0, fontSize: 26 }}>
          <AgGridReact
            rowData={rows}
            rowSelection={'single'}
            onRowClicked={onRowSelected}
            suppressMovableColumns={true}>
            <AgGridColumn
              field={'menu_name'}
              headerName={'상품명'}
              cellStyle={{ 'font-size': '24px' }}
              flex={2}
            />
            <AgGridColumn
              field={'menu_price'}
              headerName={'단가'}
              cellStyle={{ 'font-size': '24px' }}
              valueFormatter={currencyFormatter}
              flex={1}
            />
            <AgGridColumn
              field={'menu_stock'}
              headerName={'재고'}
              cellStyle={{ 'font-size': '24px' }}
              valueFormatter={currencyFormatter}
              flex={1}
            />
          </AgGridReact>
        </div>
      </Container>
      <Button
        className={classes.addMenuB}
        onClick={() => dispatch(MODAL_OPEN({ index: 0, open: true }))}>
        새 상품 추가
      </Button>
      <AddMenu />
      <Button className={classes.delMenuB} onClick={() => onClick(1)}>
        기존 상품 제거
      </Button>
      <DelMenu />
      <Button className={classes.editStockB} onClick={() => onClick(2)}>
        재고 수정
      </Button>
      <EditStock />
      <Button className={classes.backB} onClick={goBack}>
        Back
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
            aria-label='close'
            style={{ color: 'yellow' }}
            className={classes.close}
            onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        }
      />
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
  addMenuB: {
    position: 'absolute',
    background: '#ebff00',
    width: 430,
    height: 80,
    left: 40,
    bottom: 40,
    borderRadius: 15,
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': { backgroundColor: '#ebff00' },
  },
  delMenuB: {
    position: 'absolute',
    background: '#ebff00',
    width: 430,
    height: 80,
    left: 510,
    bottom: 40,
    borderRadius: 15,
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': { backgroundColor: '#ebff00' },
  },
  editStockB: {
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
  backB: {
    position: 'absolute',
    background: '#adff00',
    width: 430,
    height: 80,
    right: 40,
    bottom: 40,
    borderRadius: 15,
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': { backgroundColor: '#adff00' },
  },
});

export default withRouter(MenuMgnt);

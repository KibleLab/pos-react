import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { RootDispatch, RootState } from '..';
import { ContainerProps, MenuData, WishData } from '../types/containers';
import MenuButton from '../components/MenuButton';
import WishButton from '../components/WishButton';

import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { CHANGE_MENU_MENU_MGNT_REQUEST } from '../reducers/menuMgnt';
import {
  GET_MENU_MENU_SLCT_REQUEST,
  STOCK_DECR_MENU_SLCT_REQUEST,
  STOCK_INCR_MENU_SLCT_REQUEST,
  STOCK_REST_MENU_SLCT_REQUEST,
} from '../reducers/menuSlct';
import {
  GET_WISH_WISH_LIST_REQUEST,
  ADD_WISH_WISH_LIST_REQUEST,
  DELETE_WISH_WISH_LIST_REQUEST,
  RESET_WISH_WISH_LIST_REQUEST,
  QUAN_INCR_WISH_LIST_REQUEST,
  QUAN_DECR_WISH_LIST_REQUEST,
} from '../reducers/wishList';
import {
  ADD_ORDER_ORDER_SHEET_REQUEST,
  GET_ORDER_ORDER_SHEET_REQUEST,
  QUAN_INCR_ORDER_SHEET_REQUEST,
} from '../reducers/orderSheet';

const MenuSlct: FC<ContainerProps> = ({ match }) => {
  const classes = useStyles();
  const { table } = match.params;
  const { menu, wish, order } = useSelector(
    (state: RootState) => ({
      menu: [...state.menuSlct.data],
      wish: [...state.wishList.data[Number(table)]],
      order: [...state.orderSheet.data[Number(table)]],
    }),
    shallowEqual,
  );
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(GET_MENU_MENU_SLCT_REQUEST());
    dispatch(GET_WISH_WISH_LIST_REQUEST({ table }));
    dispatch(GET_ORDER_ORDER_SHEET_REQUEST({ table }));
  }, [dispatch, table]);

  const addWish = (menuData: MenuData) => {
    const index = wish.findIndex((wish) => wish.menu_name === menuData.menu_name);
    if (index === -1) {
      dispatch(ADD_WISH_WISH_LIST_REQUEST({ table, menuData }));
      dispatch(STOCK_DECR_MENU_SLCT_REQUEST({ menuData }));
    } else {
      if (menuData.menu_stock > 0) {
        dispatch(QUAN_INCR_WISH_LIST_REQUEST({ table, wishData: wish[index] }));
        dispatch(STOCK_DECR_MENU_SLCT_REQUEST({ menuData }));
      } else {
        setMessage('재고가 없습니다.');
        setOpen(true);
      }
    }

    dispatch(GET_MENU_MENU_SLCT_REQUEST());
    dispatch(GET_WISH_WISH_LIST_REQUEST({ table }));
  };

  const addOrder = () => {
    if (wish.length > 0) {
      if (order.length > 0) {
        for (let i = 0; i < wish.length; i++) {
          const index = order.findIndex((order) => order.menu_name === wish[i].menu_name);
          let wishData = wish[i];
          let orderData = order[index];
          index === -1
            ? dispatch(ADD_ORDER_ORDER_SHEET_REQUEST({ table, wishData }))
            : dispatch(QUAN_INCR_ORDER_SHEET_REQUEST({ table, wishData, orderData }));
        }
      } else {
        for (let i = 0; i < wish.length; i++) {
          dispatch(ADD_ORDER_ORDER_SHEET_REQUEST({ table, wishData: wish[i] }));
        }
      }
      for (let i = 0; i < menu.length; i++) {
        dispatch(CHANGE_MENU_MENU_MGNT_REQUEST({ menuData: menu[i] }));
      }
      dispatch(RESET_WISH_WISH_LIST_REQUEST({ table }));
    } else {
      setMessage('주문할 상품이 없습니다.');
      setOpen(true);
    }
  };

  const delWish = (wishData: WishData) => {
    const index = menu.findIndex((menu) => menu.menu_name === wishData.menu_name);
    let menuData = menu[index];
    if (menuData.menu_stock === 0) menuData = { menu_name: wishData.menu_name, menu_stock: 0 };
    dispatch(STOCK_REST_MENU_SLCT_REQUEST({ menuData, wishData }));
    dispatch(DELETE_WISH_WISH_LIST_REQUEST({ table, wishData }));
    setMessage(wishData.menu_name + '이/가 찜목록에서 삭제됨.');
    setOpen(true);
    dispatch(GET_MENU_MENU_SLCT_REQUEST());
    dispatch(GET_WISH_WISH_LIST_REQUEST({ table }));
  };

  const resetWish = () => {
    for (let i = 0; i < wish.length; i++) {
      const index = menu.findIndex((menu) => menu.menu_name === wish[i].menu_name);
      let menuData = menu[index];
      let wishData = wish[i];
      if (menuData.menu_stock === 0) menuData = { menu_name: wish[i].menu_name, menu_stock: 0 };
      dispatch(STOCK_REST_MENU_SLCT_REQUEST({ menuData, wishData }));
    }
    dispatch(RESET_WISH_WISH_LIST_REQUEST({ table }));
  };

  const plus = (wishData: WishData) => {
    const index = menu.findIndex((menu) => menu.menu_name === wishData.menu_name);
    let menuData = menu[index];
    if (menuData.menu_stock === 0) {
      setMessage('재고가 없습니다.');
      setOpen(true);
    } else {
      dispatch(QUAN_INCR_WISH_LIST_REQUEST({ table, wishData }));
      dispatch(STOCK_DECR_MENU_SLCT_REQUEST({ menuData }));
    }

    dispatch(GET_MENU_MENU_SLCT_REQUEST());
    dispatch(GET_WISH_WISH_LIST_REQUEST({ table }));
  };

  const minus = (wishData: WishData) => {
    const index = menu.findIndex((menu) => menu.menu_name === wishData.menu_name);
    let menuData = menu[index];
    if (wishData.wish_quantity > 1) {
      if (menuData.menu_stock === 0) menuData = { menu_name: wishData.menu_name, menu_stock: 0 };
      dispatch(QUAN_DECR_WISH_LIST_REQUEST({ table, wishData }));
      dispatch(STOCK_INCR_MENU_SLCT_REQUEST({ menuData }));
    } else {
      dispatch(STOCK_REST_MENU_SLCT_REQUEST({ menuData, wishData }));
      dispatch(DELETE_WISH_WISH_LIST_REQUEST({ table, wishData }));
      setMessage(wishData.menu_name + '이/가 찜목록에서 삭제됨.');
      setOpen(true);
    }

    dispatch(GET_MENU_MENU_SLCT_REQUEST());
    dispatch(GET_WISH_WISH_LIST_REQUEST({ table }));
  };

  window.onpopstate = () => {
    resetWish();
  };

  const menuButtonList = (): any => {
      return menu.map((data, index) => (
        <MenuButton
          onClick={() => addWish(data)}
          key={index}
          index={index}
          name={data.menu_name}
          price={data.menu_price}
          stock={data.menu_stock}
        />
      ));
  };

  const WishButtonList = (): any => {
      return wish.map((data, index) => (
        <WishButton
          key={index}
          index={index}
          name={data.menu_name}
          price={data.menu_price}
          quantity={data.wish_quantity}
          delete={() => delWish(data)}
          plus={() => plus(data)}
          minus={() => minus(data)}
        />
      ));
  };

  return (
    <Container className={classes.root} maxWidth={false}>
      <Helmet>
        <title>메뉴 선택 - Kible POS System</title>
      </Helmet>
      <Container className={classes.menuC} maxWidth={false}>
        <Container className={classes.menuList} maxWidth={false}>
          {menuButtonList()}
        </Container>
      </Container>
      <Container className={classes.wishC} maxWidth={false}>
        <Container className={classes.wishList} maxWidth={false}>
          {WishButtonList()}
        </Container>
      </Container>
      <Button
        className={classes.backB}
        onClick={() => resetWish()}
        component={Link}
        to={'/ordersheet/' + table}>
        Back
      </Button>
      <Button
        className={classes.menuManageB}
        onClick={() => resetWish()}
        component={Link}
        to={'/menu-mgnt'}>
        메뉴 관리
      </Button>
      <Container className={classes.tableNameC} maxWidth={false}>
        <Typography className={classes.tableName}>{'Table' + table}</Typography>
      </Container>
      <Button
        className={classes.addOrderB}
        onClick={() => addOrder()}
        component={Link}
        to={'/ordersheet/' + table}>
        주문서에 추가
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
  menuC: {
    position: 'absolute',
    background: 'white',
    width: 1120,
    height: 896,
    left: 40,
    top: 40,
    borderRadius: 24,
  },
  menuList: {
    position: 'absolute',
    background: 'white',
    width: 1098,
    height: 864,
    left: 16,
    top: 16,
    padding: 0,
    overflowY: 'auto',
    '&::-webkit-scrollbar': { width: 5 },
    '&::-webkit-scrollbar-thumb': {
      background: '#c7c7c7',
      borderRadius: 10,
    },
  },
  wishC: {
    position: 'absolute',
    background: 'white',
    width: 680,
    height: 896,
    right: 40,
    top: 40,
    padding: 0,
    borderRadius: 24,
  },
  wishList: {
    position: 'absolute',
    background: 'white',
    width: 658,
    height: 864,
    right: 6,
    top: 16,
    padding: 0,
    overflowY: 'auto',
    '&::-webkit-scrollbar': { width: 5 },
    '&::-webkit-scrollbar-thumb': {
      background: '#c7c7c7',
      borderRadius: 10,
    },
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
    '&:hover': { backgroundColor: '#adff00' },
  },
  menuManageB: {
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
    '&:hover': { backgroundColor: '#ebff00' },
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
  addOrderB: {
    position: 'absolute',
    background: `linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)`,
    width: 680,
    height: 80,
    right: 40,
    bottom: 40,
    borderRadius: 15,
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: `linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)`,
    },
  },
});

export default MenuSlct;

import {makeStyles} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import {useState, useEffect} from 'react';
import MenuButton from '../components/MenuButton';
import WishButton from '../components/WishButton';
import {Link} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';

import {changeMenu} from '../reducers/menuMgnt';
import {addOrder, quanIncrOrder} from '../reducers/orderSheet';
import {getMenu, stockDecr, stockIncr, stockRest} from '../reducers/menuSlct';
import {addWish, delWish, getWish, quanDecr, quanIncr, resetWish} from '../reducers/wishList';

const MenuSlct = ({match, history}) => {
  const classes = useStyles();
  const {table} = match.params;
  const menu = useSelector((state) => [...state.menuSlct.menu]);
  const wish = useSelector((state) => [...state.wishList.wish[table - 1]]);
  const order = useSelector((state) => [...state.orderSheet.order[table - 1]]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenu());
    dispatch(getWish(table));
  }, [dispatch, table]);

  const _addWish = (menuData) => {
    if (wish.length <= 0) {
      dispatch(addWish({table, menuData}));
      dispatch(stockDecr({menuData}));
    } else if (wish.length > 0) {
      const index = wish.findIndex((wish) => wish.menu_name === menuData.menu_name);
      if (index === -1) {
        dispatch(addWish({table, menuData}));
        dispatch(stockDecr({menuData}));
      } else {
        if (menuData.menu_stock < 1) {
          setMessage('재고가 없습니다.');
          setOpen(true);
        } else {
          dispatch(quanIncr({table, wishData: wish[index]}));
          dispatch(stockDecr({menuData}));
        }
      }
    }
    dispatch(getMenu());
  };

  const _addOrder = () => {
    if (Array.isArray(wish) && wish.length === 0) {
      setMessage('주문할 상품이 없습니다.');
      setOpen(true);
    } else {
      for (let i = 0; i < menu.length; i++) {
        setTimeout(() => {
          dispatch(changeMenu({menuData: menu[i]}));
        }, 500);
      }
      if (order.length === 0) {
        for (let i = 0; i < wish.length; i++) {
          setTimeout(() => {
            dispatch(addOrder({table, wishData: wish[i]}));
          }, 500);
        }
      } else if (order.length > 0) {
        for (let i = 0; i < wish.length; i++) {
          const index = order.findIndex((order) => order.menu_name === wish[i].menu_name);
          if (index === -1) {
            setTimeout(() => {
              dispatch(addOrder({table, wishData: wish[i]}));
            }, 500);
          } else {
            setTimeout(() => {
              dispatch(quanIncrOrder({table, wishData: wish[i], orderData: order[index]}));
            }, 500);
          }
        }
      }
      dispatch(resetWish(table));
      history.push('/ordersheet/' + table);
    }
  };

  const _delWish = (wishData) => {
    const index = menu.findIndex((menu) => menu.menu_name === wishData.menu_name);
    let menuData = menu[index];
    if (menu[index] === undefined) {
      menuData = {menu_name: wishData.menu_name, menu_stock: 0};
    }
    dispatch(stockRest({menuData, wishData}));
    dispatch(delWish({table, wishData}));
    setMessage(wishData.menu_name + '이/가 찜목록에서 삭제됨.');
    setOpen(true);
  };

  const _resetWish = () => {
    for (let i = 0; i < wish.length; i++) {
      const index = menu.findIndex((menu) => menu.menu_name === wish[i].menu_name);
      let menuData = menu[index];
      if (menu[index] === undefined) {
        menuData = {menu_name: wish[i].menu_name, menu_stock: 0};
      }
      dispatch(stockRest({menuData, wishData: wish[i]}));
    }
    dispatch(resetWish(table));
  };

  const plus = (wishData) => {
    const index = menu.findIndex((menu) => menu.menu_name === wishData.menu_name);
    console.log(menu[index]);
    if (menu[index] === undefined) {
      setMessage('재고가 없습니다.');
      setOpen(true);
    } else {
      dispatch(quanIncr({table, wishData}));
      dispatch(stockDecr({menuData: menu[index]}));
    }
  };

  const minus = (wishData) => {
    const index = menu.findIndex((menu) => menu.menu_name === wishData.menu_name);
    let menuData = menu[index];
    if (wishData.wish_quantity < 2) {
      dispatch(stockIncr({menuData}));
      dispatch(delWish({table, wishData}));
      setMessage(wishData.menu_name + '이/가 찜목록에서 삭제됨.');
      setOpen(true);
    } else {
      if (menu[index] === undefined) {
        menuData = {menu_name: wishData.menu_name, menu_stock: 0};
      }
      dispatch(quanDecr({table, wishData}));
      dispatch(stockIncr({menuData}));
    }
  };

  window.onpopstate = () => {
    _resetWish();
  };

  const menuButtonList = menu.map((data, index) => (
    <MenuButton
      onClick={() => _addWish(data)}
      key={index}
      index={index}
      name={data.menu_name}
      price={data.menu_price}
      stock={data.menu_stock}
    />
  ));

  const WishButtonList = wish.map((data, index) => (
    <WishButton
      key={index}
      index={index}
      name={data.menu_name}
      price={data.menu_price}
      quantity={data.wish_quantity}
      delete={() => _delWish(data)}
      plus={() => plus(data, index)}
      minus={() => minus(data, index)}
    />
  ));

  return (
    <Container className={classes.root} maxWidth={false}>
      <Container className={classes.menuC} maxWidth={false}>
        <Container className={classes.menuList} maxWidth={false}>
          {menuButtonList}
        </Container>
      </Container>

      <Container className={classes.wishC} maxWidth={false}>
        <Container className={classes.wishList} maxWidth={false}>
          {WishButtonList}
        </Container>
      </Container>

      <Button
        className={classes.backB}
        onClick={() => _resetWish()}
        component={Link}
        to={'/ordersheet/' + table}
      >
        Back
      </Button>

      <Button
        className={classes.menuManageB}
        onClick={() => _resetWish()}
        component={Link}
        to={'/menu-mgnt'}
      >
        메뉴 관리
      </Button>

      <Container className={classes.tableNameC} maxWidth={false}>
        <Typography className={classes.tableName}>{'Table' + table}</Typography>
      </Container>

      <Button className={classes.addOrderB} onClick={() => _addOrder()}>
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
    '&::-webkit-scrollbar': {width: 5},
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
    '&::-webkit-scrollbar': {width: 5},
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
    '&:hover': {backgroundColor: '#adff00'},
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

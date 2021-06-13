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
import {
  addWish,
  delWish,
  getMenu,
  quanIncr,
  quanDecr,
  stockIncr,
  stockDecr,
  stockRest,
  resetWish,
} from '../reducers/menuSelect';
import {changeMenu} from '../reducers/menuManagement';
import {addOS, quanIncrOS} from '../reducers/orderSheet';

const MenuSelect = ({match, history}) => {
  const classes = useStyles();
  const {table_no} = match.params;
  const menu = useSelector((state) => [...state.menuSelect.menu]);
  const wish = useSelector((state) => [...state.menuSelect.wish]);
  const order = useSelector((state) => [...state.orderSheet.order[table_no - 1]]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenu(table_no));
  }, [dispatch, table_no]);

  const sendWish = (data) => {
    if (wish.length <= 0) {
      dispatch(addWish(data));
      dispatch(stockDecr(data));
    } else if (wish.length > 0) {
      const index = wish.findIndex((wish) => wish.menu_no === data.menu_no);
      if (index === -1) {
        dispatch(addWish(data));
        dispatch(stockDecr(data));
      } else {
        if (data.menu_stock < 1) {
          setMessage('재고가 없습니다.');
          setOpen(true);
        } else {
          dispatch(quanIncr(index));
          dispatch(stockDecr(data));
        }
      }
    }
  };

  const sendOrderSheet = () => {
    if (Array.isArray(wish) && wish.length === 0) {
      setMessage('주문할 상품이 없습니다.');
      setOpen(true);
    } else {
      for (let i = 0; i < menu.length; i++) {
        setTimeout(() => {
          const data = {menu_no: menu[i].menu_no, menu_stock: menu[i].menu_stock};
          dispatch(changeMenu(data));
        }, 500);
      }
      if (order.length === 0) {
        for (let i = 0; i < wish.length; i++) {
          setTimeout(() => {
            dispatch(addOS({table_no: table_no, data: wish[i]}));
          }, 500);
        }
      } else if (order.length > 0) {
        for (let i = 0; i < wish.length; i++) {
          const index = order.findIndex((order) => order.menu_no === wish[i].menu_no);
          if (index === -1) {
            setTimeout(() => {
              dispatch(addOS({table_no: table_no, data: wish[i]}));
            }, 500);
          } else {
            setTimeout(() => {
              const data = {
                menu_no: wish[i].menu_no,
                order_quantity: order[index].order_quantity + wish[i].order_quantity,
              };
              dispatch(quanIncrOS({table_no: table_no, data: data}));
            }, 500);
          }
        }
      }
      dispatch(resetWish());
      history.push('/OrderSheet/' + table_no);
    }
  };

  const plus = (data, index) => {
    const menuIdx = menu.findIndex((menu) => menu.menu_no === data.menu_no);
    if (menu[menuIdx].menu_stock < 1) {
      setMessage('재고가 없습니다.');
      setOpen(true);
    } else {
      dispatch(quanIncr(index));
      dispatch(stockDecr(data));
    }
  };

  const minus = (data, index) => {
    if (data.order_quantity < 2) {
      dispatch(stockIncr(data));
      dispatch(delWish(data));
      setMessage(data.menu_name + '이/가 찜목록에서 삭제됨.');
      setOpen(true);
    } else {
      dispatch(quanDecr(index));
      dispatch(stockIncr(data));
    }
  };

  const rmWish = (data) => {
    dispatch(stockRest(data));
    dispatch(delWish(data));
    setMessage(data.menu_name + '이/가 찜목록에서 삭제됨.');
    setOpen(true);
  };

  const menuButtonList = menu.map((data, index) => (
    <MenuButton
      onClick={() => sendWish(data)}
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
      quantity={data.order_quantity}
      delete={() => rmWish(data)}
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
        onClick={() => dispatch(resetWish())}
        component={Link}
        to={'/OrderSheet/' + table_no}
      >
        Back
      </Button>

      <Button
        className={classes.menuManageB}
        onClick={() => dispatch(resetWish())}
        component={Link}
        to={'/MenuManagement'}
      >
        메뉴 관리
      </Button>

      <Container className={classes.tableNameC} maxWidth={false}>
        <Typography className={classes.tableName}>{'Table' + table_no}</Typography>
      </Container>

      <Button className={classes.addOSB} onClick={() => sendOrderSheet()}>
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
  addOSB: {
    position: 'absolute',
    background:
      'linear-gradient(90deg, rgba(254, 107, 139, 0.3) 0%, rgba(255, 142, 83, 0.9) 100%), #FF006B',
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
      backgroundColor:
        'linear-gradient(90deg, rgba(254, 107, 139, 0.3) 0%, rgba(255, 142, 83, 0.9) 100%), #FF006B',
    },
  },
});

export default MenuSelect;

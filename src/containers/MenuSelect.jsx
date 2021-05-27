/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import Plate from '../components/Plate';
import Button from '../components/Button';
import MenuButton from '../components/MenuButton';
import OrderMenuButton from '../components/OrderMenuButton';
import {Link} from 'react-router-dom';

import Alert from '../modals/Alert';

import {useSelector, useDispatch} from 'react-redux';
import {
  addOrder,
  delOrder,
  getMenu,
  quanIncr,
  resetOrder,
  stockDecr,
  stockRest,
} from '../reducers/menuSelect';
import {changeMenu} from '../reducers/menuManagement';
import {addOS, quanIncrOS} from '../reducers/orderSheet';
import {modalOpen} from '../reducers/modal';

const backStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '1920px',
  height: '1080px',
  background: 'linear-gradient(to right, #48c6ef 0%, #6f86d6 100%)',
};

const style = {
  table_name: {
    textAlign: 'center',
    marginTop: 18,
    fontWeight: 'bold',
    fontSize: 36,
  },
};

const MenuSelect = ({match, history}) => {
  const {table_no} = match.params;
  const menu = useSelector((state) => [...state.menuSelect.menu]);
  const order = useSelector((state) => [...state.menuSelect.order]);
  const orderSheet = useSelector((state) => [...state.orderSheet.order[table_no - 1]]);
  const [text, setText] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenu(table_no));
  }, []);

  const sendOrder = (data) => {
    if (data.menu_stock > 0) {
      dispatch(stockDecr(data));
      if (order.length === 0) {
        dispatch(addOrder(data));
      } else if (order.length > 0) {
        const index = order.findIndex((order) => order.menu_no === data.menu_no);
        if (index === -1) {
          dispatch(addOrder(data));
        } else {
          dispatch(quanIncr(index));
        }
      }
    } else {
      setText('재고가 없습니다.');
      dispatch(modalOpen({index: 5, open: true}));
    }
  };

  const rmOrder = (data) => {
    dispatch(stockRest(data));
    dispatch(delOrder(data));
  };

  const sendOrderSheet = () => {
    if (Array.isArray(order) && order.length === 0) {
      setText('선택된 상품이 없습니다.');
      dispatch(modalOpen({index: 5, open: true}));
    } else {
      for (let i = 0; i < menu.length; i++) {
        setTimeout(() => {
          const data = {menu_no: menu[i].menu_no, menu_stock: menu[i].menu_stock};
          dispatch(changeMenu(data));
        }, 500);
      }
      if (orderSheet.length === 0) {
        for (let i = 0; i < order.length; i++) {
          setTimeout(() => {
            dispatch(addOS({table_no: table_no, data: order[i]}));
          }, 500);
        }
      } else if (orderSheet.length > 0) {
        for (let i = 0; i < order.length; i++) {
          const index = orderSheet.findIndex(
            (orderSheet) => orderSheet.menu_no === order[i].menu_no
          );
          if (index === -1) {
            setTimeout(() => {
              dispatch(addOS({table_no: table_no, data: order[i]}));
            }, 500);
          } else {
            setTimeout(() => {
              const data = {
                menu_no: order[i].menu_no,
                order_quantity: orderSheet[index].order_quantity + order[i].order_quantity,
              };
              dispatch(quanIncrOS({table_no: table_no, data: data}));
            }, 500);
          }
        }
      }
      dispatch(resetOrder());
      history.goBack();
    }
  };

  let top = 22;
  let left = 23;
  const menuButtonList = menu.map((data, index) => (
    <MenuButton
      onClick={() => sendOrder(data)}
      key={index}
      name={data.menu_name}
      price={data.menu_price}
      stock={data.menu_stock}
      left={left + 279 * (index % 4)}
      top={top + 176 * Math.floor(index / 4)}
    />
  ));

  const orderMenuButtonList = order.map((data, index) => (
    <OrderMenuButton
      onClick={() => rmOrder(data)}
      key={index}
      name={data.menu_name}
      price={data.menu_price}
      quantity={data.order_quantity}
      top={index * 154}
    />
  ));

  const goBack = () => {
    dispatch(resetOrder());
    history.goBack();
  };

  return (
    <div style={backStyle}>
      <Plate color={'#FFFFFF'} width={1146} height={903} left={48} top={48}>
        {menuButtonList}
      </Plate>
      <Plate color={'#FFFFFF'} width={651} height={903} left={1229} top={48}>
        <Plate color={'#FFFFFF'} width={620} height={859} left={23} top={22}>
          {orderMenuButtonList}
        </Plate>
      </Plate>
      <Button
        onClick={goBack}
        backColor={'#adff00'}
        radius={25}
        width={312}
        height={90}
        lineHeight={2.4}
        left={47}
        top={968}
        text={'Back'}
      />
      <Link to={'/MenuManagement'}>
        <Button
          onClick={() => dispatch(resetOrder())}
          backColor={'#ebff00'}
          radius={25}
          width={312}
          height={90}
          lineHeight={2.4}
          left={396}
          top={968}
          text={'메뉴 관리'}
        />
      </Link>
      <Plate color={'#ffd1d1'} width={450} height={88} left={745} top={969} radius={10}>
        <div style={style.table_name}>{'Table' + table_no}</div>
      </Plate>
      <Button
        onClick={() => sendOrderSheet()}
        backColor={'#ff006b'}
        fontColor={'white'}
        fontSize={48}
        radius={25}
        width={651}
        height={90}
        lineHeight={1.8}
        left={1229}
        top={968}
        text={'주문서에 추가'}
      />
      <Alert text={text} />
    </div>
  );
};

export default MenuSelect;

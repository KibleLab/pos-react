import './stylesheets/TableButton.css';
import {useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import {getOS} from '../reducers/orderSheet';

const TableButton = (props) => {
  const table_no = props.table_no;

  const order = useSelector((state) => [...state.orderSheet.order[table_no - 1]]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOS(table_no));
  }, [dispatch, table_no]);

  const orderList = order.map((data, index) => (
    <Order key={index} name={data.menu_name} quantity={data.order_quantity} top={index * 33} />
  ));

  return (
    <div
      table_no={props.table_no}
      className={'TableButton'}
      onClick={props.onClick}
      style={{
        marginLeft: props.left,
        marginTop: props.top,
      }}
    >
      {props.text}
      <div
        className={'order'}
        style={{
          overflowY: 'scroll',
        }}
      >
        {orderList}
      </div>
    </div>
  );
};

const Order = (props) => {
  const style = {
    root: {
      position: 'absolute',
      width: 352,
      height: 33,
      marginLeft: props.left,
      marginTop: props.top,
    },
    name: {
      position: 'absolute',
      left: 9,
      top: 6,
      fontSize: 18,
      display: 'flex',
      alignItems: 'center',
      textAlign: 'left',
    },
    quantity: {
      position: 'absolute',
      right: 9,
      top: 6,
      fontSize: 18,
      display: 'flex',
      alignItems: 'center',
      textAlign: 'right',
      color: '#ff0000',
    },
  };

  return (
    <div style={style.root}>
      <div style={style.name}>{props.name}</div>
      <div style={style.quantity}>×{props.quantity}</div>
    </div>
  );
};

export default TableButton;

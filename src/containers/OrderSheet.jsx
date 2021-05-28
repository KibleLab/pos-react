import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import {useState, useEffect} from 'react';
import Frame from '../components/Frame';
import Button from '../components/Button';
import Payment from '../modals/Payment';
import Alert from '../modals/Alert';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import {Link} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';
import {modalOpen} from '../reducers/modal';
import {getOS} from '../reducers/orderSheet';

const backStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '1920px',
  height: '1080px',
  background: 'linear-gradient(to right, #48c6ef 0%, #6f86d6 100%)',
};

const style = {
  payText: {
    position: 'absolute',
    width: 234,
    height: 61,
    marginLeft: 27,
    marginTop: 40,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 48,
    lineHeight: '56px',
    textAlign: 'center',
    color: 'black',
  },
  bar: {
    width: 575,
    marginTop: 105,
    borderTop: 'double',
  },
  calc: {
    position: 'absolute',
    height: 28,
    right: 39,
    marginTop: 63,
    fontStyle: 'normal',
    fontSize: 24,
    textAlign: 'right',
    color: 'red',
  },
  supplyPrice: {
    position: 'absolute',
    width: 100,
    height: 30,
    marginLeft: 50,
    marginTop: 35,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 24,
    lineHeight: '28px',
    color: 'black',
  },
  supplyCalc: {
    position: 'absolute',
    height: 30,
    right: 45,
    marginTop: 35,
    fontStyle: 'normal',
    fontSize: 18,
    textAlign: 'right',
    color: 'red',
  },
  taxPrice: {
    position: 'absolute',
    width: 120,
    height: 30,
    marginLeft: 50,
    marginTop: 85,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 24,
    lineHeight: '28px',
    color: 'black',
  },
  taxCalc: {
    position: 'absolute',
    height: 30,
    right: 45,
    marginTop: 85,
    fontStyle: 'normal',
    fontSize: 18,
    textAlign: 'right',
    color: 'red',
  },
  dataGrid: {
    width: '96.5%',
    height: '95%',
    margin: 20,
  },
  table_name: {
    textAlign: 'center',
    marginTop: 18,
    fontWeight: 'bold',
    fontSize: 36,
  },
};

const OrderSheet = ({match}) => {
  const {table_no} = match.params;
  const order = useSelector((state) => [...state.orderSheet.order[table_no - 1]]);
  const [text, setText] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOS(table_no));
  }, [dispatch, table_no]);

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
      setText('결제할 내역이 없습니다.');
      dispatch(modalOpen({index: 5, open: true}));
    } else {
      dispatch(modalOpen({index: 3, open: true}));
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
    <div style={backStyle}>
      <Frame color={'#FFFFFF'} width={1146} height={903} left={48} top={48} radius={25}>
        <div className="ag-theme-alpine" style={style.dataGrid}>
          <AgGridReact rowData={order} suppressMovableColumns={true}>
            <AgGridColumn field={'order_no'} headerName={'No.'} width={150} />
            <AgGridColumn field={'menu_name'} headerName={'상품명'} width={500} />
            <AgGridColumn
              field={'menu_price'}
              headerName={'단가'}
              cellStyle={{textAlign: 'right'}}
              valueFormatter={currencyFormatter}
              width={200}
            />
            <AgGridColumn
              field={'order_quantity'}
              headerName={'수량'}
              cellStyle={{textAlign: 'right'}}
              valueFormatter={currencyFormatter}
              width={200}
            />
          </AgGridReact>
        </div>
      </Frame>
      <Frame color={'#E5D1FF'} width={651} height={903} left={1229} top={48} radius={25}>
        <p style={style.payText}>결제 금액</p>
        <div style={style.calc}>{Number(totalPrice()).toLocaleString()}원</div>
        <hr style={style.bar} />
        <p style={style.supplyPrice}>공급가액</p>
        <div style={style.supplyCalc}>{Number(supplyPrice()).toLocaleString()}원</div>
        <p style={style.taxPrice}>부가가치세</p>
        <div style={style.taxCalc}>{Number(taxPrice()).toLocaleString()}원</div>
      </Frame>
      <Link to={'/'}>
        <Button
          backColor={'#ebff00'}
          radius={25}
          width={312}
          height={90}
          lineHeight={2.4}
          left={47}
          top={968}
          text={'HOME'}
        />
      </Link>
      <Link to={'/MenuSelect/' + table_no}>
        <Button
          backColor={'#ebff00'}
          radius={25}
          width={312}
          height={90}
          lineHeight={2.4}
          left={396}
          top={968}
          text={'상품추가'}
        />
      </Link>
      <Frame color={'#ffd1d1'} width={450} height={88} left={745} top={969} radius={10}>
        <div style={style.table_name}>{'Table' + table_no}</div>
      </Frame>
      <Button
        onClick={() => payment()}
        backColor={'#ff006b'}
        fontColor={'white'}
        fontSize={48}
        radius={25}
        width={651}
        height={90}
        lineHeight={1.8}
        left={1229}
        top={968}
        text={'결제'}
      />
      <Alert text={text} />
      <Payment />
    </div>
  );
};

export default OrderSheet;

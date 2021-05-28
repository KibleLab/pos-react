import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import {useState, useEffect} from 'react';
import Frame from '../components/Frame';
import Button from '../components/Button';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import {Link} from 'react-router-dom';

import BusinessDeadline from '../modals/BusinessDeadline';
import Alert from '../modals/Alert';

import {useSelector, useDispatch} from 'react-redux';
import {modalOpen} from '../reducers/modal';
import {getDailySales} from '../reducers/dailySales';

const backStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '1920px',
  height: '1080px',
  background: 'linear-gradient(to right, #48c6ef 0%, #6f86d6 100%)',
};

const style = {
  p: {
    position: 'absolute',
    marginLeft: 35,
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 36,
    color: '#000000',
  },
  won: {
    position: 'absolute',
    right: 31,
    marginTop: 29,
    fontSize: 24,
    color: '#FF0000',
  },
  dataGrid: {
    width: '98%',
    height: '95%',
    margin: 20,
  },
};

const DailySalesStatus = () => {
  const dailySales = useSelector((state) => [...state.dailySales.dailySales]);
  const [text, setText] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDailySales());
  }, [dispatch]);

  const total = () => {
    let total = 0;
    dailySales.forEach((element) => {
      total += element.total_price;
    });
    return total;
  };

  const deadline = () => {
    if (Array.isArray(dailySales) && dailySales.length === 0) {
      setText('정산할 내역이 없습니다.');
      dispatch(modalOpen({index: 5, open: true}));
    } else {
      dispatch(modalOpen({index: 4, open: true}));
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
      <Frame color={'#FFFFFF'} width={1824} height={882} left={48} top={48} radius={25}>
        <div className="ag-theme-alpine" style={style.dataGrid}>
          <AgGridReact rowData={dailySales} suppressMovableColumns={true}>
            <AgGridColumn field={'sales_no'} headerName={'No.'} width={150} />
            <AgGridColumn field={'menu_name'} headerName={'상품명'} width={550} />
            <AgGridColumn
              field={'sales_quantity'}
              headerName={'판매수량'}
              cellStyle={{textAlign: 'right'}}
              valueFormatter={currencyFormatter}
              width={200}
            />
            <AgGridColumn
              field={'menu_price'}
              headerName={'단가'}
              cellStyle={{textAlign: 'right'}}
              valueFormatter={currencyFormatter}
              width={200}
            />
            <AgGridColumn
              field={'total_price'}
              headerName={'합계'}
              cellStyle={{textAlign: 'right'}}
              valueFormatter={currencyFormatter}
              width={200}
            />
          </AgGridReact>
        </div>
      </Frame>
      <Frame color={'#E5D1FF'} width={897} height={90} left={48} top={955} radius={25}>
        <p style={style.p}>총 매출액</p>
        <div style={style.won}>{Number(total()).toLocaleString()}원</div>
      </Frame>
      <Link to={'/'}>
        <Button
          backColor={'#ebff00'}
          radius={25}
          width={400}
          height={90}
          lineHeight={2.4}
          left={984}
          top={955}
          text={'HOME'}
        />
      </Link>
      <Button
        onClick={() => deadline()}
        backColor={'#ff006b'}
        fontColor={'white'}
        fontSize={48}
        radius={25}
        width={450}
        height={90}
        lineHeight={1.8}
        left={1422}
        top={955}
        text={'영업마감'}
      />
      <Alert text={text} />
      <BusinessDeadline />
    </div>
  );
};

export default DailySalesStatus;

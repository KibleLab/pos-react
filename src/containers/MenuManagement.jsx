import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import {useState, useEffect} from 'react';
import Frame from '../components/Frame';
import Button from '../components/Button';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import {withRouter} from 'react-router-dom';

import AddNewItem from '../modals/AddNewItem';
import RemoveItem from '../modals/RemoveItem';
import StockEdit from '../modals/StockEdit';
import Alert from '../modals/Alert';

import {useSelector, useDispatch} from 'react-redux';
import {modalOpen} from '../reducers/modal';
import {setSelect, resetSelect} from '../reducers/select';
import {getMenu} from '../reducers/menuManagement';

const style = {
  dataGrid: {
    width: '98%',
    height: '95%',
    margin: 20,
  },
  numberCell: {
    textAlign: 'right',
  },
};
const MenuManagement = ({history}) => {
  const select = useSelector((state) => state.select.select);
  const rows = useSelector((state) => [...state.menuManagement.menu]);
  const [text, setText] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);

  const goBack = () => {
    dispatch(resetSelect());
    history.goBack();
  };

  const onClick = (index) => {
    if (Object.keys(select).length === 0) {
      setText('상품을 선택해주세요.');
      dispatch(modalOpen({index: 5, open: true}));
    } else {
      dispatch(modalOpen({index: index, open: true}));
    }
  };

  const onRowSelected = (selection) => {
    dispatch(setSelect(selection.data));
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
    <Frame
      color={`linear-gradient(to right, #48c6ef 0%, #6f86d6 100%)`}
      width={1920}
      height={1080}
      left={0}
      top={0}
    >
      <Frame color={'#FFFFFF'} width={1796} height={874} left={62} top={55} radius={25}>
        <div className="ag-theme-alpine" style={style.dataGrid}>
          <AgGridReact
            rowData={rows}
            rowSelection={'single'}
            onRowClicked={onRowSelected}
            suppressMovableColumns={true}
          >
            <AgGridColumn field={'menu_no'} headerName={'No.'} width={150} />
            <AgGridColumn field={'menu_name'} headerName={'상품명'} width={700} />
            <AgGridColumn
              field={'menu_price'}
              headerName={'단가'}
              cellStyle={{textAlign: 'right'}}
              valueFormatter={currencyFormatter}
              width={200}
            />
            <AgGridColumn
              field={'menu_stock'}
              headerName={'재고'}
              cellStyle={{textAlign: 'right'}}
              valueFormatter={currencyFormatter}
              width={200}
            />
          </AgGridReact>
        </div>
      </Frame>
      <Button
        onClick={() => dispatch(modalOpen({index: 0, open: true}))}
        backColor={'#ebff00'}
        radius={25}
        width={410}
        height={90}
        lineHeight={2.4}
        left={62}
        top={951}
        text={'새 상품 추가'}
      />
      <AddNewItem />
      <Button
        onClick={() => onClick(1)}
        backColor={'#ebff00'}
        radius={25}
        width={410}
        height={90}
        lineHeight={2.4}
        left={62+52+410}
        top={951}
        text={'기존 상품 삭제'}
      />
      <RemoveItem />
      <Button
        onClick={() => onClick(2)}
        backColor={'#ebff00'}
        radius={25}
        width={410}
        height={90}
        lineHeight={2.4}
        left={62+52*2+410*2}
        top={951}
        text={'재고 수정'}
      />
      <StockEdit />
      <Button
        onClick={goBack}
        backColor={'#adff00'}
        radius={25}
        width={410}
        height={90}
        lineHeight={2.4}
        left={62+52*3+410*3}
        top={951}
        text={'Back'}
      />
      <Alert text={text} />
    </Frame>
  );
};

export default withRouter(MenuManagement);

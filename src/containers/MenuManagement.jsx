import {makeStyles} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import {useState, useEffect} from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import {withRouter} from 'react-router-dom';

import AddNewItem from '../modals/AddNewItem';
import RemoveItem from '../modals/RemoveItem';
import StockEdit from '../modals/StockEdit';

import {useSelector, useDispatch} from 'react-redux';
import {modalOpen} from '../reducers/modal';
import {setSelect, resetSelect} from '../reducers/select';
import {getMenu} from '../reducers/menuManagement';

const MenuManagement = ({history}) => {
  const classes = useStyles();
  const select = useSelector((state) => state.select.select);
  const rows = useSelector((state) => [...state.menuManagement.menu]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
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
      setMessage('상품을 선택해주세요.');
      setOpen(true);
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
    <Container className={classes.root} maxWidth={false}>
      <Container className={classes.gridC} maxWidth={false}>
        <div className="ag-theme-alpine" style={{width: '100%', height: '100%', padding: 0}}>
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
      </Container>

      <Button
        className={classes.addNewItemB}
        onClick={() => dispatch(modalOpen({index: 0, open: true}))}
      >
        새 상품 추가
      </Button>
      <AddNewItem />

      <Button className={classes.removeItemB} onClick={() => onClick(1)}>
        기존 상품 제거
      </Button>
      <RemoveItem />

      <Button className={classes.stockEditB} onClick={() => onClick(2)}>
        재고 수정
      </Button>
      <StockEdit />

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
  addNewItemB: {
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
    '&:hover': {backgroundColor: '#ebff00'},
  },
  removeItemB: {
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
    '&:hover': {backgroundColor: '#ebff00'},
  },
  stockEditB: {
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
    '&:hover': {backgroundColor: '#ebff00'},
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
    '&:hover': {backgroundColor: '#adff00'},
  },
});

export default withRouter(MenuManagement);

import {makeStyles} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import {useState, useEffect} from 'react';
import Title from '../components/Title';
import TableButton from '../components/TableButton';
import {Link} from 'react-router-dom';

import TableManagement from '../modals/TableManagement';

import {useSelector, useDispatch} from 'react-redux';
import {getTable} from '../reducers/main';
import {modalOpen} from '../reducers/modal';

const Main = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const table = useSelector((state) => [...state.main.table]);
  const order = useSelector((state) => state.orderSheet.order);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(getTable());
  }, [dispatch]);

  const sortingField = 'table_no';

  table.sort((a, b) => {
    return a[sortingField] - b[sortingField];
  });

  const tableButtonList = table.map((data, index) => (
    <div key={index}>
      <Link to={'/OrderSheet/' + data.table_no}>
        <TableButton index={index} table_no={data.table_no} title={data.table_name} />
      </Link>
    </div>
  ));

  const onClick = () => {
    if (table.length === 0) {
      dispatch(modalOpen({index: 6, open: true}));
    } else {
      for (let i = 0; i < table.length; i++) {
        if (order[i].length === 0 && i === table.length - 1) {
          dispatch(modalOpen({index: 6, open: true}));
        } else if (order[i].length !== 0) {
          setMessage('결제가 안된 테이블이 있습니다.');
          setOpen(true);
          break;
        }
      }
    }
  };

  return (
    <Container className={classes.root} maxWidth={false}>
      <Title />

      <Button className={classes.menuManageB} component={Link} to={'/MenuManagement'}>
        메뉴 관리
      </Button>

      <Button className={classes.tableManageB} onClick={onClick}>
        테이블 관리
      </Button>

      <Button className={classes.calcB} component={Link} to={'/DailySalesStatus'}>
        정산
      </Button>

      <Container className={classes.tableListC} maxWidth={false}>
        <Container className={classes.tableList} maxWidth={false}>
          {tableButtonList}
        </Container>
      </Container>

      <TableManagement />

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
  tableListC: {
    position: 'absolute',
    background: 'white',
    width: 1840,
    height: 880,
    left: 40,
    bottom: 40,
    borderRadius: 25,
  },
  tableList: {
    position: 'absolute',
    width: 1770,
    height: 800,
    left: 40,
    top: 40,
    overflowY: 'auto',
    '&::-webkit-scrollbar': {width: 5},
    '&::-webkit-scrollbar-thumb': {
      background: '#c7c7c7',
      borderRadius: 10,
    },
  },
  menuManageB: {
    position: 'absolute',
    background: '#ebff00',
    width: 290,
    height: 90,
    right: 700,
    top: 40,
    borderRadius: 15,
    fontSize: 38,
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': {backgroundColor: '#ebff00'},
  },
  tableManageB: {
    position: 'absolute',
    background: '#ebff00',
    width: 290,
    height: 90,
    right: 370,
    top: 40,
    borderRadius: 15,
    fontSize: 38,
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': {backgroundColor: '#ebff00'},
  },
  calcB: {
    position: 'absolute',
    background: '#ebff00',
    width: 290,
    height: 90,
    right: 40,
    top: 40,
    borderRadius: 15,
    fontSize: 38,
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': {backgroundColor: '#ebff00'},
  },
});

export default Main;

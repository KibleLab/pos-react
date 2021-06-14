import {makeStyles} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import {useState, useEffect} from 'react';
import Modal from 'react-modal';

import {useSelector, useDispatch} from 'react-redux';
import {modalOpen} from '../reducers/modal';
import {editStock} from '../reducers/menuManagement';
import {resetSelect} from '../reducers/select';

const StockEdit = () => {
  const classes = useStyles();
  const open = useSelector((state) => [...state.modal.open]);
  const select = useSelector((state) => state.select.select);
  const [input, setInput] = useState(0);

  useEffect(() => {
    setInput(select.menu_stock);
  }, [select.menu_stock]);
  const regex = /^[0-9]*$/;

  const dispatch = useDispatch();

  const onChange = (e) => {
    if (regex.test(e.target.value)) {
      setInput(Number(e.target.value));
    }
  };

  const plus = () => {
    setInput((input) => input + 1);
  };

  const minus = () => {
    if (input > 0) {
      setInput((input) => input - 1);
    }
  };

  const close = (e) => {
    setInput(select.menu_stock);
    dispatch(modalOpen({index: 2, open: false}));
  };

  const stockEdit = () => {
    const data = {menu_no: select.menu_no, menu_stock: input};
    dispatch(editStock(data));
    dispatch(resetSelect());
    dispatch(modalOpen({index: 2, open: false}));
  };

  return (
    <Modal className={classes.root} isOpen={open[2]}>
      <Container className={classes.contents} maxWidth={false}>
        <Typography className={classes.title}>재고수정 - {select.menu_name}</Typography>

        <TextField
          className={classes.stock}
          variant={'outlined'}
          value={input}
          onChange={onChange}
        />

        <IconButton aria-label="plus" className={classes.plus} onClick={plus}>
          <AddIcon />
        </IconButton>

        <IconButton aria-label="minus" className={classes.minus} onClick={minus}>
          <RemoveIcon />
        </IconButton>
      </Container>

      <Button className={classes.backB} onClick={close}>
        Back
      </Button>

      <Button className={classes.editB} onClick={stockEdit}>
        수정
      </Button>
    </Modal>
  );
};

const useStyles = makeStyles({
  root: {
    position: 'relative',
    background: 'linear-gradient(to right, #48c6ef 0%, #6f86d6 100%)',
    width: 720,
    height: 620,
    left: 600,
    top: 230,
    borderRadius: 15,
    outline:'none',
  },
  contents: {
    position: 'absolute',
    background: '#F2C94C',
    width: 640,
    height: 330,
    left: 40,
    top: 40,
    borderRadius: 15,
  },
  title: {
    position: 'absolute',
    width: 640,
    left: 0,
    top: 40,
    fontSize: 36,
    textAlign: 'center',
  },
  stock: {
    position: 'absolute',
    background: 'white',
    width: 560,
    left: 40,
    top: 134,
    borderRadius: 5,
    fontSize: 24,
  },
  plus: {
    position: 'absolute',
    background: '#68DBFF',
    width: 265,
    height: 60,
    left: 40,
    bottom: 40,
    borderRadius: 15,
    color: 'black',
    fontSize: 36,
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': {backgroundColor: '#68DBFF'},
  },
  minus: {
    position: 'absolute',
    background: '#68DBFF',
    width: 265,
    height: 60,
    right: 40,
    bottom: 40,
    borderRadius: 15,
    color: 'black',
    fontSize: 36,
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': {backgroundColor: '#68DBFF'},
  },
  backB: {
    position: 'absolute',
    background: '#adff00',
    width: 640,
    height: 80,
    left: 40,
    bottom: 145,
    borderRadius: 15,
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': {backgroundColor: '#adff00'},
  },
  editB: {
    position: 'absolute',
    background:
      `linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)`,
    width: 640,
    height: 80,
    right: 40,
    bottom: 40,
    borderRadius: 15,
    color: 'white',
    fontSize: 38,
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': {
      backgroundColor:
        `linear-gradient(45deg, #FF6B8B 30%, #FF8E53 90%)`,
    },
  },
});

export default StockEdit;

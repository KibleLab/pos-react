import {makeStyles} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import {useState} from 'react';
import Modal from 'react-modal';

import {useSelector, useDispatch} from 'react-redux';
import {modalOpen} from '../reducers/modal';
import {addMenu} from '../reducers/menuManagement';
import {resetSelect} from '../reducers/select';

const AddNewItem = () => {
  const classes = useStyles();
  const open = useSelector((state) => [...state.modal.open]);
  const [inputs, setInputs] = useState({menu_name: '', menu_price: '', menu_stock: ''});
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState('');
  const {menu_name, menu_price, menu_stock} = inputs;
  const regex = /^[0-9]*$/;

  const dispatch = useDispatch();

  const onChange = (e) => {
    const {name, value} = e.target;
    if (name === 'menu_name') {
      setInputs({...inputs, [name]: value});
    }
    if (name === 'menu_price' && regex.test(value)) {
      setInputs({...inputs, [name]: value});
    }
    if (name === 'menu_stock' && regex.test(value)) {
      setInputs({...inputs, [name]: value});
    }
  };

  const close = () => {
    setInputs({menu_name: '', menu_price: '', menu_stock: ''});
    dispatch(modalOpen({index: 0, open: false}));
  };

  const addNewItem = () => {
    if (inputs.menu_name === '' || inputs.menu_price === '' || inputs.menu_stock === '') {
      setMessage('정보를 입력해주세요');
      setOpenSnackBar(true);
    } else {
      dispatch(addMenu(inputs));
      dispatch(resetSelect());
      setInputs({menu_name: '', menu_price: '', menu_stock: ''});
      dispatch(modalOpen({index: 0, open: false}));
    }
  };

  return (
    <Modal className={classes.root} isOpen={open[0]}>
      <Container className={classes.contents} maxWidth={false}>
        <Typography className={classes.title}>등록할 상품 정보 입력</Typography>

        <TextField
          className={classes.name}
          label={'상품명 입력'}
          autoComplete={'off'}
          type={'text'}
          name={'menu_name'}
          value={menu_name}
          variant={'filled'}
          onChange={onChange}
        />

        <TextField
          className={classes.price}
          label={'단가 입력'}
          autoComplete={'off'}
          type={'text'}
          name={'menu_price'}
          value={menu_price}
          variant={'filled'}
          onChange={onChange}
        />

        <TextField
          className={classes.stock}
          label={'재고 입력'}
          autoComplete={'off'}
          type={'text'}
          name={'menu_stock'}
          value={menu_stock}
          variant={'filled'}
          onChange={onChange}
        />
      </Container>

      <Button className={classes.backB} onClick={close}>
        Back
      </Button>

      <Button className={classes.enrollB} onClick={addNewItem}>
        등록
      </Button>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnackBar}
        autoHideDuration={1500}
        onClose={() => setOpenSnackBar(false)}
        message={message}
        action={
          <IconButton
            aria-label="close"
            style={{color: 'yellow'}}
            className={classes.close}
            onClick={() => setOpenSnackBar(false)}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </Modal>
  );
};

const useStyles = makeStyles({
  root: {
    position: 'relative',
    background: 'linear-gradient(to right, #48c6ef 0%, #6f86d6 100%)',
    width: 720,
    height: 900,
    left: 600,
    top: 90,
    borderRadius: 15,
  },
  contents: {
    position: 'absolute',
    background: '#F2C94C',
    width: 640,
    height: 610,
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
  name: {
    position: 'absolute',
    background: 'white',
    width: 560,
    left: 40,
    top: 134,
    borderRadius: '5px 5px 0px 0px',
    fontSize: 24,
  },
  price: {
    position: 'absolute',
    background: 'white',
    width: 560,
    left: 40,
    top: 324,
    borderRadius: '5px 5px 0px 0px',
    fontSize: 24,
  },
  stock: {
    position: 'absolute',
    background: 'white',
    width: 560,
    left: 40,
    top: 514,
    borderRadius: '5px 5px 0px 0px',
    fontSize: 24,
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
  enrollB: {
    position: 'absolute',
    background: '#ff006b',
    width: 640,
    height: 80,
    right: 40,
    bottom: 40,
    borderRadius: 15,
    color: 'white',
    fontSize: 38,
    fontWeight: 'bold',
    textTransform: 'none',
    '&:hover': {backgroundColor: '#ff006b'},
  },
});

export default AddNewItem;

import {makeStyles} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import {useState, useEffect} from 'react';
import Modal from 'react-modal';

import {useSelector, useDispatch} from 'react-redux';
import {postTable, deleteTable} from '../reducers/tableMgnt';

const TableMgnt = (props) => {
  const classes = useStyles();
  const table = useSelector((state) => [...state.tableMgnt.table]);
  const [input, setInput] = useState(1);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState('');
  const regex = /^[0-9]*$/;

  const dispatch = useDispatch();

  useEffect(() => {
    setInput(table.length);
  }, [table.length]);

  const onChange = (e) => {
    if (regex.test(e.target.value)) {
      setInput(Number(e.target.value));
    }
  };

  const plus = () => {
    if (input >= 0 && input < 100) {
      setInput((input) => input + 1);
    }
  };

  const minus = () => {
    if (input > 1 && input < 101) {
      setInput((input) => input - 1);
    }
  };

  const tableEdit = () => {
    if (input < 1) {
      setMessage('테이블은 1개 이상 설치해야 합니다.');
      setOpenSnackBar(true);
      setInput(table.length);
    } else if (input > 100) {
      setMessage('테이블 설치 한도 초과입니다.');
      setOpenSnackBar(true);
      setInput(table.length);
    } else {
      dispatch(deleteTable());
      for (let j = 1; j < input + 1; j++) {
        setTimeout(() => {
          const addData = {table_no: j, table_name: 'Table' + j};
          dispatch(postTable({addData}));
        }, 500);
      }
    }
  };

  return (
    <Modal className={classes.root} isOpen={props.isOpen}>
      <Container className={classes.contents} maxWidth={false}>
        <Typography className={classes.title}>테이블 초기 설정</Typography>

        <TextField
          className={classes.count}
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

      <Button className={classes.editB} onClick={tableEdit}>
        수정
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
    height: 515,
    left: 600,
    top: 282.5,
    borderRadius: 15,
    outline: 'none',
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
  count: {
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
  editB: {
    position: 'absolute',
    background: `linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)`,
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
      backgroundColor: `linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)`,
    },
  },
});

export default TableMgnt;

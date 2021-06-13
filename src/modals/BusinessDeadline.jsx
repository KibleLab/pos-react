import {makeStyles} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import {useState} from 'react';
import Modal from 'react-modal';
import {withRouter} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';
import {modalOpen} from '../reducers/modal';
import {resetSales} from '../reducers/dailySales';

const BusinessDeadline = ({history}) => {
  const classes = useStyles();
  const open = useSelector((state) => [...state.modal.open]);
  const order = useSelector((state) => state.orderSheet.order);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const close = () => {
    dispatch(modalOpen({index: 4, open: false}));
  };

  const deadline = () => {
    for (let i = 0; i < order.length; i++) {
      if (order[i].length === 0 && i === order.length - 1) {
        dispatch(resetSales());
        dispatch(modalOpen({index: 4, open: false}));
        history.push('/');
      } else if (order[i].length !== 0) {
        setMessage('결제가 안된 테이블이 있습니다.');
        setOpenSnackBar(true);
        break;
      }
    }
  };

  return (
    <Modal className={classes.root} isOpen={open[4]}>
      <Container className={classes.contents} maxWidth={false}>
        <Typography className={classes.title}>영업을 마감하시겠습니까?</Typography>
      </Container>

      <Button className={classes.backB} onClick={close}>
        Back
      </Button>

      <Button className={classes.deadlineB} onClick={deadline}>
        마감
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
    height: 520,
    left: 600,
    top: 280,
    borderRadius: 15,
  },
  contents: {
    position: 'absolute',
    background: '#F2C94C',
    width: 640,
    height: 230,
    left: 40,
    top: 40,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    width: 640,
    left: 0,
    fontSize: 36,
    textAlign: 'center',
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
  deadlineB: {
    position: 'absolute',
    background:
      'linear-gradient(90deg, rgba(254, 107, 139, 0.3) 0%, rgba(255, 142, 83, 0.9) 100%), #FF006B',
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
        'linear-gradient(90deg, rgba(254, 107, 139, 0.3) 0%, rgba(255, 142, 83, 0.9) 100%), #FF006B',
    },
  },
});

export default withRouter(BusinessDeadline);

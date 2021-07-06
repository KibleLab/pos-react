import {makeStyles} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Modal from 'react-modal';

import {useSelector, useDispatch} from 'react-redux';
import {modalOpen} from '../reducers/modal';
import {delMenu} from '../reducers/menuMgnt';
import {resetSelect} from '../reducers/select';

const DelMenu = () => {
  const classes = useStyles();
  const open = useSelector((state) => [...state.modal.open]);
  const select = useSelector((state) => state.select.select);
  const dispatch = useDispatch();

  const close = () => {
    dispatch(modalOpen({index: 1, open: false}));
  };

  const _delMenu = () => {
    dispatch(delMenu({delData: select}));
    dispatch(resetSelect());
    dispatch(modalOpen({index: 1, open: false}));
  };

  return (
    <Modal className={classes.root} isOpen={open[1]}>
      <Container className={classes.contents} maxWidth={false}>
        <Typography className={classes.title}>
          이 상품을 메뉴판에서 <br /> 제거하시겠습니까?
        </Typography>
      </Container>
      <Button className={classes.backB} onClick={close}>
        Back
      </Button>

      <Button className={classes.delB} onClick={_delMenu}>
        제거
      </Button>
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
    outline: 'none',
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
  delB: {
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
      backgroundColor: `linear-gradient(45deg, #FE6B8B 0%, #FF8E53 90%)`,
    },
  },
});

export default DelMenu;
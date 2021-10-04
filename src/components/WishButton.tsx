import { FC } from 'react';
import { WishButtonProps } from '../types/components';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

const WishButton: FC<WishButtonProps> = (props) => {
  const classes = useStyles(props);

  return (
    <Container className={classes.root} maxWidth={false}>
      <Typography className={classes.name}>{props.name}</Typography>
      <IconButton aria-label='delete' className={classes.delete} onClick={props.delete}>
        <DeleteForeverOutlinedIcon />
      </IconButton>
      <IconButton aria-label='minus' className={classes.minus} onClick={props.minus}>
        <RemoveIcon />
      </IconButton>
      <Typography className={classes.quantity}>{props.quantity}</Typography>
      <IconButton aria-label='plus' className={classes.plus} onClick={props.plus}>
        <AddIcon />
      </IconButton>
      <Typography className={classes.price}>
        {Number(props.price * props.quantity).toLocaleString()}원
      </Typography>
    </Container>
  );
};

const useStyles = makeStyles({
  root: (props: WishButtonProps) => ({
    position: 'absolute',
    background: '#E0FFD1',
    width: 648,
    height: 140,
    left: 0,
    top: props.index * 140 + props.index * 16,
    padding: 16,
    borderRadius: 15,
  }),
  name: {
    position: 'absolute',
    left: 16,
    top: 16,
    color: 'black',
    fontSize: 24,
    textAlign: 'left',
    float: 'left',
  },
  quantity: {
    position: 'absolute',
    width: 48,
    left: 40,
    bottom: 16,
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  price: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    fontSize: 18,
    color: '#FF0000',
  },
  delete: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 0,
    color: 'red',
    textAlign: 'right',
  },
  plus: {
    position: 'absolute',
    background: '#68DBFF',
    width: 24,
    height: 24,
    left: 88,
    bottom: 16,
    color: 'black',
    borderRadius: 25,
    '&:hover': { backgroundColor: '#68DBFF' },
  },
  minus: {
    position: 'absolute',
    background: '#68DBFF',
    width: 24,
    height: 24,
    left: 16,
    bottom: 16,
    color: 'black',
    borderRadius: 25,
    '&:hover': { backgroundColor: '#68DBFF' },
  },
});

export default WishButton;

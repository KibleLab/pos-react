import {makeStyles} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const MenuButton = (props) => {
  const classes = useStyles(props);
  return (
    <Container
      className={classes.root}
      maxWidth={false}
      onClick={props.onClick}
      disabled={props.stock > 0 ? false : true}
      component={Button}
    >
      <Typography className={classes.name}>{props.name}</Typography>
      <Typography className={classes.stock}>재고: {props.stock}</Typography>
      <Typography className={classes.price}>{Number(props.price).toLocaleString()}원</Typography>
    </Container>
  );
};

const useStyles = makeStyles({
  root: (props) => ({
    position: 'absolute',
    background: props.stock > 0 ? '#FFC37C' : `rgba(255, 195, 124, 0.5)`,
    width: 260,
    height: 160,
    borderRadius: 15,
    left: (props.index % 4) * 260 + (props.index % 4) * 16,
    top: Math.floor(props.index / 4) * 160 + Math.floor(props.index / 4) * 16,
    textTransform: 'none',
    '&:hover': {backgroundColor: props.stock > 0 ? '#FFC37C' : `rgba(255, 195, 124, 0.5)`},
  }),
  name: (props) => ({
    position: 'absolute',
    left: 16,
    top: 16,
    fontSize: 24,
    color: '#000000',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    textDecorationLine: props.stock > 0 ? '' : `line-through`,
  }),
  stock: (props) => ({
    position: 'absolute',
    left: 16,
    bottom: 16,
    fontSize: 18,
    color: '#000000',
    textDecorationLine: props.stock > 0 ? '' : `line-through`,
  }),
  price: (props) => ({
    position: 'absolute',
    right: 16,
    bottom: 16,
    fontSize: 18,
    color: '#FF0000',
    textDecorationLine: props.stock > 0 ? '' : `line-through`,
  }),
});

export default MenuButton;

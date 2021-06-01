import './stylesheets/Button.css';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: (props) => ({
    position: 'absolute',
    background: props.color,
    color: props.fontColor,
    fontSize: props.fontSize,
    borderRadius: props.radius,
    width: props.width,
    height: props.height,
    left: props.left,
    top: props.top,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    fontWeight: 'bold',
  }),
});

function MUIButton(props) {
  const classes = useStyles(props);

  return (
    <Button className={classes.root} variant="contained" onClick={props.onClick}>
      {props.text}
    </Button>
  );
}

export default MUIButton;

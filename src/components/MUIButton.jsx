import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: (props) => ({
    position: 'absolute',
    background: props.backColor,
    color: props.fontColor,
    fontSize: props.fontSize,
    borderRadius: props.radius,
    width: props.width,
    height: props.height,
    left: props.left,
    top: props.top,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    fontWeight: 'bold',
    '&:hover': {backgroundColor: props.backColor},
  }),
});

function MUIButton(props) {
  const classes = useStyles(props);

  return (
    <Button
      className={classes.root}
      children={props.children}
      classes={props.classes}
      color={props.color}
      component={props.component}
      disabled={props.disabled}
      disableElevation={props.disableElevation}
      disableFocusRipple={props.disableFocusRipple}
      disableRipple={props.disableRipple}
      endIcon={props.endIcon}
      fullWidth={props.fullWidth}
      href={props.href}
      size={props.size}
      startIcon={props.startIcon}
      variant={props.variant}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
}

export default MUIButton;

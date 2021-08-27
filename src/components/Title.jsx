import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';

const Title = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <img src={'/images/Title.png'} className={'Title'} alt={'Title'} />
    </Container>
  );
};

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    width: 540,
    height: 110,
    left: 40,
    top: 40,
    padding: 0,
    display: 'flex',
    alignItem: 'center',
  },
});

export default Title;

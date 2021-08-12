import {makeStyles} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import {Helmet} from 'react-helmet';

const ErrorPage = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root} maxWidth={false}>
      <Helmet>
        <title>Error - Kible POS System</title>
      </Helmet>
      <Container className={classes.contents} maxWidth={false}>
        <Typography className={classes.text1}>Error</Typography>
        <Typography className={classes.text2}>Page is not Found :(</Typography>
      </Container>
    </Container>
  );
};

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    background: 'linear-gradient(to right, #48c6ef 0%, #6f86d6 100%)',
    width: 1920,
    height: 1080,
    left: 0,
    top: 0,
    padding: 40,
  },
  contents: {
    position: 'absolute',
    background: 'white',
    width: 1840,
    height: 1000,
    left: 40,
    top: 40,
    borderRadius: 25,
  },
  text1: {
    position: 'absolute',
    left: 589,
    top: 334,
    fontWeight: 'bold',
    fontSize: 136,
    textAlign: 'center',
    color: '#FF0000',
  },
  text2: {
    position: 'absolute',
    left: 589,
    bottom: 334,
    fontWeight: 'normal',
    fontSize: 72,
    textAlign: 'center',
    color: '#000000',
  },
});

export default ErrorPage;

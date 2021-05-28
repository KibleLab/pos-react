import Frame from '../components/Frame';

const style = {
  text1: {
    position: 'absolute',
    left: 603,
    marginTop: 335,
    fontWeight: 'bold',
    fontSize: 144,
    textAlign: 'center',
    color: '#FF0000',
  },
  text2: {
    position: 'absolute',
    left: 603,
    marginTop: 496,
    fontWeight: 'normal',
    fontSize: 72,
    textAlign: 'center',
    color: '#000000',
  },
};

const ErrorPage = () => {
  return (
    <Frame
      color={`linear-gradient(to right, #48c6ef 0%, #6f86d6 100%)`}
      width={1920}
      height={1080}
      left={0}
      top={0}
    >
      <Frame color="#FFFFFF" width="1824px" height="984px" left="48px" top="48px" radius={25}>
        <p style={style.text1}>Error</p>
        <p style={style.text2}>Page is not Found :(</p>
      </Frame>
    </Frame>
  );
};

export default ErrorPage;

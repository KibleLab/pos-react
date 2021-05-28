import './stylesheets/Frame.css';

const Frame = (props) => {
  const style = {
    backgroundColor: props.color,
    width: props.width,
    height: props.height,
    marginLeft: props.left,
    marginTop: props.top,
    borderRadius: props.radius,
  };

  return (
    <div className={'Frame'} style={style}>
      {props.children}
    </div>
  );
};

export default Frame;

import './stylesheets/Frame.css';

const Frame = (props) => {
  const style = {
    background: props.color,
    width: props.width,
    height: props.height,
    left: props.left,
    top: props.top,
    borderRadius: props.radius,
  };

  return (
    <div className={'Frame'} style={style}>
      {props.children}
    </div>
  );
};

export default Frame;

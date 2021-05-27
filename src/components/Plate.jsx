import './stylesheets/Plate.css';

const Plate = (props) => {
  const style = {
    backgroundColor: props.color,
    width: props.width,
    height: props.height,
    marginLeft: props.left,
    marginTop: props.top,
    borderRadius: props.radius,
  };

  return (
    <div className={'Plate'} style={style}>
      {props.children}
    </div>
  );
};

export default Plate;

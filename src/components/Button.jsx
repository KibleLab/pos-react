import './stylesheets/Button.css';

const Button = (props) => {
  return (
    <div
      className={'Button'}
      onClick={props.onClick}
      style={{
        backgroundColor: props.backColor,
        color: props.fontColor,
        fontSize: props.fontSize,
        borderRadius: props.radius,
        width: props.width,
        height: props.height,
        lineHeight: props.lineHeight,
        marginLeft: props.left,
        marginTop: props.top,
      }}
    >
      {props.text}
    </div>
  );
};

export default Button;

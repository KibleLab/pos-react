const OrderMenuButton = (props) => {
  const style = {
    root: {
      position: 'absolute',
      width: 606,
      height: 134,
      background: '#E0FFD1',
      borderRadius: 15,
      marginLeft: props.left,
      marginTop: props.top,
      cursor: 'default',
    },
    button: {
      marginLeft: 580,
      marginTop: 5,
      fontSize: 24,
      cursor: 'pointer',
    },
    name: {
      position: 'absolute',
      left: 17,
      top: 8,
      fontSize: 24,
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
    },
    quantity: {
      position: 'absolute',
      left: 17,
      top: 90,
      fontSize: 18,
    },
    price: {
      position: 'absolute',
      right: 10,
      top: 90,
      fontSize: 18,
      color: '#FF0000',
    },
  };

  return (
    <div style={style.root}>
      <div style={style.name}>{props.name}</div>
      <div style={style.quantity}>수량: {props.quantity}</div>
      <div style={style.price}>{Number(props.price * props.quantity).toLocaleString()}원</div>
      <div onClick={props.onClick} style={style.button}>
        ×
      </div>
    </div>
  );
};

export default OrderMenuButton;

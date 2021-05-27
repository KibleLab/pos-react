const MenuButton = (props) => {
  const style = {
    root: {
      position: 'absolute',
      backgroundColor: '#FFC37C',
      width: 260,
      height: 155,
      borderRadius: 15,
      marginLeft: props.left,
      marginTop: props.top,
      cursor: 'default',
    },
    name: {
      position: 'absolute',
      left: 14,
      top: 16,
      fontSize: 24,
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
    },
    stock: {
      position: 'absolute',
      left: 14,
      top: 110,
      fontSize: 18,
    },
    price: {
      position: 'absolute',
      right: 10,
      top: 110,
      fontSize: 18,
      color: '#FF0000',
    },
  };

  return (
    <div style={style.root} onClick={props.onClick}>
      <div style={style.name}>{props.name}</div>
      <div style={style.stock}>재고: {props.stock}</div>
      <div style={style.price}>{Number(props.price).toLocaleString()}원</div>
    </div>
  );
};

export default MenuButton;

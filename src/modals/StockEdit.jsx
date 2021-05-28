import style from './stylesheets/StockEdit.module.css';
import {useState, useEffect} from 'react';
import Modal from 'react-modal';
import Frame from '../components/Frame';
import Button from '../components/Button';
import TextField from '@material-ui/core/TextField';

import {useSelector, useDispatch} from 'react-redux';
import {modalOpen} from '../reducers/modal';
import {editStock} from '../reducers/menuManagement';
import {resetSelect} from '../reducers/select';

const StockEdit = () => {
  const open = useSelector((state) => [...state.modal.open]);
  const select = useSelector((state) => state.select.select);
  const [input, setInput] = useState(0);

  useEffect(() => {
    setInput(select.menu_stock);
  }, [select.menu_stock]);
  const regex = /^[0-9]*$/;

  const dispatch = useDispatch();

  const onChange = (e) => {
    if (regex.test(e.target.value)) {
      setInput(Number(e.target.value));
    }
  };

  const plus = () => {
    setInput((input) => input + 1);
  };

  const minus = () => {
    if (input > 0) {
      setInput((input) => input - 1);
    }
  };

  const close = (e) => {
    setInput(select.menu_stock);
    dispatch(modalOpen({index: 2, open: false}));
  };

  const stockEdit = () => {
    const data = {menu_no: select.menu_no, menu_stock: input};
    dispatch(editStock(data));
    dispatch(resetSelect());
    dispatch(modalOpen({index: 2, open: false}));
  };

  return (
    <Modal className={style.stockEdit} isOpen={open[2]}>
      <Frame color={'#F2C94C'} width={624} height={304} left={49} top={54} radius={25}>
        <div className={style.stock}>재고수정 - {select.menu_name}</div>
        <TextField className={style.name} variant={'outlined'} value={input} onChange={onChange} />
        <Button
          backColor={'#68DBFF'}
          fontSize={48}
          radius={15}
          width={287}
          height={59}
          lineHeight={1}
          left={16}
          top={150}
          text={'+'}
          onClick={plus}
        />
        <Button
          backColor={'#68DBFF'}
          fontSize={48}
          radius={15}
          width={287}
          height={59}
          lineHeight={1}
          left={318}
          top={150}
          text={'–'}
          onClick={minus}
        />
      </Frame>
      <Button
        onClick={close}
        backColor={'#adff00'}
        radius={20}
        width={624}
        height={90}
        lineHeight={2.4}
        left={49}
        top={383}
        text={'Back'}
      />
      <Button
        onClick={stockEdit}
        backColor={'#ff006b'}
        fontColor={'white'}
        fontSize={48}
        radius={20}
        width={624}
        height={90}
        lineHeight={1.8}
        left={49}
        top={487}
        text={'수정'}
      />
    </Modal>
  );
};

export default StockEdit;

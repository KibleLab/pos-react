import style from './stylesheets/AddNewItem.module.css';
import {useState} from 'react';
import Modal from 'react-modal';
import Frame from '../components/Frame';
import MUIButton from '../components/MUIButton';
import MUITextField from '../components/MUITextField';
import Alert from '../modals/Alert';

import {useSelector, useDispatch} from 'react-redux';
import {modalOpen} from '../reducers/modal';
import {addMenu} from '../reducers/menuManagement';
import {resetSelect} from '../reducers/select';

const AddNewItem = () => {
  const open = useSelector((state) => [...state.modal.open]);
  const [inputs, setInputs] = useState({menu_name: '', menu_price: '', menu_stock: ''});
  const [text, setText] = useState();
  const {menu_name, menu_price, menu_stock} = inputs;
  const regex = /^[0-9]*$/;

  const dispatch = useDispatch();

  const onChange = (e) => {
    const {name, value} = e.target;
    if (name === 'menu_name') {
      setInputs({...inputs, [name]: value});
    }
    if (name === 'menu_price' && regex.test(value)) {
      setInputs({...inputs, [name]: value});
    }
    if (name === 'menu_stock' && regex.test(value)) {
      setInputs({...inputs, [name]: value});
    }
  };

  const close = () => {
    setInputs({menu_name: '', menu_price: '', menu_stock: ''});
    dispatch(modalOpen({index: 0, open: false}));
  };

  const addNewItem = () => {
    if (inputs.menu_name === '' || inputs.menu_price === '' || inputs.menu_stock === '') {
      setText('정보를 입력해주세요');
      dispatch(modalOpen({index: 5, open: true}));
    } else {
      dispatch(addMenu(inputs));
      dispatch(resetSelect());
      setInputs({menu_name: '', menu_price: '', menu_stock: ''});
      dispatch(modalOpen({index: 0, open: false}));
    }
  };

  return (
    <Modal className={style.AddNewItem} isOpen={open[0]}>
      <Frame color={'#F2C94C'} width={624} height={609} left={49} top={54} radius={25}>
        <div className={style.information}>등록할 상품 정보 입력</div>
        <MUITextField
          backColor={'white'}
          width={589}
          left={17}
          top={145}
          fontSize={24}
          radius={'5px 5px 0px 0px'}
          label={'상품명 입력'}
          variant={'filled'}
          autoComplete={'off'}
          type={'text'}
          name={'menu_name'}
          value={menu_name}
          onChange={onChange}
        />
        <MUITextField
          backColor={'white'}
          width={589}
          left={17}
          top={326}
          fontSize={24}
          radius={'5px 5px 0px 0px'}
          label={'단가 입력'}
          variant={'filled'}
          autoComplete={'off'}
          type={'text'}
          name={'menu_price'}
          value={menu_price}
          onChange={onChange}
        />
        <MUITextField
          backColor={'white'}
          width={589}
          left={17}
          top={507}
          fontSize={24}
          radius={'5px 5px 0px 0px'}
          label={'재고 입력'}
          variant={'filled'}
          autoComplete={'off'}
          type={'text'}
          name={'menu_stock'}
          value={menu_stock}
          onChange={onChange}
        />
      </Frame>
      <MUIButton
        onClick={close}
        backColor={'#adff00'}
        fontSize={36}
        radius={20}
        width={624}
        height={90}
        left={49}
        top={681}
        text={'Back'}
      />
      <MUIButton
        onClick={addNewItem}
        backColor={'#ff006b'}
        fontColor={'white'}
        fontSize={48}
        radius={20}
        width={624}
        height={90}
        left={49}
        top={781}
        text={'등록'}
      />
      <Alert text={text} />
    </Modal>
  );
};
export default AddNewItem;

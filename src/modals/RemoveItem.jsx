import style from './stylesheets/RemoveItem.module.css';
import React from 'react';
import Modal from 'react-modal';
import Frame from '../components/Frame';
import MUIButton from '../components/MUIButton';

import {useSelector, useDispatch} from 'react-redux';
import {modalOpen} from '../reducers/modal';
import {delMenu} from '../reducers/menuManagement';
import {resetSelect} from '../reducers/select';

const AddNewItem = () => {
  const open = useSelector((state) => [...state.modal.open]);
  const select = useSelector((state) => state.select.select);
  const dispatch = useDispatch();

  const close = () => {
    dispatch(modalOpen({index: 1, open: false}));
  };

  const removeItem = () => {
    dispatch(delMenu({data: select}));
    dispatch(resetSelect());
    dispatch(modalOpen({index: 1, open: false}));
  };

  return (
    <Modal className={style.root} isOpen={open[1]}>
      <Frame color={'#F2C94C'} width={624} height={210} left={49} top={54} radius={25}>
        <p className={style.text}>
          이상품을 메뉴판에서
          <br /> 제거 하시겠습니까?
        </p>
      </Frame>
      <MUIButton
        onClick={close}
        backColor={'#adff00'}
        fontSize={36}
        radius={20}
        width={624}
        height={90}
        left={49}
        top={289}
        text={'Back'}
      />
      <MUIButton
        onClick={removeItem}
        backColor={'#ff006b'}
        fontColor={'white'}
        fontSize={48}
        radius={20}
        width={624}
        height={90}
        left={49}
        top={394}
        text={'제거'}
      />
    </Modal>
  );
};

export default AddNewItem;

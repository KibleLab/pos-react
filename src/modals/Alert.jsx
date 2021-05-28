import style from './stylesheets/Alert.module.css';

import Modal from 'react-modal';
import Frame from '../components/Frame';
import Button from '../components/Button';

import {useDispatch, useSelector} from 'react-redux';
import {modalOpen} from '../reducers/modal';

const Alert = (props) => {
  const open = useSelector((state) => [...state.modal.open]);
  const dispatch = useDispatch();

  const close = () => {
    dispatch(modalOpen({index: 5, open: false}));
  };

  return (
    <Modal className={style.root} isOpen={open[5]}>
      <Frame color={'#F2C94C'} width={624} height={210} left={49} top={54} radius={25}>
        <p className={style.text}>{props.text}</p>
      </Frame>
      <Button
        onClick={close}
        backColor={'#adff00'}
        radius={20}
        width={624}
        height={90}
        lineHeight={2.4}
        left={49}
        top={289}
        text={'Back'}
      />
    </Modal>
  );
};

export default Alert;
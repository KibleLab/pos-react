import style from './stylesheets/Deadline.module.css';
import {useState} from 'react';
import Modal from 'react-modal';
import Frame from '../components/Frame';
import Button from '../components/Button';
import Alert from '../modals/Alert';
import {withRouter} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';
import {modalOpen} from '../reducers/modal';
import {resetSales} from '../reducers/dailySales';

const BusinessDeadline = ({history}) => {
  const open = useSelector((state) => [...state.modal.open]);
  const order = useSelector((state) => state.orderSheet.order);
  const [text, setText] = useState();
  const dispatch = useDispatch();

  const close = () => {
    dispatch(modalOpen({index: 4, open: false}));
  };

  const deadline = () => {
    for (let i = 0; i < order.length; i++) {
      if (order[i].length === 0 && i === order.length - 1) {
        dispatch(resetSales());
        dispatch(modalOpen({index: 4, open: false}));
        history.push('/');
      } else if (order[i].length !== 0) {
        setText(`결제가 안된 테이블이 있습니다.`);
        dispatch(modalOpen({index: 5, open: true}));
        break;
      }
    }
  };

  return (
    <Modal className={style.root} isOpen={open[4]}>
      <Frame color={'#F2C94C'} width={624} height={210} left={49} top={54} radius={25}>
        <p className={style.text}>영업을 마감하시겠습니까?</p>
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
      <Button
        onClick={deadline}
        backColor={'#ff006b'}
        fontColor={'white'}
        fontSize={48}
        radius={20}
        width={624}
        height={90}
        lineHeight={1.8}
        left={49}
        top={394}
        text={'마감'}
      />
      <Alert text={text} />
    </Modal>
  );
};

export default withRouter(BusinessDeadline);

import style from './stylesheets/Payment.module.css';
import Modal from 'react-modal';
import Plate from '../components/Plate';
import Button from '../components/Button';
import {withRouter} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';
import {modalOpen} from '../reducers/modal';
import {resetOS} from '../reducers/orderSheet';
import {addSales, quanIncrDS} from '../reducers/dailySales';

Modal.setAppElement('body');

const Payment = ({match, history}) => {
  const {table_no} = match.params;
  const open = useSelector((state) => [...state.modal.open]);
  const order = useSelector((state) => state.orderSheet.order[table_no - 1]);
  const dailySales = useSelector((state) => state.dailySales.dailySales);
  const dispatch = useDispatch();

  const close = () => {
    dispatch(modalOpen({index: 3, open: false}));
  };
  const payCalc = () => {
    for (let i = 0; i < order.length; i++) {
      const index = dailySales.findIndex((dailySales) => dailySales.menu_no === order[i].menu_no);
      if (index === -1) {
        setTimeout(() => {
          dispatch(addSales({table_no: table_no, data: order[i]}));
        }, 500);
      } else {
        setTimeout(() => {
          const data = {
            sales_no: dailySales[index].sales_no,
            sales_quantity: dailySales[index].sales_quantity + order[i].order_quantity,
          };
          dispatch(quanIncrDS({table_no: table_no, data: data}));
        }, 500);
      }
    }
    dispatch(resetOS(table_no));
    dispatch(modalOpen({index: 3, open: false}));
    history.push('/');
  };

  return (
    <Modal className={style.Payment} isOpen={open[3]}>
      <Plate color={'#FFFFFF'} width={624} height={609} left={49} top={54}>
        <p className={style.text}>
          IC 카드를 삽입하여 주십시오.
          <br />
          <br />
          마그네틱 카드인 경우
          <br /> 카드리더기에 긁어 주십시오.
          <br />
          <br />
          카드를 삽입하거나 긁은 후<br /> 결제 버튼을 눌러주십시오.
        </p>
      </Plate>
      <Button
        onClick={close}
        backColor={'#adff00'}
        radius={20}
        width={624}
        height={90}
        lineHeight={2.4}
        left={49}
        top={681}
        text={'Back'}
      />
      <Button
        onClick={payCalc}
        backColor={'#ff006b'}
        fontColor={'white'}
        fontSize={48}
        radius={20}
        width={624}
        height={90}
        lineHeight={1.8}
        left={49}
        top={781}
        text={'결제'}
      />
    </Modal>
  );
};

export default withRouter(Payment);

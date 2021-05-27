import style from './stylesheets/TableManagement.module.css';
import {useState, useEffect} from 'react';
import Modal from 'react-modal';
import Plate from '../components/Plate';
import Button from '../components/Button';
import TextField from '@material-ui/core/TextField';

import {useSelector, useDispatch} from 'react-redux';
import {modalOpen} from '../reducers/modal';
import {postTable, deleteTable} from '../reducers/main';
import Alert from './Alert';

const TableManagement = () => {
  const open = useSelector((state) => [...state.modal.open]);
  const table = useSelector((state) => [...state.main.table]);
  const [input, setInput] = useState(1);
  const [text, setText] = useState();
  const regex = /^[0-9]*$/;

  const dispatch = useDispatch();

  useEffect(() => {
    setInput(table.length);
  }, [table.length]);

  const onChange = (e) => {
    if (regex.test(e.target.value)) {
      setInput(Number(e.target.value));
    }
  };

  const plus = () => {
    if (input >= 0 && input < 100) {
      setInput((input) => input + 1);
    }
  };

  const minus = () => {
    if (input > 1 && input < 101) {
      setInput((input) => input - 1);
    }
  };

  const close = (e) => {
    dispatch(modalOpen({index: 6, open: false}));
  };

  const tableEdit = () => {
    if (input < 1) {
      setText('테이블은 1개 이상 설치해야 합니다.');
      dispatch(modalOpen({index: 5, open: true}));
      setInput(table.length);
    } else if (input > 100) {
      setText('테이블 설치 한도 초과입니다.');
      dispatch(modalOpen({index: 5, open: true}));
      setInput(table.length);
    } else {
      dispatch(deleteTable());
      for (let j = 1; j < input + 1; j++) {
        setTimeout(() => {
          const data = {table_no: j, table_name: 'Table' + j};
          dispatch(postTable(data));
        }, 500);
      }
      dispatch(modalOpen({index: 6, open: false}));
    }
  };

  return (
    <Modal className={style.TableManagement} isOpen={open[6]}>
      <Plate color={'#F2C94C'} width={624} height={304} left={49} top={54}>
        <div className={style.name}>테이블 관리</div>
        <TextField className={style.table} variant={'outlined'} value={input} onChange={onChange} />
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
      </Plate>
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
        onClick={tableEdit}
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
      <Alert text={text} />
    </Modal>
  );
};

export default TableManagement;

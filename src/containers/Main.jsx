import {useState, useEffect} from 'react';
import Frame from '../components/Frame';
import Title from '../components/Title';
import MUIButton from '../components/MUIButton';
import TableButton from '../components/TableButton';
import {Link} from 'react-router-dom';

import Alert from '../modals/Alert';
import TableManagement from '../modals/TableManagement';

import {useSelector, useDispatch} from 'react-redux';
import {getTable} from '../reducers/main';
import {modalOpen} from '../reducers/modal';

const Main = () => {
  const dispatch = useDispatch();
  const table = useSelector((state) => [...state.main.table]);
  const order = useSelector((state) => state.orderSheet.order);
  const [text, setText] = useState();

  useEffect(() => {
    dispatch(getTable());
  }, [dispatch]);

  const sortingField = 'table_no';

  table.sort((a, b) => {
    return a[sortingField] - b[sortingField];
  });

  const tableButtonList = table.map((data, index) => (
    <div key={index}>
      <Link to={'/OrderSheet/' + data.table_no}>
        <TableButton
          table_no={data.table_no}
          left={452 * (index % 4) + 'px'}
          top={419 * Math.floor(index / 4) + 'px'}
          text={data.table_name}
        />
      </Link>
    </div>
  ));

  const onClick = () => {
    if (table.length === 0) {
      dispatch(modalOpen({index: 6, open: true}));
    } else {
      for (let i = 0; i < table.length; i++) {
        if (order[i].length === 0 && i === table.length - 1) {
          dispatch(modalOpen({index: 6, open: true}));
        } else if (order[i].length !== 0) {
          setText('결제가 안된 테이블이 있습니다.');
          dispatch(modalOpen({index: 5, open: true}));
          break;
        }
      }
    }
  };

  return (
    <Frame
      color={`linear-gradient(to right, #48c6ef 0%, #6f86d6 100%)`}
      width={1920}
      height={1080}
      left={0}
      top={0}
    >
      <Title />
      <Link to={'/MenuManagement'}>
        <MUIButton
          backColor={'#ebff00'}
          fontSize={36}
          radius={25}
          width={290}
          height={100}
          left={934}
          top={24}
          text={'메뉴 관리'}
        />
      </Link>
      <MUIButton
        onClick={onClick}
        backColor={'#ebff00'}
        fontSize={36}
        radius={25}
        width={290}
        height={100}
        left={1250}
        top={24}
        text={'테이블 관리'}
      />
      <Link to={'/DailySalesStatus'}>
        <MUIButton
          backColor={'#ebff00'}
          fontSize={36}
          radius={25}
          width={290}
          height={100}
          left={1566}
          top={24}
          text={'정산'}
        />
      </Link>

      <Frame color={'#FFFFFF'} width={1800} height={870} left={58} top={162} radius={25}>
        <Frame color={'#FFF'} width={1766} height={810} left={34} top={31}>
          {tableButtonList}
        </Frame>
      </Frame>
      <TableManagement />
      <Alert text={text} />
    </Frame>
  );
};

export default Main;

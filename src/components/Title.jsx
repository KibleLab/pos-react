import './stylesheets/Title.css';
import img from '../images/Title.png';

const Title = () => {
  return (
    <div>
      <img src={img} className={'Title'} alt={'Title'} />
    </div>
  );
};

export default Title;

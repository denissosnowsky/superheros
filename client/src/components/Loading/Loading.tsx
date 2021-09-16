import s from './Loading.module.css';
import loading from '../../assets/loading.gif'

const Loading: React.FC = () => {
    return (
        <div className={s.wrapper}>
            <img src={loading} alt='loading'/>
        </div>
    );
};

export default Loading;
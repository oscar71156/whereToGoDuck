import HualienIcon from '../../../assets/icons/whereTo-Hualien.png';
import NantouIcon from '../../../assets/icons/whereTo-Nantou.png';
import NewTaipeiIcon from '../../../assets/icons/whereTo-NewTaipei.png';
import TaichungIcon from '../../../assets/icons/whereTo-Taichung.png';
import styles from './Content.module.css';
import Area from './Area';

const RecommendationContent=({county})=>{

  
    return(
        <div className={styles.content}>
            {
                county.map(({nameTW,name})=>(
                    <Area key={nameTW+name} imgAlt={name} name={name} imgSrc={HualienIcon} caption={nameTW}/>
                ))
            }
        </div>
    )
}


export default RecommendationContent;
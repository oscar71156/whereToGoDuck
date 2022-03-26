import Navigation from "./Navigation";
import Recommendation from "./Recommendation/Container";
import styles from './FrontPage.module.css';

const FrontPage=()=>{


    return(<div className={styles.frontPage}>
         <Navigation/>
        <Recommendation/>
    </div>);
}
export default FrontPage;
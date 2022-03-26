import { Cpation, CaptionDuck } from "../assets/icons";
import { Link } from "react-router-dom";
import styles from './Header.module.css';

const Header=()=>{
    return(
        <header className={styles.header}>
            <Link to="/" className={styles.icon}><CaptionDuck/></Link>
            <Link to="/"><h1><Cpation /></h1></Link>
        </header>
    )
}
export default Header;
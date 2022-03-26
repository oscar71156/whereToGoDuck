import { Cross } from "../../../assets/icons";
import classes from './Close.module.css';

const CloseButton=({onClick})=>{
    return(<button onClick={onClick} className={classes.closeButton}>
        <Cross/>
    </button>)
}

export default CloseButton;
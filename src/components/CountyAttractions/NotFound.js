import { SadDuck } from "../../assets/icons";
import classes from './NotFound.module.css';

const NotFound=()=>{
    return(
        <div className={classes.notFound}>
            <span>
                嗨鴨~
            </span>
            <span>
                好像找不到耶...
            </span>
            <SadDuck/>
        </div>
    )
}

export default NotFound;
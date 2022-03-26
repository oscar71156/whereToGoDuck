import classes from './More.module.css';
const MoreButton = ({onClick,buttonText="看更多"}) => {
  return (
    <button className={classes.more} onClick={onClick}>
      <span>
        {buttonText}
      </span>
    </button>
  );
};
export default MoreButton;

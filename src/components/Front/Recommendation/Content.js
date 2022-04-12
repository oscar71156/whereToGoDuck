import classes from "./Content.module.css";
import Area from "./Area";

const RecommendationContent = ({ county }) => {
  return (
    <div className={classes.content}>
      {county.map(({ nameTW, name }) => (
        <Area key={nameTW + name} imgAlt={name} name={name} caption={nameTW} />
      ))}
    </div>
  );
};

export default RecommendationContent;

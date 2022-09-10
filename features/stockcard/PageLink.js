import Link from "next/link";
import classes from "./StockCard.module.css";

const PageLink = ({ symbol, type, Icon }) => {
  return (
    <div>
      <Link href={`/${encodeURIComponent(symbol)}?pageType=${type}`} passHref>
        <a target="_blank" rel="noopener noreferrer" className={classes.icon}>
          <Icon />
        </a>
      </Link>
    </div>
  );
};

export default PageLink;

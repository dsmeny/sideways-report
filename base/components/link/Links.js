import Link from "next/link";
import classes from "./Links.module.css";

const Links = ({ url, Icon }) => {
  return (
    <Link href={url} passHref>
      <a target="_blank" rel="noopener noreferrer" className={classes.icon}>
        <Icon />
      </a>
    </Link>
  );
};

export default Links;

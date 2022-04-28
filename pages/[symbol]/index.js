import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Spinner from "../../components/ui/Spinner";
import Overview from "../../components/ui/Overview";
import useStockApi from "../../components/utility/hooks/useStockApi";
import { convertNumber } from "../../components/utility/general";
import { AiFillCloseCircle } from "react-icons/ai";
import { dataModel } from "../../models/overview_model";

// Constants
const COLUMNS = 4;

const Container = styled.div`
  flex-grow: 2;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Icon = styled.div`
  font-size: 2.4rem;
  color: var(--button-font-color);
  margin-top: 1rem;
  text-align: center;
`;

const Details = () => {
  const router = useRouter();
  const { symbol } = router.query;
  const { stockData } = useStockApi({ symbol, timeSeries: "OVERVIEW" });

  if (!stockData)
    return (
      <div>
        <Spinner />
      </div>
    );

  const styles = {
    container: {
      position: "relative",
      top: "15vh",
    },
    main: {
      position: "absolute",
      left: "50%",
      fontSize: "2.2rem",
      color: "var(--primary-font-color)",
      zIndex: "999",
    },
    wrapper: {
      position: "absolute",
      top: "2rem",
      width: "98%",
    },
  };

  return (
    <Container>
      <Link href="/">
        <Icon>
          <AiFillCloseCircle />
        </Icon>
      </Link>
      <Wrapper>
        {Object.values(dataModel(stockData, convertNumber)).map(
          (elem, index) => (
            <Overview obj={elem} key={index} />
          )
        )}
      </Wrapper>
    </Container>
  );
};

export default Details;

import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Spinner from "../../components/ui/Spinner";
import Overview from "../../components/ui/Overview";
import useStockApi from "../../components/utility/hooks/useStockApi";
import { AiFillCloseCircle } from "react-icons/ai";

// Constants
const COLUMNS = 4;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Icon = styled.div`
  font-size: 2rem;
  color: var(--button-font-color);
  margin-top: 1rem;
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

  function stockOverview(data) {
    let dataArray = [];
    let overview = Object.entries(data);
    while (overview.length) {
      dataArray.push(overview.splice(0, COLUMNS));
    }

    return dataArray;
  }

<<<<<<< HEAD
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
      width: "100%",
    },
  };

=======
>>>>>>> 394628057839ac98ccf0bd5f479d6e91b5c15dbf
  return (
    <Container>
      <Link href="/">
        <Icon>
          <AiFillCloseCircle />
        </Icon>
      </Link>
      <Wrapper>
        {stockOverview(stockData).map((elem, index) => (
          <Overview array={elem} key={index} />
        ))}
      </Wrapper>
    </Container>
  );
};

export default Details;

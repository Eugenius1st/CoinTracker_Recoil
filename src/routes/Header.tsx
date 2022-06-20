import styled from 'styled-components';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { useHistory } from 'react-router-dom';

export default function Header() {
  let history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <Wrapper>
        <Wrapper2>
          <button onClick={goBack}>
            <ArrowBackIosNewIcon sx={{ fontSize: 30, color: 'white' }} />
          </button>
          <span>Coin Tracker</span>
          <button onClick={goBack}>
            <DehazeIcon sx={{ fontSize: 30, color: 'white' }} />
          </button>
        </Wrapper2>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  background-color: #1f2b38;
  position: fixed;
  width: 100vw;
  height: 10vh;
`;

const Wrapper2 = styled.div`
  background-color: #1f2b38;
  max-width: 500px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;

  span {
    font-weight: bold;
    color: ${(props) => props.theme.accentColor};
  }
`;

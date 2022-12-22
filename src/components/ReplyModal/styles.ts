import styled from 'styled-components';

export const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  > div:first-child {
    display: flex;
    justify-content: space-between;
    height: 10%;
  }

  > div:nth-child(2) {
    height: 70%;
    overflow: auto;

    > div {
      margin: 5px 0;

      > span {
        margin-right: 5px;
      }
    }
  }
`;

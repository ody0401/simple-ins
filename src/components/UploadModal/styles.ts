import styled from 'styled-components';

export const DivWrapper = styled.div`
  text-align: right;
  border-bottom: 1px solid #ccc;
`;

export const DivContentWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 95%;

  > div {
    flex-basis: 50%;
  }
  > div:last-child {
    padding: 10px;
  }
`;

export const DivReplyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid #ccc;
  height: 98%;

  > div:first-child {
    margin-bottom: 10px;
  }

  > div:nth-child(2) {
    flex-grow: 1;
  }

  > div:last-child {
    text-align: right;
    margin-top: 20px;
  }
`;

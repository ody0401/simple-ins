import styled from 'styled-components';
import { Row } from 'antd';

export const RowWrapper = styled(Row)`
  height: 100vh;

  & > .ant-col {
    padding: 10px;
  }

  & .ant-col:first-child {
    border-right: 1px solid #ccc;
  }
`;

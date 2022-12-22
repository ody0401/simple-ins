import styled from 'styled-components';
import Slider from 'react-slick';

export const DivWrapper = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 50%;
  margin: 0 auto 20px;

  & > div {
    padding: 5px;
  }

  & > div:nth-child(2) {
    padding: 0;
  }
`;

export const DivPostHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SpanWrapper = styled.span`
  margin-left: 5px;
`;

export const SliderWrapper = styled(Slider)`
  .slick-dots {
    bottom: 0;
  }
`;

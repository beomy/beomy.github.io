import type { ColorProps } from 'styled-system';
import React from 'react';
import { color } from 'styled-system';
import styled from '@emotion/styled';
import * as colorPalette from '../../src/tokens/base/colors';

const StyledColorName = styled.h2`
  span {
    text-transform: capitalize;
  }
`;

const StyledColorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledColorWrapper = styled.div`
  text-align: center;
  margin: 5px;
`;

const StyledColor = styled.div<ColorProps>`
  ${color};
  height: 50px;
  margin-bottom: 5px;
  border-radius: 10px;
`;

const Colors = () => {
  const colorList = {
    grey: colorPalette.grey,
    primary: colorPalette.primary,
    blue: colorPalette.blue,
    green: colorPalette.green,
    orange: colorPalette.orange,
    red: colorPalette.red,
    purple: colorPalette.purple,
    yellow: colorPalette.yellow,
  };

  return (
    <>
      {Object.entries(colorList).map(([key, colors]) => (
        <div key={key}>
          <StyledColorName>
            <span>{key}</span> <small>(theme.colors.{key}[index])</small>
          </StyledColorName>
          <StyledColorContainer>
            {Object.entries(colors).map(([index, value]) => (
              <StyledColorWrapper key={index}>
                <StyledColor bg={value} />
                <div>
                  <strong>{index}</strong>
                  <br />
                  <small>{value}</small>
                </div>
              </StyledColorWrapper>
            ))}
          </StyledColorContainer>
        </div>
      ))}
    </>
  );
};

export default Colors;

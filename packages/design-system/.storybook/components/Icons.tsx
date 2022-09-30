import React, { useState, useMemo } from 'react';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { light } from '../../src/tokens';
import { BaseStyles, TextField } from '../../src';
import * as IconList from '../../src/icons';

const StyledIconContainer = styled.div`
  display: flex;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const StyledIconWrapper = styled.div`
  width: 100px;
  text-align: center;
  margin: 10px;
`;

const Icons = () => {
  const [str, setStr] = useState<string>('');

  const filteredIconList = useMemo(() => {
    return Object.entries(IconList).filter(([key]) => {
      return key.toLowerCase().includes(str.toLowerCase());
    });
  }, [str]);

  return (
    <ThemeProvider theme={light}>
      <BaseStyles />
      <TextField
        placeholder="아이콘 검색"
        onChange={setStr}
        searchable={false}
        border
      />
      <StyledIconContainer>
        {filteredIconList.map(([key, Icon]) => (
          <StyledIconWrapper key={key}>
            <div>
              <Icon size="30px" />
            </div>
            <small>{key}</small>
          </StyledIconWrapper>
        ))}
      </StyledIconContainer>
    </ThemeProvider>
  );
};

export default Icons;

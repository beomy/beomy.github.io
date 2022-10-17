import { useState, useMemo, useCallback } from 'react';
import React, { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { uniqueId } from 'lodash-es';
import Notification from './Notification';
import { light } from '../../src/tokens';
import { BaseStyles, TextField, MessageTypes } from '../../src';
import * as IconList from '../../src/icons';

const StyledIconContainer = styled.div`
  display: flex;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const StyledIconWrapper = styled.button`
  width: 100px;
  text-align: center;
  margin: 10px;
`;

const Icons = () => {
  const [str, setStr] = useState<string>('');
  const [message, setMessage] = useState<MessageTypes.MessageProps[]>([]);

  const filteredIconList = useMemo(() => {
    return Object.entries(IconList).filter(([key]) => {
      return key.toLowerCase().includes(str.toLowerCase());
    });
  }, [str]);

  const bsIconList = useMemo(() => {
    return filteredIconList.filter(([key]) => /^Bs/.test(key));
  }, [filteredIconList]);

  const beomyIconList = useMemo(() => {
    return filteredIconList.filter(([key]) => /^Bm/.test(key));
  }, [filteredIconList]);

  const handleClick = useCallback((iconName: string) => {
    setMessage((value) => {
      window.navigator.clipboard.writeText(iconName);
      return value.concat({
        id: uniqueId('message'),
        text: '아이콘 이름이 복사되었습니다.',
        type: 'info',
      });
    });
  }, []);

  return (
    <ThemeProvider theme={light}>
      <BaseStyles />
      <TextField
        placeholder="아이콘 검색"
        onChange={setStr}
        searchable={false}
        border
      />
      <h1>Beomy</h1>
      <StyledIconContainer>
        {beomyIconList.map(([key, Icon]) => (
          <StyledIconWrapper key={key} onClick={() => handleClick(key)}>
            <div>
              <Icon size="30px" />
            </div>
            <small>{key}</small>
          </StyledIconWrapper>
        ))}
      </StyledIconContainer>
      <h1>React/BS</h1>
      <StyledIconContainer>
        {bsIconList.map(([key, Icon]) => (
          <StyledIconWrapper key={key} onClick={() => handleClick(key)}>
            <div>
              <Icon size="30px" />
            </div>
            <small>{key}</small>
          </StyledIconWrapper>
        ))}
      </StyledIconContainer>
      <Notification message={message} setMessage={setMessage} />
    </ThemeProvider>
  );
};

export default Icons;

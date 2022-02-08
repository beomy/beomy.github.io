import styled from '@emotion/styled';

const StyledPostNavigator = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1.4;
  margin-top: 20px;
  a {
    display: flex;
    align-items: center;
    border: ${({ theme }: any) => `1px solid ${theme.colors.border}`};
    border-radius: 10px;
    margin-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
    height: 70px;
    &.previous {
      text-align: left;
      .contents {
        margin-left: 10px;
        margin-right: auto;
      }
    }
    &.next {
      text-align: right;
      .contents {
        margin-left: auto;
        margin-right: 10px;
      }
    }
    .contents {
      > div {
        &:first-of-type {
          font-size: ${({ theme }: any) => theme.fontSizes[0]};
        }
      }
    }
    + a {
      margin-left: 10px;
    }
  }
  ${({ theme }: any) => `${theme.mediaQueries.sm}`} {
    flex-direction: column;
    a {
      + a {
        margin-left: 0;
      }
    }
  }
`;

export default StyledPostNavigator;

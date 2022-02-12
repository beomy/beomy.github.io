import styled from '@emotion/styled';

const StyledPostNavigator = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1.4;
  margin-top: 20px;
  > div {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    height: 70px;
    margin-bottom: 10px;
    + div {
      margin-left: 10px;
    }
    &.empty {
      height: 0;
    }
  }
  a {
    display: flex;
    align-items: center;
    border: ${({ theme }: any) => `1px solid ${theme.colors.border}`};
    border-radius: 10px;
    padding-left: 15px;
    padding-right: 15px;
    height: 100%;
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
  }
  ${({ theme }: any) => `${theme.mediaQueries.xs}`} {
    display: block;
    > div {
      flex-grow: initial;
      flex-shrink: initial;
      flex-basis: initial;
      + div {
        margin-left: 0;
      }
    }
  }
`;

export default StyledPostNavigator;

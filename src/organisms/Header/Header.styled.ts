import styled from '@emotion/styled';

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: rgb(0 0 0 / 8%) 0 0 15px;
  transition: top 0.2s ease-in-out;
  &.hide {
    top: -140px;
  }
  > nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 75px;
    border-bottom: ${({ theme }: any) => `1px solid ${theme.colors.border}`};
    .menu {
      display: none;
    }
    > a {
      > div {
        vertical-align: middle;
      }
    }
    ul {
      margin: 0 0 0 auto;
      padding: 0;
      display: flex;
    }
  }
  > div {
    height: 0;
    background-color: rgba(250, 250, 250, 0.8);
    transition: all 0.35s ease-in-out 0s;
    visibility: hidden;
    display: flex;
    align-items: center;
    .bar {
      margin: auto;
      width: ${({ theme }: any) => theme.sizes.screen.m};
    }
    &.active {
      height: 80px;
      visibility: visible;
    }
  }
  ${({ theme }: any) => `${theme.mediaQueries.m}`} {
    > div {
      > .bar {
        width: ${({ theme }: any) => theme.sizes.screen.sm};
      }
    }
  }
  ${({ theme }: any) => `${theme.mediaQueries.sm}`} {
    > div {
      > .bar {
        width: ${({ theme }: any) => theme.sizes.screen.xs};
      }
    }
    > nav {
      padding: 10px 20px;
      .menu {
        display: block;
      }
      ul {
        display: none;
      }
    }
  }
`;

export default StyledHeader;

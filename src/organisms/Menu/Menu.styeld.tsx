import styled from '@emotion/styled';

const StyledMenu = styled.menu`
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  z-index: 9999;
  margin: 0;
  padding: 0;
  > * {
    transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
      opacity 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
      box-shadow 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  }
  &.active {
    width: 100%;
    .dim {
      opacity: 0.3;
      height: 100%;
      transition: opacity 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    }
    .contents {
      box-shadow: 2px 0 8px rgb(0 0 0 / 15%);
      transform: translateX(0);
    }
  }
  .dim {
    background: ${({ theme }: any) => theme.colors.black};
    opacity: 0;
    width: 100%;
    height: 0;
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
      height 0s ease 0.3s;
  }
  .contents {
    width: 285px;
    height: 100%;
    position: absolute;
    background: ${({ theme }: any) => theme.colors.white};
    transform: translateX(-100%);
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;
    border-bottom: ${({ theme }: any) => `1px solid ${theme.colors.border}`};
    a {
      > div {
        vertical-align: middle;
      }
    }
  }
  ul {
    padding-left: 30px;
  }
  a {
    text-transform: capitalize;
  }
`;

export default StyledMenu;

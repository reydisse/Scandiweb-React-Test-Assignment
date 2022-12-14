import styled from "styled-components";

export const NavItem = styled.li`
  padding: ${(props) => {
    return props.padding ? `${props.padding}rem;` : "1rem";
  }};
  border-bottom: ${(props) =>
    props.isActive && " 2px solid var(--color-green)"};
  font-size: 16px;
  & > .nav-link {
    color: black;
    text-decoration: none;
    text-transform: uppercase;
  }

  & > .nav-link-active {
    color: var(--color-green) ;
  }

  &.nav-item-padding-one-half {
    padding: 1.5rem;
  }

  &.nav-item-padding-one-half {
    borderBottom: isActive ? 'solid 2px var(--color-green)' : '',
  }
`;

export const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  ${(props) =>
    (props.left && "justify-content: flex-start; padding-left: 5rem;") ||
    (props.right && "justify-content: flex-end; padding-right: 6rem;")}
`;

export const NavLogo = styled.img`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

export const Navbar = styled.nav`
  background-color: white;
  position: fixed;
  width: 100%;
  padding: 0 1rem;
  z-index: 3;
  display: flex;
  & > ${NavList} {
    display: flex;
    flex: 1;
    align-items: center;
  }
  & > ${NavLogo} {
    align-self: center;
  }
`;

import React from 'react';
import Categories from '../features/categories/Categories';
import { Navbar, NavLogo, NavList } from './navigation/Navbar';
import CurrencySwitcher from '../features/currency-switcher/Currency-Switcher';
import CartMenu from '../features/cart/cartmenu/CartMenu';

export default class StoreHeader extends React.Component {
  render() {
    return (
      <Navbar>
        <Categories />
        <NavLogo src="/a-logo.png" size={40} />
        <NavList right>
          <CurrencySwitcher
            setCurrencySwitcherCloseFunc={(func) => {
              this.setCurrencySwitcherClosed = func;
            }}
            onCurrencySwitcherButtonClicked={() => {
              this.setCartMenuClosed();
            }}
          />
          <CartMenu
            setCartCloseFunc={(func) => {
              this.setCartMenuClosed = func;
            }}
            onCartButtonClicked={(open) => {
              this.props.cartMenuOpen(open);
              this.setCurrencySwitcherClosed();
            }}
          />
        </NavList>
      </Navbar>
    );
  }
}

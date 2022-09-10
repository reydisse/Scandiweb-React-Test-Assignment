import React from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import StoreHeader from "../components/Header";
import ProductsComponent from "../features/products/ProductsComponent";
import {
  pushCategory,
  setActiveCategory,
  fetchCategories,
} from "../features/categories/CategoriesSlice";
import { fetchProducts } from "../features/products/ProductsSlice";
import ProductDescriptionPageComponent from "../features/products/ProductDescriptionPageComponent";
import {
  fetchCurrencies,
  setActiveCurrency,
} from "../features/currency-switcher/CurrencySlice";
import CartPage from "../features/cart/cartpage/Cart-Description";
import Overlay from "../components/common/Overlay";

const mapStateToProps = (state) => ({
  currencies: state.CurrencyReducer.currencies,
  categories: state.CategoriesReducer.categories,
  activeCategory: state.CategoriesReducer.activeCategory,
  activeCurrency: state.CurrencyReducer.activeCurrency,
});

const mapDispatchToProps = {
  fetchCategories,
  pushCategory,
  fetchProducts,
  setActiveCategory,
  fetchCurrencies,
  setActiveCurrency,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOverlay: false,
    };
  }

  componentDidMount() {
    if (this.props.categories.length === 0) {
      this.props.pushCategory({ name: "all" });
    }

    if (this.props.activeCategory === "") {
      this.props.setActiveCategory("all");
    }

    if (this.props.activeCurrency === "") {
      this.props.setActiveCurrency("USD");
    }
    this.props.fetchCurrencies();
    this.props.fetchCategories();
  }

  render() {
    return (
      <Router>
        <StoreHeader
          cartMenuOpen={(open) => {
            this.setState({ showOverlay: open });
          }}
        />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/all" />} />
          {this.props.categories.map((category, index) => {
            return (
              <Route
                path={`/${category.name}`}
                component={ProductsComponent}
                key={String(index)}
              />
            );
          })}
          <Route
            path="/product/:category/:id"
            component={ProductDescriptionPageComponent}
          />
          <Route path="/cart" component={CartPage} />
        </Switch>
        {this.state.showOverlay ? <Overlay /> : ""}
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

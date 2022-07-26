import React from 'react';
import { connect } from 'react-redux';
import { setActiveCategory } from './CategoriesSlice';
import { NavList } from '../../components/navigation/Navbar';
import NavbarLink from '../../components/navigation/NavbarLink';
import { fetchProducts } from '../products/ProductsSlice';

const mapStateToProps = (state) => ({
    categories: state.CategoriesReducer.categories
  })

const mapDispatchToProps = {
  setActiveCategory,
  fetchProducts,
};

class Categories extends React.Component {
  render() {
    return (
      <NavList left>
        {this.props.categories.map((category, index) => (
          <NavbarLink
            path={`/${category.name}`}
            key={String(index)}
            onItemClicked={() => {
              this.props.setActiveCategory(category.name);
              if (category.name === 'all') {
                this.props.fetchProducts('');
              } else {
                this.props.fetchProducts(category.name);
              }
            }}
          >
            {category.name}
          </NavbarLink>
        ))}
      </NavList>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);

import React from "react";
import { Link } from "react-router-dom";
import { CartIcon } from "../../icons/Icons";
import "./styles/ProductCard.css";

export default class ProductCard extends React.Component {
  render() {
    const price = this.props.data.prices.find((element) => {
      return element.currency.label === this.props.activeCurrency;
    });

    return (
      <Link
        className="card-link"
        to={`/product/${this.props.activeCategory}/${this.props.data.id}`}
      >
        <div className="card">
          {this.props.data.inStock ? (
            <div className="card-main">
              <div className="card-img-container">
                <img
                  className="card-img"
                  src={this.props.data.gallery[0]}
                  alt="img"
                />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  this.props.addToCartClick();
                }}
                type="button"
                className="card-add-to-cart-button"
              >
                <CartIcon className="product-card-cart-icon" />
              </button>
              <p className="product-card-name">{`${this.props.data.brand} ${this.props.data.name}`}</p>
              <p className="product-card-price">{`${
                price?.currency?.symbol ?? ""
              }  ${price?.amount.toFixed(2)}`}</p>
            </div>
          ) : (
            <div className="card-main">
              <div className="card-overlay">
                <h2 className="card-out-of-stock-title">OUT OF STOCK</h2>
              </div>
              <div className="card-img-container">
                <img
                  className="card-img"
                  src={this.props.data.gallery[0]}
                  alt="img"
                />
              </div>
              <p className="product-card-name">{`${this.props.data.brand} ${this.props.data.name}`}</p>
              <p className="product-card-price">{`${price?.currency?.symbol} ${price?.amount.toFixed(2)}`}</p>
            </div>
          )}
        </div>
      </Link>
    );
  }
}

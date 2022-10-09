import React from "react";
import { connect } from "react-redux";
import { fetchProductById } from "./ProductSlice";
import "./styles/ProductDetailPage.css";
import {
  AttributeContainer,
  AttributeTitle,
} from "../../components/product/ProductAttribute";
import { Button } from "../../components/common/Button";
import ChipGroup from "../../components/common/ChipGroup";
import ProductImageSlider from "../../components/product/ProductImageSlider";
import { addItemToCart } from "../cart/CartSlice";
const regex = /(&nbsp;|<([^>]+)>)/ig
 


const mapStateToProps = (state) => {
  return {
    activeCurrency: state.CurrencyReducer.activeCurrency,
    product: state.ProductReducer.product,
    status: state.ProductReducer.status,
  };
};
const mapDispatchToProps = {
  fetchProductById,
  addItemToCart,
};

class ProductDescriptionPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: [],
    };
  }

  componentDidMount() {
    // fetch product by id
    this.props.fetchProductById(this.props.match.params.id);
  }

  getProductPrice() {
    if (this.props.product.prices) {
      return this.props.product.prices.find((el) => {
        return el.currency.label === this.props.activeCurrency;
      });
    }
    return 0;
  }

  setSelectedChip(attrName, attrindex) {
    if (this.state.selectedAttributes.find((el) => el.name === attrName)) {
      const newSelectedAttributes = this.state.selectedAttributes.map((el) =>
        el.name === attrName
          ? {
              ...el,
              selectedIndex: attrindex,
            }
          : el
      );
      this.setState(() => ({ selectedAttributes: newSelectedAttributes }));
    } else {
      this.setState((prevState) => ({
        selectedAttributes: [
          ...prevState.selectedAttributes,
          {
            name: attrName,
            selectedIndex: attrindex,
          },
        ],
      }));
    }
  }

  render() {
    if (this.props.status === "success") {
      return (
        <div className="product-description-page-container">
          <ProductImageSlider data={this.props.product.gallery} />
          <div className="product-description-container">
            <h2 className="product-description-brand">
              {this.props.product.brand}
            </h2>
            <h2 className="product-description-name">
              {this.props.product.name}
            </h2>
            {this.props.product.attributes.map((attribute, index) => {
              if (attribute.type === "swatch") {
                return (
                  <AttributeContainer key={String(index)}>
                    <AttributeTitle>{attribute.name}:</AttributeTitle>
                    <ChipGroup
                      defaultSelectChip={(idx) => {
                        this.setSelectedChip(attribute.name, idx);
                      }}
                      swatchGroup
                      data={attribute.items}
                      onSelectChip={(idx) => {
                        this.setSelectedChip(attribute.name, idx);
                      }}
                    />
                  </AttributeContainer>
                );
              }
              return (
                <AttributeContainer key={String(index)}>
                  <AttributeTitle>{attribute.name}:</AttributeTitle>
                  <ChipGroup
                    defaultSelectChip={(idx) => {
                      this.setSelectedChip(attribute.name, idx);
                    }}
                    data={attribute.items}
                    onSelectChip={(idx) => {
                      this.setSelectedChip(attribute.name, idx);
                    }}
                  />
                </AttributeContainer>
              );
            })}
            <p className="product-description-price-title">PRICE:</p>
            <p className="product-description-price">{`${
              this.getProductPrice().currency.symbol
            } ${this.getProductPrice().amount.toFixed(2)}`}</p>
            <Button
              className="button-primary"
              onClick={() => {
                if (this.props.product.inStock) {
                  this.props.addItemToCart({
                    product: {
                      data: this.props.product,
                      attributeData: this.state.selectedAttributes,
                    },
                  });
                }
              }}
            >
              {`${this.props.product.inStock ? "ADD TO CART" : "OUT OF STOCK"}`}
            </Button>
            <div
              className="product-description"
             
            >
              {this.props.product.description.replace(regex, "")}
            </div>
          </div>
        </div>
      );
    }
    return 0;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDescriptionPageComponent);

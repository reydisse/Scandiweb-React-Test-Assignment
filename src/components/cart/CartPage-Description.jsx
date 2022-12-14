import React from "react";
import ChipGroup from "../common/ChipGroup";
import {
  AttributeContainer,
  AttributeTitle,
} from "../product/ProductAttribute";
import "./styles/CartPageItemDescription.css";

export default class CartPageItemDescriptionContainer extends React.Component {
  render() {
    const price = this.props.data.data.prices.find(
      (el) => el.currency.label === this.props.activeCurrency
    );
    return (
      <div>
        <h2 className="cart-page-description-brand">
          {this.props.data.data.brand}
        </h2>
        <h2 className="cart-page-description-name">
          {this.props.data.data.name}
        </h2>
        <h3 className="cart-page-description-price">{`${price.currency.label}${price.amount.toFixed(2)}`}</h3>
        {this.props.data.data.attributes.map((attribute, index) => {
          const attributeData = this.props.data.attributeData[index];
          if (attribute.type === "swatch") {
            return (
              <AttributeContainer key={String(index)}>
                <AttributeTitle>{attribute.name}:</AttributeTitle>
                <ChipGroup
                  disabled
                  swatchGroup
                  data={attribute.items}
                  selectedIndex={attributeData.selectedIndex}
                />
              </AttributeContainer>
            );
          }
          return (
            <AttributeContainer key={String(index)}>
              <AttributeTitle>{attribute.name}:</AttributeTitle>
              <ChipGroup
                disabled
                data={attribute.items}
                selectedIndex={attributeData.selectedIndex}
              />
            </AttributeContainer>
          );
        })}
      </div>
    );
  }
}

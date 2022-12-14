import React from "react";
import {
  AttributeContainer,
  AttributeTitle,
} from "../product/ProductAttribute";
import ChipGroup from "../common/ChipGroup";

export default class CartMenuItemDescription extends React.Component {
  render() {
    const price = this.props.data.data.prices.find((el) => {
      return el.currency.label === this.props.activeCurrency;
    });

    return (
      <div className="cart-menu-container">
        <p>{this.props.data.data.brand}</p>
        <p>{this.props.data.data.name}</p>
        <p className="cart-menu-price">{`${price.currency.symbol} ${price.amount.toFixed(2)}`}</p>
        {this.props.data.data.attributes.map((attribute, index) => {
          const attributeData = this.props.data.attributeData[index];
          if (attribute.type === "swatch") {
            return (
              <AttributeContainer key={String(index)}>
                <AttributeTitle>{attribute.name}:</AttributeTitle>
                <ChipGroup
                  mini
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
                mini
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

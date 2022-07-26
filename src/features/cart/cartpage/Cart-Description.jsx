import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CartPageItemDescriptionContainer from "../../../components/cart/CartPage-Description";
import CartPageItemImageContainer from "../../../components/cart/Cart-Item-Image";
import CartAmountSelection from "../../../components/cart/Cart-Amount";
import {
  addItemToCart,
  removeItemFromCart,
  setNewAttributeSelectedIndex,
} from "../CartSlice";
import getSymbolFromCurrency from "currency-symbol-map";
// import { Button } from '../../../components/common/Button';

const Container = styled.div`
  padding: 4rem;
  padding-left: 6rem;
  padding-right: 16rem;
  padding-top: 8rem;
  @media (max-width: 900px) {
    padding-right: 4rem;
    padding-left: 4rem;
  }
`;

const Title = styled.h1`
  font-size: 32pt;
  font-weight: bolder;
`;

const CartList = styled.ul`
  list-style: none;
  padding-top: 3rem;
`;

const CartItem = styled.li`
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-top: 1px solid var(--color-very-light-gray);
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const CartAnalytics = styled.li`
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-top: 1px solid var(--color-very-light-gray);
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const AnalyticsText = styled.h2`
  font-family: "Raleway", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  // width: 200px
  // align-items: flex-start;
  line-height: 28px;
`;
const Button = styled.button`
  background: none;
  border: none;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  text-decoration: #fff;
  width: 279px;
  height: 43px;
  background: #5ece7b;
  margin-top: 10px;
  &:hover {
    background-color: var(--color-darker-green);
  }
`;

const mapStateToProps = (state) => {
  return {
    products: state.CartReducer.products,
    totalItemQuantity: state.CartReducer.totalItemQuantity,
    activeCurrency: state.CurrencyReducer.activeCurrency,
  };
};

const mapDispatchToProps = {
  addItemToCart,
  removeItemFromCart,
  setNewAttributeSelectedIndex,
};

class CartPage extends React.Component {
  incrementTotalPrice(tempTotalPrice, item) {
    let totalPrice = tempTotalPrice;
    for (let i = 0; i < item.quantity; i += 1) {
      const price = item.product.data.prices.find(
        (el) => el.currency.label === this.props.activeCurrency
      );
      totalPrice += price.amount;
    }
    return totalPrice;
  }
  render() {
    const total = this.props.products.reduce((acc, cur) => {
      const price = cur.product.data.prices.find(
        (el) => el.currency.label === this.props.activeCurrency
      );
      return acc + price.amount * cur.quantity;
    }, 0);
    console.log(this.props.products);
    return (
      <Container>
        <div className="title-container">
          <Title>CART</Title>
        </div>
        <CartList>
          {this.props.products.map((item, index) => {
            return (
              <CartItem key={String(index)}>
                <CartPageItemDescriptionContainer
                  data={item.product}
                  onChipSelected={(name, idx) => {
                    this.props.setNewAttributeSelectedIndex({
                      name,
                      idx,
                      id: item.id,
                    });
                  }}
                  activeCurrency={this.props.activeCurrency}
                />
                <CartAmountSelection
                  large
                  data={item.quantity}
                  onAddClick={() => {
                    this.props.addItemToCart({
                      product: item.product,
                      id: item.id,
                    });
                  }}
                  onRemoveClick={() => {
                    this.props.removeItemFromCart({
                      product: item.product,
                      id: item.id,
                    });
                  }}
                />
                <CartPageItemImageContainer data={item.product.data.gallery} />
              </CartItem>
            );
          })}
        </CartList>
        <CartAnalytics>
          <div>
            <AnalyticsText>
              Tax 21%: <strong> {}</strong>
            </AnalyticsText>
            <AnalyticsText>
              Quantity: <strong> {this.props.totalItemQuantity}</strong>
            </AnalyticsText>
            <AnalyticsText>
              Total:{" "}
              <strong>
                {" "}
                {`${getSymbolFromCurrency(this.props.activeCurrency)}${
                  Math.round((total + Number.EPSILON) * 100) / 100
                }`}
              </strong>
            </AnalyticsText>
            <Button style={{ color: "#fff" , fontSize: 14, fontWeight: 600}}>ORDER</Button>
          </div>
        </CartAnalytics>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);

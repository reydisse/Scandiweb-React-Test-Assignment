import React from "react";
import Chip from "./Chip";
import ChipSmall from "./chip-mini";
import "./styles/ChipGroup.css";

export default class ChipGroup extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.selectedIndex) {
      this.state = {
        selectedItemIndex: this.props.selectedIndex,
      };
    } else {
      this.state = {
        selectedItemIndex: 0,
      };
    }
  }

  componentDidMount() {
    if (this.props.defaultSelectChip) {
      this.props.defaultSelectChip(this.state.selectedItemIndex);
    }
  }

  selectChip(index) {
    this.setState({
      selectedItemIndex: index,
    });
    this.props.onSelectChip?.(index);
  }

  renderChip(index, item) {
    if (index === this.state.selectedItemIndex) {
      return (
        <Chip
          onClick={() => !this.props.disabled && this.selectChip(index)}
          mini={this.props.mini}
          selected
          label={item.value}
          key={String(index)}
        />
      );
    }
    return (
      <Chip
        label={item.value}
        mini={this.props.mini}
        onClick={() => !this.props.disabled && this.selectChip(index)}
        key={String(index)}
      />
    );
  }

  renderSwatch(index, item) {
    if (index === this.state.selectedItemIndex) {
      return (
        <ChipSmall
          onClick={() => !this.props.disabled && this.selectChip(index)}
          mini={this.props.mini}
          selected
          swatch
          background={item.value}
          key={String(index)}
        />
      );
    }
    return (
      <ChipSmall
        onClick={() => !this.props.disabled && this.selectChip(index)}
        mini={this.props.mini}
        swatch
        background={item.value}
        key={String(index)}
      />
    );
  }

  render() {
    return (
      <div className="chipgroup">
        {this.props.data.map((item, index) => {
          if (this.props.swatchGroup) {
            return this.renderSwatch(index, item);
          }
          return this.renderChip(index, item, "");
        })}
      </div>
    );
  }
}

import React from "react";

export class ROICalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasePrice: 400000,
      downPayment: 0.2
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(field) {
    const _this = this;
    return function(evt) {
      const newState = { [field]: evt.target.value };
      _this.setState(newState);
    };
  }

  render() {
    return (
      <div>
        <div>Purchase Price:</div>
        <input
          type="text"
          value={this.state.purchasePrice}
          onChange={this.handleChange("purchasePrice")}
        />
        <div>{this.state.purchasePrice}</div>
        <input
          type="text"
          value={this.state.downPayment}
          onChange={this.handleChange("downPayment")}
        />
        <div>{this.state.downPayment}</div>
        <div>
          Cash to Invest: {this.state.purchasePrice * this.state.downPayment}
        </div>
      </div>
    );
  }
}

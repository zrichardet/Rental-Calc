import React from "react";

export class ROICalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasePrice: 400000,
      downPayment: 0.2,
      monthlyIncome: 8000,
      monthlyExpenses: 4000
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
        <div>Down Payment</div>
        <input
          type="text"
          value={this.state.downPayment}
          onChange={this.handleChange("downPayment")}
        />
        <div>{this.state.downPayment}</div>
        <div>
          Cash to Invest: {this.state.purchasePrice * this.state.downPayment}
        </div>
        <div>Monthly Income</div>
        <input
          type="text"
          value={this.state.monthlyIncome}
          onChange={this.handleChange("monthlyIncome")}
        />
        <div>{this.state.monthlyIncome}</div>
        <div>Monthly Expenses</div>
        <input
          type="text"
          value={this.state.monthlyExpenses}
          onChange={this.handleChange("monthlyExpenses")}
        />
        <div>{this.state.monthlyExpenses}</div>
        <div>
          {this.state.monthlyIncome / this.state.monthlyExpenses}% Cash ROI
        </div>
      </div>
    );
  }
}

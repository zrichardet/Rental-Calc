import React from "react";

export class ROICalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasePrice: 400000,
      downPayment: 0.2,
      monthlyIncome: 8000,
      monthlyMortgage: 2000,
      capitalExpenditures: 0.08,
      maintenanceFee: 0.05,
      vacancyRate: 0.08,
      managementFee: 0.08
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
        <div>Monthly Mortgage</div>
        <input
          type="text"
          value={this.state.monthlyMortgage}
          onChange={this.handleChange("monthlyMortgage")}
        />
        <div>{this.state.monthlyMortgage}</div>
        <div>Management Fee</div>
        <input
          type="text"
          value={this.state.managementFee}
          onChange={this.handleChange("managementFee")}
        />
        <div>{this.state.managementFee * this.state.monthlyIncome}</div>
        <div>Maintenance Fee</div>
        <input
          type="text"
          value={this.state.maintenanceFee}
          onChange={this.handleChange("maintenanceFee")}
        />
        <div>{this.state.maintenanceFee * this.state.monthlyIncome}</div>
        <div>Vacancy Rate</div>
        <input
          type="text"
          value={this.state.vacancyRate}
          onChange={this.handleChange("vacancyRate")}
        />
        <div>{this.state.vacancyRate * this.state.monthlyIncome}</div>
        <div>Capital Expenditures</div>
        <input
          type="text"
          value={this.state.capitalExpenditures}
          onChange={this.handleChange("capitalExpenditures")}
        />
        <div>{this.state.capitalExpenditures * this.state.monthlyIncome}</div>
        <div>
          {this.state.monthlyIncome / this.state.monthlyMortgage}% Cash ROI
        </div>
      </div>
    );
  }
}

import React from "react";
import { LineChart, YAxis, XAxis, CartesianGrid, Line } from "recharts";

export class ROICalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasePrice: 400000,
      downPayment: 0.2,
      monthlyIncome: 8000,
      monthlyMortgage: 2000,
      capitalExpenditures: 0.08,
      maintenanceFee: 0.08,
      vacancyRate: 0.08,
      managementFee: 0.08,
      returnYears: 30
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(field) {
    const _this = this;
    return function(evt) {
      const newState = { [field]: parseFloat(evt.target.value) };
      _this.setState(newState);
    };
  }
  sumExpenses() {
    let totalExpenses =
      this.state.monthlyMortgage * 1 +
      this.state.monthlyIncome * this.state.vacancyRate +
      this.state.monthlyIncome * this.state.managementFee +
      this.state.monthlyIncome * this.state.maintenanceFee +
      this.state.monthlyIncome * this.state.capitalExpenditures;
    return totalExpenses;
  }
  calculateNOI() {
    return this.state.monthlyIncome * 12 - this.sumExpenses() * 12;
  }
  calculateROI() {
    let ROI =
      (this.calculateNOI() /
        (this.state.purchasePrice * this.state.downPayment)) *
      100;
    return ROI.toFixed(1);
  }
  makeReturnTable(years) {
    let table = [];
    [...Array(years).keys()].forEach(i => {
      let returnObject = {
        year: i,
        return: this.calculateNOI() * (i + 1)
      };
      table.push(returnObject);
    });

    return table;
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
          ${this.state.monthlyIncome - this.sumExpenses()} NOI per Month
        </div>
        <div>{this.calculateROI()}% Cash ROI</div>
        <h3>return</h3>
        <div>Years</div>
        <input
          type="text"
          value={this.state.returnYears}
          onChange={this.handleChange("returnYears")}
        />

        <LineChart
          width={500}
          height={300}
          data={this.makeReturnTable(this.state.returnYears)}
        >
          <XAxis dataKey="year" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="return" stroke="#8884d8" />
        </LineChart>
        <div>
          <table>
            <tr>
              <th>Year</th>
              <th>Profit</th>
            </tr>
            {this.makeReturnTable(this.state.returnYears).map(returnObject => {
              return (
                <tr>
                  <td>{returnObject.year + 1}</td>
                  <td>{returnObject.return}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    );
  }
}

import React from "react";
import { LineChart, YAxis, XAxis, CartesianGrid, Line } from "recharts";
import useStyles from "./styles";
import { TextField } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default function ROICalc() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    purchasePrice: 200000,
    downPayment: 0.2,
    monthlyIncome: 4000,
    monthlyMortgage: 1000,
    capitalExpenditures: 0.08,
    maintenanceFee: 0.08,
    vacancyRate: 0.08,
    managementFee: 0.08,
    returnYears: 30,
    loanAmount: 160000,
    loanTerm: 30,
    interestRate: 0.036
  });

  const handleChange = field => evt => {
    setValues({ ...values, [field]: parseFloat(evt.target.value) });
  };

  function sumExpenses() {
    let totalExpenses =
      values.monthlyMortgage * 1 +
      values.monthlyIncome * values.vacancyRate +
      values.monthlyIncome * values.managementFee +
      values.monthlyIncome * values.maintenanceFee +
      values.monthlyIncome * values.capitalExpenditures;
    return totalExpenses;
  }
  function calculateNOI() {
    return values.monthlyIncome * 12 - sumExpenses() * 12;
  }
  function calculateROI() {
    let ROI =
      (calculateNOI() / (values.purchasePrice * values.downPayment)) * 100;
    return ROI.toFixed(1);
  }
  function makeReturnTable(years) {
    let table = [];
    [...Array(years).keys()].forEach(i => {
      let returnObject = {
        year: i,
        return: calculateNOI() * (i + 1)
      };
      table.push(returnObject);
    });

    return table;
  }
  function SimpleAppBar() {
    const classes = useStyles();
  }

  function mortgagePayment() {
    let monthlyRate = values.interestRate / 12;
    let numOfPayments = values.loanTerm * 12;
    let numerator = monthlyRate * (1 + monthlyRate) ** numOfPayments;
    let denominator = (1 + monthlyRate) ** numOfPayments - 1;
    let principal = values.loanAmount * (numerator / denominator);
    return principal.toFixed(2);
  }

  function interestPayment() {
    let monthlyInterest = values.loanAmount * (values.interestRate / 12);
    return monthlyInterest.toFixed(2);
  }

  function principalPayment() {
    let principalPayment = mortgagePayment() - interestPayment();
    return principalPayment.toFixed(2);
  }
  function loanPaydown() {
    var i;
    for (i = 0; i < 30; i++) {
      values.loanAmount = values.loanAmount - principalPayment() * 12;
      return values.loanAmount.toFixed(2);
    }
  }

  function makeBalanceTable(years) {
    let table = [];
    [...Array(years).keys()].forEach(i => {
      let returnObject = {
        year: i,
        return: loanPaydown() * (i + 1)
      };
      table.push(returnObject);
    });

    return table;
  }

  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Real Estate Calculator
          </Typography>
        </Toolbar>
      </AppBar>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="purchase-price"
          label="Purchase Price"
          type="number"
          value={values.purchasePrice}
          onChange={handleChange("purchasePrice")}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
        <TextField
          id="down-payment"
          label="Down Payment"
          type="number"
          value={values.downPayment}
          onChange={handleChange("downPayment")}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
        <div>Cash to Invest: ${values.purchasePrice * values.downPayment}</div>
        <TextField
          id="income"
          label="Monthly Income"
          type="number"
          value={values.monthlyIncome}
          onChange={handleChange("monthlyIncome")}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
        <TextField
          id="mortgage"
          label="Monthly Mortgage"
          type="number"
          value={values.monthlyMortgage}
          onChange={handleChange("monthlyMortgage")}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
        <TextField
          id="management-fee"
          label="Management Fee"
          type="number"
          value={values.managementFee}
          onChange={handleChange("managementFee")}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
        <TextField
          id="maintenance-fee"
          label="Maintenance Fee"
          type="number"
          value={values.maintenanceFee}
          onChange={handleChange("maintenanceFee")}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
        <TextField
          id="vacancy-rate"
          label="Vacancy Rate"
          type="number"
          value={values.vacancyRate}
          onChange={handleChange("vacancyRate")}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
        <TextField
          id="cap-ex"
          label="Capital Expenditures"
          type="number"
          value={values.capitalExpenditures}
          onChange={handleChange("capitalExpenditures")}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
        <div>${values.monthlyIncome - sumExpenses()} NOI per Month</div>
        <div>{calculateROI()}% Cash ROI</div>
        <div>Years</div>
        <TextField
          id="years"
          label="Years"
          type="number"
          value={values.returnYears}
          onChange={handleChange("returnYears")}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
      </form>
      <LineChart
        width={500}
        height={300}
        data={makeReturnTable(values.returnYears + 1)}
      >
        <XAxis dataKey="year" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="return" stroke="#8884d8" />
      </LineChart>
      <TextField
        id="Lone-Amount"
        label="Loan Amount"
        type="number"
        value={values.loanAmount}
        onChange={handleChange("loanAmount")}
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
      />
      <TextField
        id="Loan-Term"
        label="Loan Term"
        type="number"
        value={values.loanTerm}
        onChange={handleChange("loanTerm")}
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
      />
      <TextField
        id="interest-rate"
        label="Interest Rate"
        type="number"
        value={values.interestRate}
        onChange={handleChange("interestRate")}
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
      />
      <div>Monthly Payment ${mortgagePayment()}</div>
      <div>Interest Payment ${interestPayment()}</div>
      <div>Principal Payment ${principalPayment()}</div>
      <div>Remaining Balance ${loanPaydown()}</div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Profit</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {makeReturnTable(values.returnYears).map(returnObject => {
              return (
                <tr key={returnObject.year}>
                  <td>{returnObject.year + 1}</td>
                  <td>{returnObject.return}</td>
                </tr>
              );
            })}
          </tbody>
          <tbody>
            {makeBalanceTable(values.returnYears).map(returnObject => {
              return (
                <tr key={returnObject.year}>
                  <td>{returnObject.year + 1}</td>
                  <td>{returnObject.return}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

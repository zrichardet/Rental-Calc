import React from "react";
import { LineChart, YAxis, XAxis, CartesianGrid, Line } from "recharts";
import useStyles from "./styles";
import { TextField } from "@material-ui/core";

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
    returnYears: 30
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
  return (
    <div>
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
        data={makeReturnTable(values.returnYears)}
      >
        <XAxis dataKey="year" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="return" stroke="#8884d8" />
      </LineChart>
      <div>
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Profit</th>
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
        </table>
      </div>
    </div>
  );
}

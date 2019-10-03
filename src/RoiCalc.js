import React from "react";
import { LineChart, YAxis, XAxis, CartesianGrid, Line } from "recharts";
import useStyles from "./styles";
import { TextField } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import * as calculators from "roicalc";
import { createStore } from "redux";

export default function ROICalc() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: "test",
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
    interestRate: 0.036,
    percentROI: 0.05
  });

  const handleChange = field => evt => {
    setValues({ ...values, [field]: parseFloat(evt.target.value) });
  };

  const marks = [
    {
      value: 0,
      label: "0%"
    },
    {
      value: 0.05,
      label: "5%"
    },
    {
      value: 0.1,
      label: "10%"
    },
    {
      value: 0.15,
      label: "15%"
    },
    {
      value: 0.2,
      label: "20%"
    },
    {
      value: 0.25,
      label: "25%"
    }
  ];

  function optimizeIncome(
    purchasePrice,
    downPayment,
    percentROI,
    totalExpenses
  ) {
    return (purchasePrice * downPayment * percentROI) / 100 + totalExpenses;
  }

  const totalExpenses = calculators.sumExpenses(
    values.monthlyMortgage,
    values.monthlyIncome,
    values.vacancyRate,
    values.managementFee,
    values.maintenanceFee,
    values.capitalExpenditures
  );

  // let store = createStore() {
  //   purchasePrice: 200000,
  //   downPayment: 0.2,
  //   monthlyIncome: 4000,
  //   monthlyMortgage: 1000,
  //   capitalExpenditures: 0.08,
  //   maintenanceFee: 0.08,
  //   vacancyRate: 0.08,
  //   managementFee: 0.08,
  //   returnYears: 30,
  //   loanAmount: 160000,
  //   loanTerm: 30,
  //   interestRate: 0.036,
  //   percentROI: 0.05
  // };
  // store.subscribe(() => console.log(store.getState()));
  // store.dispatch();

  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Real Estate Calculator
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid item xs>
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
          <div>
            Cash to Invest: ${values.purchasePrice * values.downPayment}{" "}
          </div>
          <div>
            Loan Amount $
            {values.purchasePrice - values.purchasePrice * values.downPayment}{" "}
          </div>
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
          <div>
            Mortgage Payment $
            {calculators.mortgagePayment(
              values.interestRate,
              values.loanTerm,
              values.loanAmount
            )}
          </div>
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
          <div>
            $
            {values.monthlyIncome -
              calculators.sumExpenses(
                values.monthlyMortgage,
                values.monthlyIncome,
                values.vacancyRate,
                values.managementFee,
                values.maintenanceFee,
                values.capitalExpenditures
              )}{" "}
            NOI per Month
          </div>
          <div>
            {calculators.calculateROI(
              values.monthlyIncome,
              values.purchasePrice,
              values.downPayment,
              calculators.sumExpenses(
                values.monthlyMortgage,
                values.monthlyIncome,
                values.vacancyRate,
                values.managementFee,
                values.maintenanceFee,
                values.capitalExpenditures
              )
            )}
            % Cash ROI
          </div>
          <br />
          <Typography id="discrete-slider-always" gutterBottom>
            Desired ROI
          </Typography>
          <br />
          <Grid item sm={6} display="inline">
            <Slider
              className={classes.root}
              defaultValue={0.05}
              Value={values.percentROI}
              onChange={handleChange("percentROI")}
              label="discrete-slider-always"
              align="center"
              step={0.01}
              marks={marks}
              min={0}
              max={0.3}
              valueLabelDisplay="on"
            />
          </Grid>
          <div>
            {optimizeIncome(
              values.purchasePrice,
              values.downPayment,
              values.percentROI
            )}
          </div>
        </form>
        <LineChart
          width={500}
          height={300}
          data={calculators.makeReturnTable(values.loanTerm + 1)}
        >
          <XAxis dataKey="year" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="return" stroke="#8884d8" />
        </LineChart>
        {/* <div>
        Interest Payment $
        {calculators.interestPayment(values.loanAmount, values.interestRate)}
      </div>
      <div>
        Principal Payment $
        {calculators.principalPayment(
          values.loanAmount,
          values.loanTerm,
          values.interestRate
        )}
      </div>
      <div>
        Remaining Balance $
        {calculators.loanPaydown(
          values.loanAmount,
          values.loanTerm,
          values.interestRate
        )}
      </div> */}
        <div>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Profit</th>
                <th>Loan Balance</th>
              </tr>
            </thead>
            <tbody>
              {calculators
                .makeReturnTable(
                  values.loanTerm,
                  values.monthlyIncome,
                  totalExpenses
                )
                .map(returnObject => {
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
      </Grid>
    </div>
  );
}

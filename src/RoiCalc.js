import React, { useEffect, componentWillMount } from "react";
import axios from "axios";
// import { LineChart, YAxis, XAxis, CartesianGrid, Line } from "recharts";
import useStyles from "./styles";
import { TextField } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grid from "@material-ui/core/Grid";
import * as calculators from "roicalc";
// import { createStore } from "redux";
// import { separateMessageFromStack } from "jest-message-util";
// import { convertPatternGroupToTask } from "fast-glob/out/managers/tasks";

export default function ROICalc() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [values, setValues] = React.useState({
    componentWillMount() {
      setValues({ ...values.data, loaded: true, saveSuccessful: false });
    }
  });

  const fetchCalculation = () => {
    axios({
      url: "/calculation/test",
      method: "get"
    }).then(
      response => {
        setValues({ ...response.data, loading: false });
      },
      error => {
        console.log(error);
      }
    );
  };

  const saveCalculation = () => {
    axios({
      url: "/calculation/test",
      method: "post",
      data: values
    }).then(
      () => {
        setValues({ ...values, saveSuccessful: true });
      },
      error => {
        console.log(error);
      }
    );
  };

  //3. A drop down with report name 'test'
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  //1. {loading:true}

  useEffect(() => {
    fetchCalculation();
  }, []);

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
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              ref={anchorRef}
              aria-controls="menu-list-grow"
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                keepMounted
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom"
                    }}
                  >
                    <Paper id="menu-list-grow">
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={handleClose}>
                            <a href="calculate-test.json">Test</a>
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Real Estate Calculator
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <div>
        <form>
          <TextField
            required
            id="property-address"
            label="Address 1"
            type="object"
            value={values.addressOne}
            onChange={handleChange("addressOne")}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="property-address-2"
            label="Address 2"
            type="object"
            value={values.addressTwo}
            onChange={handleChange("addressTwo")}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <div></div>
          <TextField
            required
            id="property-city"
            label="City"
            type="object"
            value={values.propertyCity}
            onChange={handleChange("propertyCity")}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            required
            id="property-state"
            label="State"
            type="object"
            value={values.propertyState}
            onChange={handleChange("propertyState")}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            required
            id="property-zip"
            label="Zip Code"
            type="number"
            value={values.propertyZip}
            onChange={handleChange("propertyZip")}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </form>
      </div>
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
          <div>
            <button
              onClick={evt => {
                evt.preventDefault();
                saveCalculation();
              }}
            >
              Save
            </button>
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
        {/* <LineChart
          width={500}
          height={300}
          data={calculators.makeReturnTable(values.loanTerm + 1)}
        >
          <XAxis dataKey="year" />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="return" stroke="#8884d8" />
        </LineChart> */}
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

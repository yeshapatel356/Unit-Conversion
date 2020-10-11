import React from "react";
import "./styles.css";
const measurement = {
  m: "Meter",
  km: "KiloMeter",
};

function toKilometer(meter) {
  return meter / 1000;
}
function toMeter(kilometer) {
  return kilometer * 1000;
}

function tryConvert(unit, convert) {
  const input = parseFloat(unit);
  console.log(input);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  console.log("output", output);
  return output.toString();
}

function WalkingDistance(props) {
  if (props.meter >= 2000) {
    return <p>You can take cab</p>;
  }
  return <p>You can walk </p>;
}

class Converstion extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onUnitChange(e.target.value);
  }

  render() {
    const scale = this.props.scale;
    const unit = this.props.unit;
    return (
      <fieldset style={{ textAlign: "center", width: "50%", margin: "2rem" }}>
        <legend>Enter in {measurement[scale]}</legend>
        <input value={unit} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class UnitCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleMeterChange = this.handleMeterChange.bind(this);
    this.handleKilometerChange = this.handleKilometerChange.bind(this);
    this.state = {
      scale: "m",
      unit: "",
    };
  }
  handleMeterChange(unit) {
    this.setState({
      scale: "m",
      unit,
    });
  }

  handleKilometerChange(unit) {
    this.setState({
      scale: "km",
      unit,
    });
  }

  render() {
    const scale = this.state.scale;
    const unit = this.state.unit;
    const meter = scale === "km" ? tryConvert(unit, toMeter) : unit;
    const kilometer = scale === "m" ? tryConvert(unit, toKilometer) : unit;
    return (
      <div className="App">
        <h1 style={{ textDecoration: "underline", textAlign: "center" }}>
          Enter Distance You Wants To Travel
        </h1>
        <Converstion
          scale="m"
          unit={meter}
          onUnitChange={this.handleMeterChange}
        />
        <Converstion
          scale="km"
          unit={kilometer}
          onUnitChange={this.handleKilometerChange}
        />
        <h4>Confused whether to walk or take Cab?</h4>
        <WalkingDistance meter={parseFloat(meter)} />
      </div>
    );
  }
}

export default UnitCalculator;

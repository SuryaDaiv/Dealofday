import React from "react";
import PropTypes from "prop-types";
// import { getFunName } from "../helpers";

class StorePickerHead extends React.Component {
  // myInput = React.createRef();
  static propTypes = {
    history: PropTypes.object
  };
  saveScroll = event => {
      };
  render() {
    return (
      <form className="store-selector" onSubmit={this.saveScroll}>
      <h1>Choose the deal you want to see</h1>
      <label>
        <select required
         onChange={this.props.goToStore}>
          <option value="" selected></option>
          <option value="Fish market">Fish market</option>
          <option value="Electronics market">Electronics market</option>
        </select>
      </label>
      <button type="submit">Visit Store →</button>
    </form>

    );
  }
}

export default StorePickerHead;

{/* <form className="store-selector" onSubmit={this.goToStore}>
<h2>Please Enter A Store</h2>
<input
  type="text"
  ref={this.myInput}
  required
  placeholder="Store Name"
  defaultValue="fish store"
/>
<button type="submit">Visit Store →</button>
</form> */}
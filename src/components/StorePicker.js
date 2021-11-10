import React from "react";
import PropTypes from "prop-types";
// import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  myInput = React.createRef();
  static propTypes = {
    history: PropTypes.object
  };

  goToStore = event => {
    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. get the text from that input
    const storeName = this.myInput.current.value;
    // 3. Change the page to /store/whatever-they-entered
    this.props.history.push(`/store/${storeName}`);
  };
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
      <h1>Choose the deal you want to see</h1>
      <label>
        <select required ref={this.myInput}>
          <option value="" selected></option>
          <option value="Fish market">Fish market</option>
          <option value="Electronics market">Electronics market</option>
        </select>
      </label>
      <button type="submit">Visit Store →</button>
    </form>

      // <form className="store-selector" onSubmit={this.goToStore}>
      //   <h2>Please Enter A Store</h2>
      //   <input
      //     type="text"
      //     ref={this.myInput}
      //     required
      //     placeholder="Store Name"
      //     // defaultValue={getFunName()}
      //     defaultValue="Fish market"
      //   />
      //   <button type="submit">Visit Store →</button>
      // </form>
    );
  }
}

export default StorePicker;

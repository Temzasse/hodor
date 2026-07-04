import React from "react";
class Dialog extends React.Component {
  closeDialog() {}
  render() {
    return <button onClick={() => this.closeDialog()}>Close</button>;
  }
}

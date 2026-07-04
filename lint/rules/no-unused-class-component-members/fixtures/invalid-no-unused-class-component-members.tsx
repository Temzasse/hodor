// hodor-test expect-message: is never used
import React from "react";
class Dialog extends React.Component {
  closeDialog() {}
  render() {
    return <button>Close</button>;
  }
}

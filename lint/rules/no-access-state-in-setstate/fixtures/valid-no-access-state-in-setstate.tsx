import React from "react";

class Counter extends React.Component {
  increment() {
    this.setState((state) => ({ count: state.count + 1 }));
  }
}

import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <Container fluid>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

import React, { Component } from 'react';

import ErrorModal from '../components/ErrorModal/ErrorModal';

const formErrorHandlerHOC = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentDidMount() {
      axios.interceptors.response.use(
        (res) => res,
        (err) => {
          if (err.code) {
            return this.setState({ error: 'Request Timeout!' }); // for handling the timeout situation while fetching data from api
          }
          this.setState({ error: err.response.data.message });
        }
      );
    }

    closeErrorModal = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <React.Fragment>
          {this.state.error ? (
            <ErrorModal
              errorMessage={this.state.error}
              handleModal={this.closeErrorModal}
            />
          ) : null}
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};

export default formErrorHandlerHOC;

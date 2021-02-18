import React, { Component } from 'react';

import ErrorModal from '../../components/ErrorModal/ErrorModal';

const errorHandlerHOC = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
      };
      //setting the interceptors in the constructor
      this.interceptor = axios.interceptors.response.use(
        (res) => res,
        (err) => {
          if (err.code) {
            return this.setState({ error: 'Request Timeout!' }); // for handling the timeout situation while fetching data from api
          }
          this.setState({ error: err.response.data.message });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.interceptors);
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

export default errorHandlerHOC;

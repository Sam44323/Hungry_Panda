import React, { Component } from 'react';

import ErrorModal from '../../components/ErrorModal/ErrorModal';

const errorHandlerHOC = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
      };
      this.interceptor = axios.interceptors.response.use(
        (res) => res,
        (err) => {
          console.dir(err);
          if (err.data) {
            this.setState({ error: err.response.data.message });
          }
          this.setState({ error: 'Please try again after some time!' });
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

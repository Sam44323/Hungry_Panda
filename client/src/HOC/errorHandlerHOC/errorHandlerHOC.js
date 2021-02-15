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
      axios.interceptors.request.use(
        (req) => {
          this.setState({ error: null });
          return req;
        },
        (err) => {
          console.log(err);
          return Promise.reject(err);
        }
      );
      axios.interceptors.response.use(
        (res) => res,
        (err) => {
          this.setState({ error: err.response.data.message });
          return Promise.reject(err);
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

export default errorHandlerHOC;

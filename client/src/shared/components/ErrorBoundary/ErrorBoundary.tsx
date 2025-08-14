import React, { Component, ErrorInfo, ReactNode } from "react";
import ErrorBoundaryContent from "./ErrorBoundaryContent/ErrorBoundaryContent";

interface ErrorBoundaryState {
  error: Error;
  errorInfo: ErrorInfo;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { errorInfo, error } = this.state;
    const { children } = this.props;
    if (errorInfo) {
      return <ErrorBoundaryContent error={error} errorInfo={errorInfo} />;
    }
    return children;
  }
}

export default ErrorBoundary;

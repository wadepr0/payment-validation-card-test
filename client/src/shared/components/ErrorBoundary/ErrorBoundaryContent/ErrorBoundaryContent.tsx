import React, { ErrorInfo, FC } from "react";

interface IErrorBoundaryContent {
  error: Error;
  errorInfo: ErrorInfo;
}

const ErrorBoundaryContent: FC<IErrorBoundaryContent> = ({
  error,
  errorInfo,
}) => {
  const updatePage = () => {
    window.location.reload();
  };

  return (
    <div className="h-screen w-full overflow-auto p-2.5">
      <div className='"flex justify-between items-center"'>
        <h3>Произошла ошибка.</h3>
        <button type="button" onClick={updatePage}>
          Обновить
        </button>
      </div>
      <details className="whitespace-pre-wrap text-sm cursor-pointer">
        {error && error.toString()}
        <br />
        {errorInfo.componentStack}
      </details>
    </div>
  );
};

export default ErrorBoundaryContent;

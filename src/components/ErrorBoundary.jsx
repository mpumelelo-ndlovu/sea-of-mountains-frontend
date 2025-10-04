// src/components/ErrorBoundary.jsx
import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        
        // Log to error tracking service (e.g., Sentry)
        if (window.Sentry) {
            window.Sentry.captureException(error);
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
                            <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                        </div>
                        <h1 className="text-xl font-semibold text-center text-gray-900 mt-4">
                            Oops! Something went wrong
                        </h1>
                        <p className="text-sm text-gray-600 text-center mt-2">
                            We're sorry for the inconvenience. Please try refreshing the page.
                        </p>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-4 text-xs text-gray-500">
                                <summary className="cursor-pointer">Error details</summary>
                                <pre className="mt-2 whitespace-pre-wrap">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                                </pre>
                            </details>
                        )}
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full mt-6 bg-ocean-blue text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center min-h-screen bg-[#F6F8FB]">
          <div className="text-center max-w-md p-8">
            {/* Icon */}
            <div className="text-6xl mb-4">😅</div>
            
            <h2 className="text-2xl font-bold text-[#1F2937] mb-2">
              Shoot! Well, this is unexpected...
            </h2>
            
            <p className="text-[#6B7280] mb-4">
              Error code 500. An error has occurred and we're working to fix the problem! We'll be up and running shortly.
            </p>
            
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-2.5 bg-[#2F6BFF] text-white rounded-[8px] hover:bg-[#1A5AEE] transition-colors"
            >
              Go back home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
import React from 'react';
import RootNavigator from './src/app/navigation/RootNavigator';

import { ErrorBoundary } from './src/shared/components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <RootNavigator />
    </ErrorBoundary>
  );
}

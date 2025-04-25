// src/App.tsx

import { QueryProvider } from './providers/QueryProvider';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-4">DriveDeck</h1>
            <p className="text-center text-gray-600">Testing Tailwind CSS v4</p>
          </div>
        </div>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;
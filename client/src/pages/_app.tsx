import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import { TaskProvider } from '../context/TaskContext';
import '../app/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <TaskProvider>
        <Component {...pageProps} />
      </TaskProvider>
    </AuthProvider>
  );
}

export default MyApp;

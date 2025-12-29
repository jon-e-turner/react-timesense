import LoadingScreen from '@/components/loading-screen';
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { StrictMode, Suspense } from 'react';
import { initDatabaseConnection } from '../data-providers/sqlite-provider';

export default function RootLayout() {
  const DATABASE_NAME = 'time-sense.db';

  return (
    <StrictMode>
      <Suspense fallback={<LoadingScreen />}>
        <SQLiteProvider
          databaseName={DATABASE_NAME}
          onInit={initDatabaseConnection}
          useSuspense={true}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SQLiteProvider>
      </Suspense>
    </StrictMode>
  );
}

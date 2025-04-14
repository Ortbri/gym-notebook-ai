// providers/TinyBaseStoreProvider.tsx
import * as SQLite from 'expo-sqlite';
import { createMergeableStore } from 'tinybase/mergeable-store';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite';
import { useCreateMergeableStore, useCreatePersister, useProvideStore } from 'tinybase/ui-react';

import { db } from '../constants/db';

export function TinyBaseStoreProvider({ children }: { children: React.ReactNode }) {
  const store = useCreateMergeableStore(() => createMergeableStore());

  useCreatePersister(
    store,
    () => createExpoSqlitePersister(store, SQLite.openDatabaseSync(db.DB_NAME)),
    [],
    async (persister) => {
      await persister.load();
      await persister.startAutoSave();
    }
  );

  useProvideStore(db.STORE_ID, store);

  return children;
}

// export const useTinybaseStore = () => {
//   const store = useProvideStore(db.STORE_ID, store);
//   return store;
// };

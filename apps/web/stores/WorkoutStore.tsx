import * as UiReact from 'tinybase/ui-react/with-schemas';
import { createMergeableStore } from 'tinybase/with-schemas';
import { useCreateClientPersisterAndStart } from './persistence/useCreateClientPersisterAndStart';
import { useCreateServerSynchronizerAndStart } from './synchronization/useCreateServerSynchronizerAndStart';

export const WORKOUT_STORE_ID = 'workoutStore';

const WORKOUTS_VALUES_SCHEMA = {
  lastUpdated: { type: 'string' },
} as const;

const WORKOUTS_TABLE_SCHEMA = {
  workouts: {
    excercise: { type: 'string' },
    short_demo: { type: 'string' },
    long_demo: { type: 'string' },
    difficulty: { type: 'string' },
    muscle_group: { type: 'string' },
    muscle_1: { type: 'string' },
    muscle_2: { type: 'string' },
    muscle_3: { type: 'string' },
    equipment_main: { type: 'string' },
    equipment_main_qty: { type: 'number' },
    equipment_secondary: { type: 'string' },
    equipment_secondary_qty: { type: 'number' },
    posture: { type: 'string' },
    arm_type: { type: 'string' },
    arm_mode: { type: 'string' },
    grip: { type: 'string' },
    load_position: { type: 'string' },
    leg_mode: { type: 'string' },
    foot_elevation: { type: 'string' },
    combo_type: { type: 'string' },
    pattern_1: { type: 'string' },
    pattern_2: { type: 'string' },
    pattern_3: { type: 'string' },
    plane_1: { type: 'string' },
    plane_2: { type: 'string' },
    plane_3: { type: 'string' },
    region: { type: 'string' },
    force_type: { type: 'string' },
    mechanics: { type: 'string' },
    laterality: { type: 'string' },
    category: { type: 'string' },
  },
} as const;

type Schemas = [typeof WORKOUTS_TABLE_SCHEMA, typeof WORKOUTS_VALUES_SCHEMA];
type WorkoutCellId = keyof (typeof WORKOUTS_TABLE_SCHEMA)['workouts'];

const {
  useCell,
  useCreateMergeableStore,
  useProvideStore,
  useSetCellCallback,
  useSetValueCallback,
  useSortedRowIds,
  useTable,
  useValue,
} = UiReact as UiReact.WithSchemas<Schemas>;

export const WorkoutStoreProvider = () => {
  const store = useCreateMergeableStore(() =>
    createMergeableStore()
      .setTablesSchema(WORKOUTS_TABLE_SCHEMA)
      .setValuesSchema(WORKOUTS_VALUES_SCHEMA)
  );

  useCreateClientPersisterAndStart(WORKOUT_STORE_ID, store);
  useCreateServerSynchronizerAndStart(WORKOUT_STORE_ID, store);
  useProvideStore(WORKOUT_STORE_ID, store);

  return null;
};

/* ------------------ HOOKS ------------------ */

export const useWorkoutPage = (offset: number, limit: number = 200) => {
  const ids = useSortedRowIds('workouts', undefined, false, undefined, undefined, WORKOUT_STORE_ID);
  const table = useTable('workouts', WORKOUT_STORE_ID);
  return ids.slice(offset, offset + limit).map((id) => ({ id, ...table[id] }));
};

export const useWorkoutCell = (rowId: string, cellId: WorkoutCellId) => {
  return useCell('workouts', rowId, cellId, WORKOUT_STORE_ID);
};

export const useUpdateLastUpdated = () => {
  return useSetValueCallback('lastUpdated', () => new Date().toISOString(), [], WORKOUT_STORE_ID);
};

export const useLastUpdated = () => {
  return useValue('lastUpdated', WORKOUT_STORE_ID);
};

// ⚠️ DEV ONLY
export const useAllWorkouts = () => {
  const table = useTable('workouts', WORKOUT_STORE_ID);
  return Object.entries(table).map(([id, row]) => ({ id, ...row }));
};

export const useSetWorkoutCell = (rowId: string, cellId: WorkoutCellId) => {
  return useSetCellCallback(
    'workouts',
    rowId,
    cellId,
    (newValue: UiReact.CellValue<Schemas, 'workouts', typeof cellId>) => newValue,
    [],
    WORKOUT_STORE_ID
  );
};

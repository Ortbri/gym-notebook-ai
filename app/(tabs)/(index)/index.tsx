import WorkoutPostItem from '@/components/custom/WorkoutPostitem';
import { FlatList } from 'react-native';

/* -------------------------------------------------------------------------- */
/*                                    HOME                                    */
/* -------------------------------------------------------------------------- */
export default function Home() {
  return (
    <FlatList
      data={Array.from({ length: 10 })}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        gap: 14,
        paddingHorizontal: 10,
        paddingTop: 14,
        paddingBottom: 14,
      }}
      renderItem={({ index }) => <WorkoutPostItem key={index.toString()} />}
    />
  );
}

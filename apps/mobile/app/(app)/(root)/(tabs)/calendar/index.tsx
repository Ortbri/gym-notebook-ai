import { subMonths } from 'date-fns';
import { Link, Stack, useRouter } from 'expo-router';
import { View, TouchableOpacity, Pressable, FlatList } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import ChatListItem from '~/components/ChatListItem';
import { IconSymbol } from '~/components/IconSymbol';
import { Text } from '~/components/ui/Text';
import { useGenerateWeeks } from '~/components/week-calendar/utils';
import { useShoppingListIds } from '~/stores/ListsStore';

// const Day = memo(({ day, isActive }: { day: Date; isActive: boolean }) => {
//   return (
//     <View style={styles.dayContainer}>
//       <Text style={{ textAlign: 'center', fontSize: 16, paddingVertical: 6 }}>
//         {day.toLocaleDateString()}
//       </Text>
//       <Text
//         style={{
//           textAlign: 'center',
//           fontSize: 14,
//           paddingVertical: 6,
//           opacity: 0.5,
//         }}>
//         {isActive ? 'Active' : 'Inactive'}
//       </Text>
//     </View>
//   );
// });

function EmptyChatListItem() {
  const router = useRouter();
  const { theme } = useUnistyles();
  const lastMessage =
    "I've analyzed your workout routine and have some suggestions to improve your strength gains.";
  const timestamp = new Date();
  const unreadCount = 3;

  return (
    <TouchableOpacity
      style={styles.chatItemContainer}
      onPress={() => {
        router.navigate('/(app)/(root)/chat/1');
      }}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <IconSymbol
            // @ts-ignore
            name="brain.head.profile"
            size={22}
            color={theme.colors.text.inverse}
          />
          {/* <Text style={styles.avatarText}>AI</Text> */}
        </View>
      </View>
      <View style={styles.chatContentContainer}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatTitle}>Gym Assistant</Text>
          <Text style={styles.chatTimestamp}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
        <Text style={styles.chatPreview} numberOfLines={2}>
          {lastMessage}
        </Text>
      </View>
      {unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const Page = () => {
  const weeks = useGenerateWeeks(subMonths(new Date(), 5), new Date());

  const renderDay = ({ day, isActive }: { day: Date; isActive: boolean }) => {
    return <Day day={day} isActive={isActive} />;
  };

  // const shoppingListIds = useShoppingListIds();
  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerLeft: () => (
            <Link href="/(app)/(root)/listB/new" style={{}} asChild>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
                onLongPress={() => {
                  // console.log('long pressed');
                }}>
                <Text style={styles.text}>Today</Text>
                {/* <IconSymbol name="plus" size={24} weight="bold" /> */}
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      {/* <View style={styles.container}> */}
      {/* <EmptyChatListItem /> */}
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        // data={shoppingListIds}
        contentContainerStyle={{
          paddingTop: 16,
          paddingHorizontal: 16,
          gap: 16,
          paddingBottom: 40,
          // gap: 500,
          // paddingTop: 100,
        }}
        ListEmptyComponent={<EmptyChatListItem />}
        renderItem={({ item }) => <ChatListItem listId={item} />}
      />
      {/* </View> */}
    </>
  );
};
const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    paddingTop: rt.insets.top + 40,
    paddingBottom: rt.insets.bottom,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    fontFamily: theme.fonts.SourGummyBold,
  },
  dayContentStyle: {
    height: 600,
  },
  dayContainer: {
    backgroundColor: theme.colors.bg.primary,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarScreen: {
    height: rt.screen.height - 140,
  },
  chatItemContainer: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: theme.colors.bg.secondary,
    borderRadius: theme.radius.lg,
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.md,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  avatarContainer: {
    marginRight: theme.spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.accent.regular,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: theme.colors.text.inverse,
    fontSize: theme.fontSize.md,
    fontWeight: 'bold',
  },
  chatContentContainer: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  chatTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  chatTimestamp: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.tertiary,
  },
  chatPreview: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
  unreadBadge: {
    backgroundColor: theme.colors.accent.regular,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.sm,
  },
  unreadText: {
    color: theme.colors.text.inverse,
    fontSize: theme.fontSize.xs,
    fontWeight: 'bold',
  },
}));

export default Page;

/* <Calendar
        weeks={weeks}
        offsetPageLimit={7}
        onDateChange={(date) => {
          console.log(`New date: ${date.toLocaleDateString()}`);
        }}
        dimWeekends
        initialDate={new Date()}>
        <Calendar.Strip style={{ paddingTop: 14 }} />
        <Calendar.Screen containerStyle={styles.calendarScreen} renderDay={renderDay} />
      </Calendar> */

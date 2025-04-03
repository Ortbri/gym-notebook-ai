import * as Burnt from 'burnt';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import * as DropdownMenu from 'zeego/dropdown-menu';
type MoreButtonProps = {
  pageName: string;
};

export default function MoreButton({ pageName }: MoreButtonProps) {
  const router = useRouter();
  const { theme } = useUnistyles();
  const [open, setOpen] = useState(false);
  const copyToClipboard = async (text: string) => {
    const path = `gym-notebook://(main)/(tabs)/${pageName}`;
    await Clipboard.setStringAsync(path);
    Burnt.toast({
      title: 'Copied to clipboard',
      preset: 'done',
      haptic: 'success',
      duration: 2,
    });
  };
  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger>
        <TouchableOpacity style={styles.trigger}>
          <SymbolView tintColor={theme.colors.text.primary} name="ellipsis.circle" />
        </TouchableOpacity>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item key="copy" onSelect={() => copyToClipboard(pageName)}>
          <DropdownMenu.ItemIcon
            // name="chat"
            ios={{
              name: 'link',
              // color: 'red',
              // iconSize: 14,
              pointSize: 14,
            }}
            // size={24}
            // color={theme.colors.text.primary}
          />
          <DropdownMenu.ItemTitle>Copy Link</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>

        <DropdownMenu.Group>
          <DropdownMenu.Item key="chat" onSelect={() => router.push('/chat/current')}>
            <DropdownMenu.ItemIcon
              // name="chat"
              ios={{
                name: '0.circle',
                // color: 'red',
                // iconSize: 14,
                // pointSize: 14,
              }}
              // size={24}
              // color={theme.colors.text.primary}
            />
            <DropdownMenu.ItemTitle>Item Title</DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
          <DropdownMenu.Item key="test" onSelect={() => router.push('/chat/current')}>
            <DropdownMenu.ItemIcon
              // name="chat"
              ios={{
                name: '0.circle',
                // color: 'red',
                // iconSize: 14,
                pointSize: 14,
              }}
              // size={24}
              // color={theme.colors.text.primary}
            />
            <DropdownMenu.ItemTitle>Item Title</DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  trigger: {
    // padding: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.bg.primary,
  },
  itemTitle: {
    color: theme.colors.text.primary,
  },
}));

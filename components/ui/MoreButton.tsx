import * as Burnt from 'burnt';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import * as DropdownMenu from 'zeego/dropdown-menu';

type MoreButtonProps = {
  pageName: string;
};

export default function MoreButton({ pageName }: MoreButtonProps) {
  const router = useRouter();
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
          <SymbolView tintColor="black" name="ellipsis.circle" />
        </TouchableOpacity>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item key="copy" onSelect={() => copyToClipboard(pageName)}>
          <DropdownMenu.ItemIcon
            ios={{
              name: 'link',
              pointSize: 14,
            }}
          />
          <DropdownMenu.ItemTitle>Copy Link</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>

        <DropdownMenu.Group>
          <DropdownMenu.Item key="chat" onSelect={() => router.push('/chat/current')}>
            <DropdownMenu.ItemIcon
              ios={{
                name: '0.circle',
                pointSize: 14,
              }}
            />
            <DropdownMenu.ItemTitle>Item Title</DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
          <DropdownMenu.Item key="test" onSelect={() => router.push('/chat/current')}>
            <DropdownMenu.ItemIcon
              ios={{
                name: '0.circle',
                pointSize: 14,
              }}
            />
            <DropdownMenu.ItemTitle>Item Title</DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

const styles = StyleSheet.create({
  trigger: {
    borderRadius: 10,
    backgroundColor: 'white', // Default background color, adjust as needed
  },
  itemTitle: {
    color: 'black', // Default text color, adjust as needed
  },
});

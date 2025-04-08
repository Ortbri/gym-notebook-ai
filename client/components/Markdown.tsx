'use client';

import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Typography } from './Typography';

interface MarkdownProps {
  children: string;
  done?: boolean;
}

export default function MarkdownText({ children, done }: MarkdownProps) {
  // Split the text into paragraphs
  const paragraphs = children.split('\n\n');

  return (
    <View style={{ paddingHorizontal: 16 }}>
      {paragraphs.map((paragraph, index) => {
        // Check for markdown patterns
        if (paragraph.startsWith('> ')) {
          // Blockquote
          return (
            <View key={index} style={styles.blockquote}>
              <Typography>{paragraph.substring(2)}</Typography>
            </View>
          );
        } else if (paragraph.startsWith('```')) {
          // Code block
          return (
            <View key={index} style={styles.codeBlock}>
              <Typography>{paragraph.substring(3)}</Typography>
            </View>
          );
        } else {
          // Regular paragraph
          return (
            <Typography key={index} style={styles.text}>
              {paragraph}
            </Typography>
          );
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    paddingHorizontal: 16,
  },
  text: {
    marginVertical: 8,
    color: theme.colors.text.primary,
  },
  codeBlock: {
    backgroundColor: theme.colors.bg.secondary,
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  blockquote: {
    backgroundColor: theme.colors.bg.secondary,
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
}));

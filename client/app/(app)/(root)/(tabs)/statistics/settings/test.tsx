import React from 'react';
import { ScrollView } from 'react-native';

import { Button } from '~/components/ui/Button';
import { Text } from '~/components/ui/Text';

export default function Test() {
  return (
    <ScrollView style={{ padding: 16 }} contentInsetAdjustmentBehavior="automatic">
      {/* <Text size="h1">H1</Text>
      <Text size="h2">H2</Text>
      <Text size="h3">H3</Text>
      <Text size="h4">H4</Text>
      <Text size="lead">Lead</Text>
      <Text size="p">Paragraph</Text>
      <Text size="blockquote" isBold>
        Blockquote
      </Text>
      <Text size="inlineCode">Inline Code</Text>
      <Text size="code">Code</Text>
      <Text size="caption" isBold>
        Caption
      </Text> */}
      <Button title="Test" variant="primary">
        Text
      </Button>
    </ScrollView>
  );
}

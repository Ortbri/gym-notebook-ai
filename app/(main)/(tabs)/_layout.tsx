import React from 'react';

import Tabs from '~/components/nav/Tabs';

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
    </Tabs>
  );
};

export default TabsLayout;

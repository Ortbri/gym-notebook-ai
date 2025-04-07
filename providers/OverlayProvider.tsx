import React, { useState, useCallback, createContext, useContext } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

export interface OverlayView {
  id: string;
  component: React.ReactNode;
  style?: ViewStyle;
}

interface OverlayContextType {
  views: OverlayView[];
  addOverlay: (view: Omit<OverlayView, 'id'>) => string;
  removeOverlay: (id: string) => void;
}

export const OverlayContext = createContext<OverlayContextType>({
  views: [],
  addOverlay: () => '',
  removeOverlay: () => {},
});

export const useOverlay = () => useContext(OverlayContext);

export const OverlayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [views, setViews] = useState<OverlayView[]>([]);

  const addOverlay = useCallback((view: Omit<OverlayView, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setViews((prev) => [...prev, { ...view, id }]);
    return id;
  }, []);

  const removeOverlay = useCallback((id: string) => {
    setViews((prev) => prev.filter((view) => view.id !== id));
  }, []);

  return (
    <OverlayContext.Provider value={{ views, addOverlay, removeOverlay }}>
      <View style={styles.container}>
        {children}
        {views.map((view) => (
          <View key={view.id} style={[styles.overlay, view.style]}>
            {view.component}
          </View>
        ))}
      </View>
    </OverlayContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
});

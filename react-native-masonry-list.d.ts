declare module 'react-native-masonry-list' {
  import { ComponentType } from 'react';

  interface MasonryListProps {
    images: Array<{ uri: string; id: string; dimensions?: { width: number; height: number } }>;
    onPressImage?: (item: { uri: string; id: string }) => void;
    spacing?: number;
    columns?: number;
    containerWidth?: number;
    renderIndividualHeader?: (item: any) => React.ReactNode;
    onEndReached?: () => void;
    onEndReachedThreshold?: number;
    refreshing?: boolean;
    masonryFlatListProps?: any;
  }

  const MasonryList: ComponentType<MasonryListProps>;

  export default MasonryList;
}
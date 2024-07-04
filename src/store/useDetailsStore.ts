import { mountStoreDevtool } from 'simple-zustand-devtools';
import { createStore } from './createStore';
import { Character, Serie } from '../entities';

export interface DetailsState {
  selectedItem: Character | Serie | null;
  selectedTab: string;
  isModalClosed: boolean;
}

const initialState: DetailsState = {
  selectedItem: null,
  selectedTab: '0',
  isModalClosed: true,
};

export const useDetailsStore = createStore<DetailsState>(
  initialState,
  'detailsStore'
);

export function setSelectedItem(item: Character | Serie | null) {
  console.log('item', item);
  useDetailsStore.setState({ selectedItem: item });
}

export function setModalClosed(closed: boolean) {
  console.log('closed', closed);
  useDetailsStore.setState({ isModalClosed: closed });
}

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('detailsStore', useDetailsStore);
}

import { mountStoreDevtool } from 'simple-zustand-devtools';
import { createStore } from './createStore';
import { SearchType } from '../entities';

export interface SearchState {
  searchName: string;
  searchType: SearchType;
}

const initialState: SearchState = {
  searchName: '',
  searchType: 'characters',
};

export const useSearchStore = createStore<SearchState>(
  initialState,
  'searchStore'
);

export function setSearchType(type: SearchType) {
  useSearchStore.setState({ searchType: type });
}

export function setSearchName(character?: string) {
  useSearchStore.setState({ searchName: character });
}

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('searchStore', useSearchStore);
}

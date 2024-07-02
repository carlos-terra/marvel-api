import { mountStoreDevtool } from 'simple-zustand-devtools';
import { createStore } from './createStore';
import { Character } from '../entities';

export interface CharacterState {
  selectedCharacter: Character | null;
}

const initialState: CharacterState = { selectedCharacter: null };

export const useCharacterStore = createStore<CharacterState>(
  initialState,
  'characterStore'
);

export function setSelectedCharacter(character?: Character) {
  useCharacterStore.setState({ selectedCharacter: character });
}

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('characterStore', useCharacterStore);
}

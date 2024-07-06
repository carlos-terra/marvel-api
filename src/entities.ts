export interface Thumbnail {
  path: string;
  extension: string;
}

export interface ApiBaseEntity {
  id: number;
  thumbnail: Thumbnail;
  description: string;
}

export interface Character extends ApiBaseEntity {
  name: string;
}

export interface Serie extends ApiBaseEntity {
  title: string;
}

export interface Comic extends ApiBaseEntity {
  title: string;
}

export interface ListData<T> {
  data: T[];
  total: number;
}

export type SearchType = 'characters' | 'series';

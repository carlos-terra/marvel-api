export interface Thumbnail {
  path: string;
  extension: string;
}

export interface BaseEntity {
  id: number;
  thumbnail: Thumbnail;
  description: string;
}

export interface Character extends BaseEntity {
  name: string;
}

export interface Serie extends BaseEntity {
  title: string;
}

export interface Comic extends BaseEntity {
  title: string;
}

export type Entity = Character | Serie | Comic;

export interface Character {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  description: string;
}

export interface Series {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  description: string;
}

export interface Song {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: string;
    image: string;
    icon: string;
    src:string
  }

export interface color {
  accent:string, 
  dark:string
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  createdBy: string;
  songIds: string[];
  color: color
}

export interface LibCard {
  id: string;
  title: string;
  icon: string;
  createdBy: string;
  color: {accent:string, dark:string}
}

export interface ItemCard {
  id: string;
  title: string;
  icon: string;
  color: {accent:string, dark:string}
}

export interface BigItemCard {
  id: string;
  title: string;
  image: string;
  createdBy: string;
  color: {accent:string, dark:string}
}
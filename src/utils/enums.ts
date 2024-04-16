export const enum Entities {
  USERS = 'users',
  TRACKS = 'tracks',
  ARTISTS = 'artists',
  ALBUMS = 'albums',
}

export const EntityToTable = {
  [Entities.USERS]: 'user',
  [Entities.TRACKS]: 'track',
  [Entities.ARTISTS]: 'artist',
  [Entities.ALBUMS]: 'album',
};

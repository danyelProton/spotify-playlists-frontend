import { fetchData } from './helpers.js';
import Fuse from '../../node_modules/fuse.js/dist/fuse.mjs';


export const state = {
  albums: '',
  albumsCurrentView: '',
  playlists: '',
  playlistCurrentView: '',
  lastUpdate: '',
  genres: ''
};




export const getAlbumsFromDb = async () => {
  // const url = 'http://localhost:3000/api/albums';
  const url = 'https://spotify-playlists-backend.vercel.app/api/albums';
  const albums = await fetchData(url);
  const albumsSorted = albums.sort((a, b) => b.releaseTimestamp - a.releaseTimestamp);
  state.albums = albumsSorted;
  return albumsSorted;
};




export const getPlaylistsFromDb = async () => {
  // const url = 'http://localhost:3000/api/playlists';
  const url = 'https://spotify-playlists-backend.vercel.app/api/playlists';
  const playlists = await fetchData(url);
  // const albumsSorted = albums.sort((a, b) => b.releaseTimestamp - a.releaseTimestamp);
  state.playlists = playlists;
  return playlists;
};



export const getUpdatesFromDb = async () => {
  // const url = 'http://localhost:3000/api/updates';
  const url = 'https://spotify-playlists-backend.vercel.app/api/updates';
  const update = await fetchData(url);
  state.lastUpdate = update.data;
  return update;
};



export const getUniqueYears = () => {
  const years = state.albums.map(album => album.releaseDateString.slice(0, 4));

  const yearsUnique = [...new Set(years)].sort();

  console.log(yearsUnique);

  return yearsUnique;
};



export const getUniquePrimaryGenres = () => {
  const genres = state.albums.map(album => album.mainGenre);

  const genresUnique = [...new Set(genres)].sort();

  // console.log(genresUnique);

  return genresUnique;
};



export const getUniqueSecondaryGenres = () => {
  const genres = state.albums.flatMap(album => {
    return album.genresMerged;
  });

  const genresUnique = [...new Set(genres)].sort();

  // console.log(genresUnique);

  return genresUnique;
};



export const searchAlbums = input => {
  const list = state.albumsCurrentView;
  const fuseOptions = {
    includeScore: true,
    ignoreDiacritics: false,
    shouldSort: true,
    minMatchCharLength: 1,
    location: 0,
    threshold: 0.15,
    distance: 5,
    fieldNormWeight: 1,
    keys: [
      "name",
      "artistNames"
    ]
  };
  const fuse = new Fuse(list, fuseOptions);
  const searchPattern = input;
  const albums = fuse.search(searchPattern);
  // console.log(albums);

  if (input) {
    return albums.length ? albums.map(el => el.item) : [];
  } else {
    return state.albumsCurrentView;
  }
  // const albumsToReturn = (albums.length) ? albums.map(el => el.item) : state.albumsCurrentView;
  // return albumsToReturn;
};



export const getYearsPlaylists = () => {
  return state.playlists.filter(el => el.type === 'year').toSorted((a, b) => Number(b.name) - Number(a.name));
};



export const filterAlbums = (params) => {
  let playlist;
  let albums;

  if (Object.keys(params).length) {
    if (params.playlist === 'listening-now') {
      playlist = state.playlists.filter(playlist => playlist.name === 'vypocut');
      state.playlistCurrentView = 'listening-now';
    } else if (params.playlist === 'honorable-mentions') {
      playlist = state.playlists.filter(playlist => playlist.type === 'other' && playlist.name != 'vypocut');
      state.playlistCurrentView = 'honorable-mentions';
    } else {
      playlist = state.playlists.filter(playlist => playlist.name === params.playlist);
      state.playlistCurrentView = playlist[0].name;
    }

    // console.log(playlist);

    albums = state.albums.filter(album => album.playlists.some(el => playlist.map(el => el._id).includes(el._id)));
    state.albumsCurrentView = albums;

    // works if albums from type of 'other' playlists aren't all under 'honorable mentions' but in separate playlists
    // const playlist = state.playlists.filter(playlist => playlist.name === params.playlist)[0];
    // const albums = state.albums.filter(album => album.playlists.map(el => el._id).includes(playlist._id));

  } else {
    albums = state.albums;
    state.albumsCurrentView = albums;
  }

  return albums;
};
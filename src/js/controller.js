import * as model from './model.js';
import * as MainContent from './views/components/mainContent.js';
import * as SidebarNav from './views/components/sidebarNav.js';
import * as AlbumsView from './views/albumsView.js';
import * as AlbumView from './views/components/album.js';
import * as SearchView from './views/components/search.js';
import * as ErrorView from './views/components/error.js';
import { render, clear, removeEl } from './views/view.js';


const init = async () => {
  model.state.playlists = await model.getPlaylistsFromDb();
  model.state.albums = await model.getAlbumsFromDb();
  model.state.genres = model.getUniqueGenres();
  model.state.lastUpdate = await model.getUpdatesFromDb();
};



await init();



const handleSearchInput = input => {
  const foundAlbums = model.searchAlbums(input);

  if (foundAlbums.length) {
    if (ErrorView.childEl) removeEl(ErrorView.childEl);
    const albumsViewContent = AlbumsView.generateMarkup(foundAlbums);
    render(document.querySelector('.main-content'), AlbumsView.childEl, albumsViewContent);
  } else {
    console.log('no albums');
    removeEl(AlbumsView.childEl);
    controlError('No albums found');
  }

};

SearchView.listenSearchInput(handleSearchInput);




const controlMainContent = () => {
  render(MainContent.parentEl, MainContent.childEl);
  return MainContent.childEl;
};




const controlError = errMsg => {
  const errorViewContent = ErrorView.generateMarkup(errMsg);
  render(document.querySelector('.main-content'), ErrorView.childEl, errorViewContent);
};






export const controlSidebarNav = async () => {
  if (!model.state.playlists) {
    await model.getPlaylistsFromDb();
  }
  // console.log(model.state);

  const playlistsYears = model.getYearsPlaylists();
  const sidebarNavContent = SidebarNav.generateMarkup(playlistsYears);
  render(SidebarNav.parentEl, SidebarNav.childEl, sidebarNavContent);
};




const controlSearch = parentEl => {
  const searchViewContent = SearchView.generateMarkup();
  render(parentEl, SearchView.childEl, searchViewContent);
};




export const controlAlbums = async params => {
  // console.log(params);

  if (!model.state.albums) {
    await model.getAlbumsFromDb();
  }

  // console.log(model.state);

  const albums = model.filterAlbums(params);

  controlSidebarNav();
  const parentEl = controlMainContent();
  controlSearch(parentEl);

  const albumsViewContent = AlbumsView.generateMarkup(albums);
  render(parentEl, AlbumsView.childEl, albumsViewContent);

  console.log(model.state.playlistCurrentView);
};




export const controlAlbum = async params => {
  // console.log(model.state);

  if (!model.state.albums) { 
    await model.getAlbumsFromDb();
  }

  controlSidebarNav();
  const parentEl = controlMainContent();

  const album = model.state.albums.filter(el => el.slug === params.slug);
  // console.log(album);

  const albumViewContent = AlbumView.generateMarkup(album[0]);
  render(parentEl, AlbumView.childEl, albumViewContent);
};




export const renderBs = () => {
  console.log(model.state);
  const parentEl = document.querySelector('.main-content');
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('beforeend', '<h1>SONGS</h1>');
};
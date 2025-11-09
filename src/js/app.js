import * as Router from './router.js';
import * as Controller from './controller.js';

// Controller.controlSidebarNav();

Router.registerRoute('/', Controller.controlAlbums);
Router.registerRoute('/albums', Controller.controlAlbums);
Router.registerRoute('/albums/playlists/:playlist', Controller.controlAlbums);
Router.registerRoute('/albums/:slug', Controller.controlAlbum);
Router.registerRoute('/songs', Controller.renderBs);
Router.registerRoute('/about', Controller.renderBs);
// Router.resolve('/albums/5XbVk30ifqaiI6EiVVjA1p');


await Router.start();
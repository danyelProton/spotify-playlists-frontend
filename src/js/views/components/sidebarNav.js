export const parentEl = document.querySelector('.main-box');
export const childEl = document.createElement('aside');
// console.log(el);


export const generateMarkup = (playlists) => {
  const playlistsMarkup = playlists.map(playlist => {
    return `
      <li>
        <a class="sidebar-nav__link" href="/albums/playlists/${playlist.name}" data-link>${playlist.name}</a>
      </li>
    `;
  }).join('');

  return `
    <nav class="sidebar-nav" aria-label="Section navigation">
      <ul class="sidebar-nav__list">
        <li>
          <a class="sidebar-nav__link" href="/albums" data-link>All</a>
        </li>
        <li>
          <a class="sidebar-nav__link" href="/albums/playlists/listening-now" data-link>Listening Now</a>
        </li>
        <li>
          <a class="sidebar-nav__link" href="/albums/playlists/honorable-mentions" data-link>Honorable Mentions</a>
        </li>
        ${playlistsMarkup}
      </ul>
    </nav>
  `;
};
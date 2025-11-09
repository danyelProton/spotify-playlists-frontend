export const childEl = document.createElement('div');
childEl.className = 'filter__genre-secondary';


export const generateMarkup = secondaryGenres => {
  const markup = secondaryGenres.map(genre => `<option class="genre-secondary__option">${genre}</option>`);

  return `
    <div class="genre-secondary__dropdown">
      <p>More genres</p>
      <div class="genre-secondary__arrow">
        <span>&#9662;</span>
      </div>
    </div>
    <div class="genre-secondary__options">
      <input class="genre-secondary__search-input" id="genre-search" type="search" placeholder="search for genres">
      ${markup.join('')}
    </div>
  `;
};
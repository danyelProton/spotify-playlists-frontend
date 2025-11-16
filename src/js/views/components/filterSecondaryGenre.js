export const childEl = document.createElement('div');
childEl.className = 'filter__genre-secondary';

export const childElOptions = document.createElement('div');
childElOptions.className = 'genre-secondary__options-items';


export const generateMarkup = () => {
  // const markup = secondaryGenres.map(genre => `<option class="genre-secondary__option">${genre}</option>`);

  // return `
  //   <div class="genre-secondary__dropdown">
  //     <p>More genres</p>
  //     <div class="genre-secondary__arrow">
  //       <span>&#9662;</span>
  //     </div>
  //   </div>
  //   <div class="genre-secondary__options">
  //     <input class="genre-secondary__search-input" id="genre-search" type="search" placeholder="search for genres">
  //     ${markup.join('')}
  //   </div>
  // `;

  return `
    <div class="genre-secondary__dropdown">
      <p>More genres</p>
      <div class="genre-secondary__arrow">
        <span>&#9662;</span>
      </div>
    </div>
    <div class="genre-secondary__options">
      <input class="genre-secondary__search-input" id="genre-search" type="search" placeholder="search for genres">
    </div>
  `;
};



export const generateMarkupOptions = secondaryGenres => {
  return secondaryGenres.map(genre => `<option class="genre-secondary__option">${genre}</option>`).join('');
};



export const listenSearchInput = handler => {
  childEl.addEventListener('input', e => {
    const inputField = e.target.closest('.genre-secondary__search-input');
    if (!inputField) return;
    // console.log(e);
    handler(e.target.value);
  });
};
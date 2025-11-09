export const childEl = document.createElement('div');
childEl.className = 'filter__genre-primary';


export const generateMarkup = primaryGenres => {
  const markup = primaryGenres.map(genre => `<li class="genre-primary__item">${genre}</li>`);

  return `
    <ul class="genre-primary__items">
      ${markup.join('')}
    </ul>
  `;
};
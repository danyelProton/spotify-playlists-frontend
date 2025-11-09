export const childEl = document.createElement('div');
childEl.className = 'filter__year';


export const generateMarkup = years => {
  const markup = years.map(year => `<li class="year__item">${year}</li>`);

  return `
    <ul class="year__items">
      ${markup.join('')}
    </ul>
  `;
};
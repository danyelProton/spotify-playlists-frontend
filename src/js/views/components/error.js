export const childEl = document.createElement('section');
childEl.className = 'error';


export const generateMarkup = errMsg => {
  return `
    <p class="error__text">${errMsg}</p>
  `;
};
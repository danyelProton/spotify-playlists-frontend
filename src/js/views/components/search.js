export const childEl = document.createElement('section');
childEl.className = 'main-content__search';


export const generateMarkup = () => {
  // return `
  //   <section class="main-content__search">
  //     <svg class="search__icon">
  //       <use href="/src/img/icons.svg?v=1#search"></use>
  //     </svg>
  //     <input class="search__input" id="search" type="search" placeholder="search for albums">
  //   </section>
  // `;

  return `
    <svg class="search__icon">
      <use href="/src/img/icons.svg?v=1#search"></use>
    </svg>
    <input class="search__input" id="search" type="search" placeholder="search for albums">
  `;
};




export const listenSearchInput = handler => {
  childEl.addEventListener('input', e => {
    const inputField = e.target.closest('.search__input');
    if (!inputField) return;
    // console.log(e);
    handler(e.target.value);
  });
};
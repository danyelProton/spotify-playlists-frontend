export const render = (parentEl, childEl, markup = null) => {
  childEl.innerHTML = markup;
  parentEl.appendChild(childEl);
};



export const clear = el => {
  el.innerHTML = '';
};



export const removeEl = el => {
  el.remove()
};
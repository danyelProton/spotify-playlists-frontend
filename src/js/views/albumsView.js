export const childEl = document.createElement('section');
childEl.className = 'main-content__albums';


export const generateMarkup = (albums) => {
  // console.log(albums);
  const albumsMarkup = albums.map(album => {
    return `
      <article class="album">
        <a class="album__link" href="/albums/${album.slug}" data-link>
          <img class="album__img" src="${album.image}">
          <div class="album__info">
            <p class="album__name">${album.name}</p>
            <p class="album__artist">${album.artistNames}</p>
            <div class="album__year-genre">
              <p class="album__year">${album.releaseDate.slice(0, 4)}</p>
              <p class="album__genre">${album.mainGenre}</p>
            </div>
          </div>
        </a>
      </article>
    `
  });

  // return `
  //   <section class="main-content__albums">
  //     ${albumsMarkup.join('')}
  //   </section>
  // `;

  return albumsMarkup.join('');
};
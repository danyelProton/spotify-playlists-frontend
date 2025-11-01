export const childEl = document.createElement('div');
childEl.className = 'main-content__album-card';


export const generateMarkup = (album) => {
  // console.log(album);
  const year = album.releaseDate.slice(0, 4);
  const releaseDateFormatted = new Date(album.releaseDate)
    .toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    // year: 'numeric'
  });

  // return `
  //   <div class="main-content__album-card">
  //     <section class="album-card-overview">
  //       <div class="album-card-overview__img-box">
  //         <img class="album-card-overview__img" src="${album.image}">
  //       </div>
  //       <div class="album-card-overview__other">
  //         <p class="album-card-overview__name">${album.name}</p>
  //         <p class="album-card-overview__artist">${album.artistNames}</p>
  //         <p class="album-card-overview__year">${year}</p>
  //         <div class="album-card-overview__genres">
  //           <ul class="album-card-overview__genre-list">
  //             ${generateGenreItems(album.genresMerged)}
  //           </ul>
  //         </div>
  //         <p class="album-card-overview__other-details">${releaseDateFormatted} &#x2022 ${album.label} &#x2022 ${album.songsTotal} songs </p>
  //       </div>
  //     </section>
  //     <section class="album-card-details">
  //       <div class="album-card-details__description-box">
  //         <p class="album-card-details__description">${album.summary}</p>
  //       </div>
  //       <div class="album-card-details__link-box">
  //         <ul class="album-card-details__link-list">
  //           ${generateStreamingLinks(album.links)}
  //         </ul>
  //       </div>
  //     </section>
  //   </div>
  // `;

  return `
    <section class="album-card-overview">
      <div class="album-card-overview__img-box">
        <img class="album-card-overview__img" src="${album.image}">
      </div>
      <div class="album-card-overview__other">
        <p class="album-card-overview__name">${album.name}</p>
        <p class="album-card-overview__artist">${album.artistNames}</p>
        <p class="album-card-overview__year">${year}</p>
        <div class="album-card-overview__genres">
          <ul class="album-card-overview__genre-list">
            ${generateGenreItems(album.genresMerged)}
          </ul>
        </div>
        <p class="album-card-overview__other-details">${releaseDateFormatted} &#x2022 ${album.label} &#x2022 ${album.songsTotal} songs </p>
      </div>
    </section>
    <section class="album-card-details">
      <div class="album-card-details__description-box">
        <p class="album-card-details__description">${album.summary}</p>
      </div>
      <div class="album-card-details__link-box">
        <ul class="album-card-details__link-list">
          ${generateStreamingLinks(album.links)}
        </ul>
      </div>
    </section>
  `;
};




const generateGenreItems = genres => {
  return genres.map(genre => `<li class="album-card-overview__genre-item">${genre}</li>`).join('');
};




const generateStreamingLinks = links => {
  const services = [
    { name: 'amazonMusic', imgSrc: '/src/img/amazon.svg'},
    { name: 'appleMusic', imgSrc: '/src/img/apple-music.svg'},
    { name: 'bandcamp', imgSrc: '/src/img/bandcamp.svg'},
    { name: 'soundcloud', imgSrc: '/src/img/soundcloud.png'},
    { name: 'spotify', imgSrc: '/src/img/spotify.png'},
    { name: 'youtube', imgSrc: '/src/img/youtube.png'},
    { name: 'youtubeMusic', imgSrc: '/src/img/youtube-music.svg'},
  ];

  return services.map(service => {
    if (links[service.name]) {
      return `
        <li class="album-card-details__link-item">
          <a class="album-card-details__link-item-link" href="${links[service.name].url}" target="_blank">
            <img class="album-card-details__link-item-img" src="${service.imgSrc}">
          </a>
        </li>
      `;
    }
  }).join('');
};

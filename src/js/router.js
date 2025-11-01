const routes = [];


export const registerRoute = (path, handler) => {
  const paramNames = [];
  const pathSegments = path.split('/');
  // console.log(pathSegments);
  const regexPath = pathSegments.map(seg => {

    if (seg.startsWith(':')) {
      paramNames.push(seg.slice(1));
      return '([^/]+)';
    }

    return seg;
  }).join('/');
  // console.log(regexPath);

  const regex = new RegExp(`^${regexPath}$`);
  routes.push({ regex, handler, paramNames });
};




export const resolveRoute = async path => {
  // console.log(routes);
  const params = {};

  const routePromises = routes.map(route => {
    return new Promise((resolve, reject) => {
      const match = path.match(route.regex);

      if (match) {
        // console.log(match);

        if (match.length > 1) {
          match.slice(1).forEach((matchGroup, i) => {
            params[route.paramNames[i]] = matchGroup;
          });
        }

        // console.log(params);
        resolve(route);
      }
      
    });
  });

  // console.log(routePromises);

  const route = await Promise.race(routePromises);
  // console.log(route);
  await route.handler(params);
};




export const start = async () => {
  await resolveRoute(window.location.pathname);
  window.addEventListener('popstate', async () => {
    await resolveRoute(window.location.pathname);
  });

  document.addEventListener('click', async e => {
    const anchorTag = e.target.closest('a');
    if (!anchorTag) return;

    if (anchorTag.matches('[data-link]')) {
      e.preventDefault();
      const path = anchorTag.getAttribute('href');
      await navigateTo(path);
    }

  });
};




export const navigateTo = async path => {
  history.pushState(null, null, path);
  await resolveRoute(path);
};
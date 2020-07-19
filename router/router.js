class Router {
  constructor(routes) {
    this.routes = routes;
    this._loadInitialRoute();
  }

  loadRoute(...urlSegs) {
    const matchedRoutes = this._matchUrlToRoute(urlSegs);

    const url = `${urlSegs == '' ? '/' : urlSegs.join('/')}`;
    window.history.pushState({}, 'this works', url);

    const routerOutElm = document.querySelectorAll('[data-router]')[0];
    routerOutElm.innerHTML = matchedRoutes.template;
  }

  _matchUrlToRoute(urlSegs) {
    const matchedRoutes = this.routes.find((route) => {
      const routePathSegs = route.path.split('/').slice(1);
      if (routePathSegs.length != urlSegs.length) {
        return false;
      }
      return routePathSegs.every(
        (routePathSeg, i) => routePathSeg === urlSegs[i]
      );
    });
    return matchedRoutes;
  }

  _loadInitialRoute() {
    const pathNameSplit = window.location.pathname.split('/');
    const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : '';
    this.loadRoute(...pathSegs);
  }
}

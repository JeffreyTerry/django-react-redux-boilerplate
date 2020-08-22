import React, { Component } from 'react';
import ReactGA from 'react-ga';

export const initializeGoogleAnalytics = () => {
  ReactGA.initialize('UA-161514736-1');
};

export const getStrippedPathname = pathname => {
  // TODO strip out parameters & whatnot
  return pathname;
}


/**
 * From ReactGA Community Wiki Page https://github.com/react-ga/react-ga/wiki/React-Router-v4-withTracker
 */
export const withTracker = WrappedComponent => {
  const trackPage = page => {
    ReactGA.set({ page });
    ReactGA.pageview(page);
  };

  const HOC = class extends Component {
    componentDidMount() {
      const page = getStrippedPathname(this.props.location.pathname);
      trackPage(page);
    }

    componentDidUpdate(prevProps) {
      const prevPage = prevProps.location.pathname;
      const currentPage = this.props.location.pathname;

      if (prevPage !== currentPage) {
        trackPage(currentPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
}

export const trackNavbarEvent = action => {
  ReactGA.event({
    category: 'Navbar',
    action
  });
}

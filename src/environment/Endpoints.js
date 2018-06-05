const getEndpoint = (location, url) =>{
  const getHostname = window && window.location && window.location.hostname;

  const backendHost = () => {
    if(getHostname === 'caiodesign.github.io') {
      return 'https://time-for-another-trip-endpoint.herokuapp.com';
    } else {
      return 'https://time-for-another-trip-endpoint.herokuapp.com';
    }
  }

  const host = {
    hostname: url || backendHost(),
    cities: "/cities/",
    weather: "/weather/",
    backgrounds: "/backgrounds/"
  }
  return `${host.hostname + host[location]}`;
}

export default getEndpoint;
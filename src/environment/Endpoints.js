const getEndpoint = (location, url) =>{
  const getHostname = window && window.location && window.location.hostname;

  const backendHost = () => {
    if(getHostname === 'caiodesign.github.io') {
      return 'http://localhost:8882';
    } else {
      return 'http://localhost:8882';
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
const getEndpoint = (location, url) =>{
  const getHostname = window && window.location && window.location.hostname;

  const backendHost = () => {
    if(getHostname === 'time-for-another-trip.netlify.com') {
      return 'https://time-for-another-trip-endpoint.herokuapp.com';
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

const getEndpoint = (location, url) =>{


  const host = {
    serverPort: 8882,
    hostname: url || window.location.hostname,
    cities: "/cities/",
    weather: "/weather/",
    backgrounds: "/backgrounds/"
  }
  return `http://${host.hostname}:${host.serverPort+host[location]}`;
}

export default getEndpoint;
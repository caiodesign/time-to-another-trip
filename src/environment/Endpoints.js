const getEndpoint = (location, hostname) =>{
  const host = {
    serverPort: 8882,
    hostname: window.location.hostname,
    cities: "/cities/",
    weather: "/weather/",
    backgrounds: "/backgrounds/"
  }
  return `http://${host.hostname}:${host.serverPort+host[location]}`;
}

export default getEndpoint;
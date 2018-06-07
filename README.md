# Time for Another Trip

Do you know when is the best time to take a vacation? 

[Live Demo](https://sharp-saha-909c05.netlify.com/).

## Gettting Starded

### Prerequisites

- [NodeJS 8+](https://nodejs.org/en/)
- [Java JDK 8](http://www.oracle.com/technetwork/pt/java/javase/downloads/jdk8-downloads-2133151.html)
- [Docker](https://docs.docker.com/compose/install/)


## Installing
There is 2 ways to run this project in your system, the easy way and the "not so bad" way.

### Easy way (Docker):
You don't have to install `NodeJS` and `Java` to run the project in this way, all you have to do is install the [Docker](https://docs.docker.com/compose/install/)
, clone/download the project to your system and run a single command line in your terminal.

Clone or download de project to your system.
```
$ git clone https://github.com/caiodesign/time-to-another-trip.git
```

Access the project folder via terminal and run:
```
$ docker-compose up --build
```

The docker will download all dependencies of the project and execute everything to you.
When is finished, open your favorite browser at `http://localhost:3000`.

Voilà! 


### "Not so bad" way (manually):

Access the project folder via terminal and run:
```
$ npm install
```

If you have problems to install the project dependecies, try using `sudo` (MAC/LINUX):
```
$ sudo npm install
```

## Running

Extract the `stubby4j-6.0.1.zip` file into root project folder and execute the command:
```
$ java -jar stubby4j-6.0.1.jar -d tech_assignment_mobile_stubs.yml
```

### OBS: 
If you have problems to execute the command above, you can change `backendHost` constant value in `/src/environment/Endpoint.js` to start consuming the production endpoint:

```javascript
/** 
  * CHANGE HERE IF YOU HAVE PROBLEMS TO CREATE YOUR OWN JAVA SERVER!
  * DELETE THE BACKENDHOST CONST AND UNCOMMENT THE CODE BELLOW!
**/

  //const backendHost = "https://time-for-another-trip-endpoint.herokuapp.com"

  const backendHost = () => {
    if(getHostname === 'caiodesign.github.io') {
      return 'https://time-for-another-trip-endpoint.herokuapp.com';
    } else {
      return 'http://localhost:8882';
    }
  } 
```


Open a new terminal, access the project folder again and run:
```
$ npm start
```
The script will compile the files and serve on [localhost:3000](http://localhost:3000)


## Others available scripts

Use `build` to deploy your static files in `build` folder.

```
$ npm run build
```

Use `test` to run the tests.

```
$ npm test
```

## License
This project is licensed under the MIT License.

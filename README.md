# Time to Another Trip

Do you know when is the best time to take a vacation? 

[Live Demo](https://caiodesign.github.io/time-to-another-trip/).

## Gettting Starded

### Prerequisites

```
Java 8 +
Node 8.4 +
Npm 5.3 +
```

### Installing

Clone or download de project to your system.
```
git clone https://github.com/caiodesign/time-to-another-trip.git
```


Access the project folder via terminal and run:
```
npm install
```

If you have problems to install the project dependecies, try using `sudo` (MAC/LINUX):
```
sudo npm install
```

## Running

Extract the `stubby4j-6.0.1.zip` file into root project folder and execute the command:
```
java -jar stubby4j-6.0.1.jar -d tech_assignment_mobile_stubs.yml
```

### OBS: 
If you have problems to execute the command above, you can change `backendHost` constant value in `/src/environment/Endpoint.js` to start consuming the production endpoint:

```
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
npm start
```
The script will create a server, compile the files and serve on [localhost:3000](http://localhost:3000)


## Others available scripts

Use `build` to deploy your static files in `build` folder.

```
npm run build
```

Use `test` to run the TDD.

```
npm test
```

## License
This project is licensed under the MIT License.





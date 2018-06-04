# Time to Another Trip

## Prerequisites

```
Java 8 +
Node 8.4 +
Npm 5.3 +
```

## Installing

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


Extract the `stubby4j-6.0.1.zip` file into root project folder and execute the command:
````
java -jar stubby4j-6.0.1.jar -d tech_assignment_mobile_stubs.yml
```


Open a new terminal, access the project folder again and run:
```
npm start
```
The script will create a server and compile the files and serve in `http://localhost:3000`


## Others available scripts

Use `build` to deploy your static files in `build` folder.

```
npm run build
```

Use `test` to run the TDD.

```
npm test
```



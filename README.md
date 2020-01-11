# NodeJS-CrudOperations

## General Info
1. The project is implemented using [Nodejs](https://nodejs.org) and [MonogDB](https://www.mongodb.com/) as a database
2. I used [mlab](https://mlab.com) which is cloud database service that hosts MongoDB databases, I could use DynamoDB but I prefered MongoDB and mlab to be fast in development.
3. I used [Restify](http://restify.com/) as back-end development frmae instead of [ExpressJS](https://expressjs.com/), restify is a minimal framework which is graet in back-end development which is used by many companies such as Netflix.
4. I choose entity structure of user and adverts where each user has many adverts and each advert only belong to one user.
6. User schema contains name, email, passwords and adverts.
7. I used JSON Web Token [JWT](https://jwt.io/) as a method for representing claims securely between two parties.
8. I implemented user schema and controller which is not required but I assumed that it will be more convenient in our case to have user that create adverts and each advert belong only to one user.
9. I used [mocha](https://mochajs.org/) and [chaijs](https://www.chaijs.com/) for unit testing.

## Installation and setup
1. Unzip the compressed file to any where on your computer.
2. on the root of the project folder, run [npm](https://www.npmjs.com/) from terminal in case of linux or mac, or from console in case of windows machine
    ```
    npm install
    ```
3. Run the API first by executing the following command.
    ```
    node index
    ```
    or
    ```
    npm start
    ```
4. I deleted all data in the database that I was using, you have to start by creating a new user first to get authentication token to be used in the requests,  the token is got after register or login request

5. Get list of adverts and get advert by id request doesnot need to be authenticated.
6. The Rest of request need the authentication token in their header before sending the request, for example if you are using [POSTMAN](https://www.getpostman.com) as a client you have to put the token in headers as follwos:
    ```
    x-access-token: token
    ```
4. To run unit tests
    ```
    npm test
    ```
4. The API will be up and running on port 5000 the it will connect to database.
5. You don't need any configuration for database as I metioned above, I used MongoDB hosted on [mlab](https://mlab.com)
6. You will find all the enviroment variables related to database in .env file.

## Endpoints in the API
  ```
  1. http://localhost:5000/register  used for creation i.e registeration and authorization token. [POST request]
  2. http://localhost:5000/login for login and creation authorization token [POST request]
  3. http://localhost:5000/list for listing all car adverts [GET request]
  4. http://localhost:5000/list/:id for getting advert info by id [GET request]
  4. http://localhost:5000/update/:id for updating an advert by id [PUT request]
  5. http://localhost:5000/delete/:id for deleting an advert by id  [delete request]
  5. http://localhost:5000/heartbeat for health check of API in case of using API gateway [GET request]
  
  ```

### Note
In case of creation or updating post your URL in POSTMAN or the client should be as following, the bellow ID in the URL is not real
  ```
  http://localhost:5000/list/5bb25dc38a492d311cb7f161 
  
  ```
  
  ## Authors
<mailto:mohamedmkashif@gmail.com>


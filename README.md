# Train Ticketing - Booking Service

This is the Booking Service for the Train Ticketing application. It handles ticket booking, ticket updates, and retrieval of booking details using PNR (Passenger Name Record). It is responsible for interacting with the database to handle ticket-related operations based on user requests.

# Note
This service is a part of microservice architecture that also includes:
- Auth Service: Handles user registration and login.
- Search Service: Handles train route searches.
- API Gateway: Orchestrates requests across all microservices.

Running this single micro-service will not be beneficial. Kindly visit [main repository](https://github.com/noorudd-in/Train-Ticketing-Backend) and run all the required micro-services mentioned there. This readme will guide you how to run booking service.

# Installation
1. Clone the repository:
2. Install dependencies:\
`npm install`
3. Setup your MySQL Databases. Inside `src/config/config.json`\
Replace `username` and `password` with your actual MySQL connection.\
Replace `database` with the name of the database for the booking service. If the database is not created, sequelize will automatically create it for you.
4. Start your MySQL in the background. By default MySQL uses port 3306. If your MySQL is running on different port, you can modify the `host` and `port` inside the `src/config/config.json`
5. Create the database mentioned in `config.json` using sequelize. Make sure you are under `src` folder before executing any sequelize command.
```js
cd src
npx sequelize db:create
```
6. Create tables for our booking service defined in the models folder. Make sure you are inside `src` folder.\
`npx sequelize db:migrate`
7. Although you can add dummy data but in this case, we don't need any prior data. We can generate data based on the requests.
8. Now start your application using\
`npm start`. By default the booking service will start on\
`http://localhost:1442`

# API Endpoints
## User Routes
**POST /book/api/v1/booking** - Create a new booking.

**PATCH /book/api/v1/ticket/:pnr** -> Cancel a booking.

**POST /book/api/v1/pnr/:pnr** -> Fetch booking details.

# Dependencies
- axios: For making HTTP requests.
- dotenv: Loads environment variables from a .env file.
- express: Web framework for building the API.
- html-pdf: For generating PDF tickets from HTML.
- mysql2: MySQL database driver.
- nodemailer: For sending emails.
- sequelize: ORM for interacting with the MySQL database.

# Dev Dependencies
- nodemon: Automatically restarts the server on file changes during development.
- sequelize-cli: Command-line interface for Sequelize. It helps to create models, configs, migrations, seeders very easily.

# API/Code Flow
When a user sends a request to the server, the flow is as follows::
- Middleware: The request first passes through the middleware, where it is validated. Here, checks are performed to ensure that required parameters are available. If the parameters are missing or invalid, the request is terminated, and an error response is sent back to the client. If validation is successful, the request is forwarded to
- Controller: The controller receives the validated request and handles any modifications, such as data transformation or mapping. It then forwards the request to
- Service: The service layer contains the core business logic. For example, this is where you might check if a user is authenticated before allowing a ticket booking. After processing the logic, the service layer sends the request to
- Repository: The repository is responsible for database operations. Here, SQL queries are executed to perform CRUD operations. For example, if the request is to create a new ticket, the repository handles the SQL commands and performs the necessary interactions with the database.

# Contributing
Contributions are welcome! Please create an issue or submit a pull request.

# License
MIT
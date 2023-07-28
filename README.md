# DevNexus
<p style="text-align: justify;">
DevNexus is an API that provides users around the world with a seamless way to keep track of their favorite programming languages, areas of interest, and technologies. With it, users can easily stay up-to-date with the latest resources from their favorite developer communities.


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [API Routes and Endpoints](#api-routes-and-endpoints)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

## Installation
### 1. First, clone the repository:
   ```
   git clone https://github.com/nearlyerika/devNexus.git
   ```
### 2. Install the required dependencies:
   ```
   npm install
   ```
### 3. Set up the environment variables:
   ```
   cp .env.example .env
   ```
### 4. Update the .env file with your own configurations:
   There is no need to modify the mongo uri string itself. <br>
   Just paste your DB username and password to the ``DB_USER`` and ``DB_PASS`` variables respectively. 
   ```
   DB_URL=
   DB_PASS=
   DB_USER=

   PORT=
   JWT_SECRET=
   ```

## Usage
<p style="text-align: justify;">
For utilizing the devNexus app effectively, you can use the npm scripts listed below. These scripts help you start the server, generate Swagger documentation, run tests, and launch the application in different modes, catering to both development and production environments.
</p>

| Script                  | Description                                     |
| ----------------------- | ----------------------------------------------- |
| `npm run dev:once`      | Starts the server once                          |
| `npm run dev:nodemon`   | Starts the server using nodemon for development |
| `npm run dev:swagger`   | Generates and serves Swagger documentation      |
| `npm run dev:jest`      | Runs Jest tests in watch mode                   |
| `npm run production`    | Starts the server in production mode            |

## Technologies Used

### Node.js:
<p style="text-align: justify;">
The project tries to follow industry best practices for back-end development with JavaScript. It leverages non-blocking asynchronous JS to optimize the event loop, ensuring high performance and responsiveness. Error handling is robust with try-catch mechanisms and custom error throws.

### MongoDB:
<p style="text-align: justify;">
The project is designed to connect to a Mongo Atlas Cloud DB. This integration with MongoDB' cloud service makes the project scalable and flexible, empowering the application to efficiently manage and retrieve data.

### Frameworks & Libs
| Main Dependencies |              | Dev Dependencies      |          |
| ----------------- | ------------ | --------------------- | -------- |
| express           | bcrypt       | swagger-ui-express    | nodemon  |
| mongoose          | jsonwebtoken | swagger-autogen       | prettier |
| dotenv-safe       | cors         | mongodb-memory-server | jest     |

## Project Structure
<p style="text-align: justify;">
The project follows the MVC architecture and boasts a highly modular folder structure. It uses separate directories for controllers, models, and routes, ensuring clean separation of concerns and layers. There is a separete tests folder for jest unitary tests, an utils folder for utilities and middleware functions like auth middleware and error handling and a tools folder for additional purposes such as serving documentation. This approach was used to ensure and enhances code readability, maintainability, and scalability.
</p>

```
devNexus
├─ .env
├─ .env.example
├─ .gitignore
├─ .prettierrc
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ app.js
│  ├─ config
│  │  └─ database.js
│  ├─ controllers
│  │  ├─ areaController.js
│  │  ├─ authController.js
│  │  ├─ langController.js
│  │  ├─ techController.js
│  │  ├─ userController.js
│  │  └─ viewController.js
│  ├─ models
│  │  ├─ Area.js
│  │  ├─ Lang.js
│  │  ├─ Tech.js
│  │  └─ User.js
│  ├─ routes
│  │  ├─ areaRouter.js
│  │  ├─ authRouter.js
│  │  ├─ langRouter.js
│  │  ├─ techRouter.js
│  │  └─ userRouter.js
│  ├─ server
│  │  └─ server.js
│  ├─ utils
│  │  ├─ authenticator.js
│  │  ├─ capitalizer.js
│  │  └─ errorHandler.js
├─ tests
│  ├─ area.test.js
│  ├─ lang.test.js
│  ├─ tech.test.js
│  └─ user.test.js
└─ tools
   ├─ swagger.js
   └─ swagger_output.json
```
## API Routes and Endpoints

<p style="text-align: justify;">
The API offers several routes and endpoints to interact with the backend. These routes are organized into different routers for specific functionalities. It also provides access to a documentation route through a Swagger UI page, which enables users to explore and understand the available endpoints and their functionalities.<br>Please note that some routes are accessible to all users (public routes), while others are restricted to administrators or to authenticated users.

Here's a list and brief description of each available API route:
</p>

1. **Documentation Route**
   - `/documentation` Swagger documentation.

1. **Authentication Routes**
   - **POST** `/signup` - Allows users to **register** by providing a **username**, **email**, **password**, and **password confirmation**.
   - **POST** `/login` - Allows users to **log in** by providing either a **username** or **email** and **password**.

2. **Area Routes**
   - **GET**`/` - Retrieves a list of all **available areas of interest**.
   - **GET** `/:name` - Retrieves detailed information about a specific **area of interest** by its name.
   - **POST** `/add` - Allows administrators to **create** a new **area of interest** by providing various details.
   - **PATCH** `/:name` - Allows administrators to **update** specific details of an existing **area of interest**.
   - **DELETE** `/:name` - Allows administrators to **delete** an existing **area of interest**.

3. **Language Routes**
   - **GET** `/` - Retrieves a list of all **available programming languages**.
   - **GET** `/:name` - Retrieves detailed information about a specific **programming language** by its name.
   - **POST** `/add` - Allows administrators to **create** a new **programming language** by providing various details.
   - **PATCH** `/:name` - Allows administrators to **update** specific details of an existing **programming language**.
   - **DELETE** `/:name` - Allows administrators to **delete** an existing **programming language**.

4. **Technology Routes**
   - **GET** `/` - Retrieves a list of all **available technologies**.
   - **GET** `/:name` - Retrieves detailed information about a specific **technology** by its name.
   - **POST** `/add` - Allows administrators to **create** a new **technology** by providing various details.
   - **PATCH** `/:name` - Allows administrators to **update** specific details of an existing **technology**.
   - **DELETE** `/:name` - Allows administrators to **delete** an existing **technology**.

5. **User Routes**
   - **POST** `/add` - Allows administrators to **create** a new **user** by providing various details.
   - **GET** `/all` - Retrieves a list of all **users** (accessible only to admins).
   - **GET** `/selections` - Retrieves an authenticated user's **selections** (profile settings).
   - **GET** `/:username` - Retrieves detailed information about a specific **user** by their username.
   - **GET** `/profile` - Retrieves an authenticated user's **profile information**.
   - **PATCH** `/:username` - Allows administrators to **update** specific details of an existing **user**.
   - **PATCH** `/selections` - Allows an authenticated user to **update** their **selections** (profile settings).
   - **PATCH** `/profile` - Allows an authenticated user to **update** their **profile information**.
   - **PATCH** `/deactivate` - Allows an authenticated user to **deactivate** their account.
   - **DELETE** `/:username` - Allows administrators to **delete** an existing **user**.


## Contributing
Contributions are welcome! Follow these steps to contribute:

1. Fork the project
2. Create a new branch
3. Make your changes
4. Submit a pull request

Please make sure to follow the code style and guidelines.

## Acknowledgments
I'd like to thank the [{reprograma}](https://github.com/reprograma) staff for providing the amazing bootcamp from which this project resulted, with a special thanks to [Sky](https://github.com/SkyAlarcon).
I'd also like to thank [Jonas Schmedtmann](https://github.com/jonasschmedtmann) for his incredible Node.js course.

## Contact
If you have any questions or feedback, feel free to contact me:

* Email: erika.melloramos@gmail.com
* GitHub: [nerlyerika](https://github.com/nearlyerika/)

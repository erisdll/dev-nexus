# DevNexus

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
#### 2. Install the required dependencies:
   ```
   npm install
   ```
#### 3. Set up the environment variables:
   ```
   cp .env.example .env
   ```
#### 4. Update the .env file with your own configurations:
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

For utilizing the devNexus app effectively, you can use the npm scripts listed below. These scripts help you start the server, generate Swagger documentation, run tests, and launch the application in different modes, catering to both development and production environments.

| Script                  | Description                                     |
| ----------------------- | ----------------------------------------------- |
| `npm run dev:once`      | Starts the server once                          |
| `npm run dev:nodemon`   | Starts the server using nodemon for development |
| `npm run dev:swagger`   | Generates and serves Swagger documentation      |
| `npm run dev:jest`      | Runs Jest tests in watch mode                   |
| `npm run production`    | Starts the server in production mode            |

## Project Structure

The project follows the MVC architecture and boasts a highly modular folder structure. It uses separate directories for controllers, models, and routes, ensuring clean separation of concerns and layers. There is a separete tests folder for jest unitary tests, an utils folder for utilities and middleware functions like auth middleware and error handling and a tools folder for additional purposes such as serving documentation. This approach was used to ensure and enhances code readability, maintainability, and scalability.

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

## Technologies Used

### Node.js, MongoDB, Atlas Cloud, JWT.

| Main Libs    | Dev Dependencies       |
| ------------ | ---------------------- |
| express      | nodemon                |
| mongoose     | prettier               |
| cors         | jest                   |
| bcrypt       | mongodb-memory-server  |
| jsonwebtoken | swagger-ui-express     |
| dotenv-safe  | swagger-autogen        |
| pug          |                        

## API Routes and Endpoints
List and describe the available API routes and endpoints here.


## Contributing
Contributions are welcome! Follow these steps to contribute:

Fork the project
Create a new branch
Make your changes
Submit a pull request
Please make sure to follow the code style and guidelines.

## Acknowledgments
I'd like to thank the [{reprograma}](https://github.com/reprograma) staff for providing the amazing bootcamp from which this project resulted, with a special thanks to [Sky](https://github.com/SkyAlarcon).
I'd also like to thank [Jonas Schmedtmann](https://github.com/jonasschmedtmann) for his incredible Node.js course.

## Contact
If you have any questions or feedback, feel free to contact me:

Email: erika.melloramos@gmail.com
GitHub: [nerlyerika](https://github.com/nearlyerika/)

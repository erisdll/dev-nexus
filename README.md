# DevNexus

DevNexus is a cutting-edge application that provides users around the world with a seamless way to keep track of their favorite programming languages, areas of interest, and technologies. With it, users can easily stay up-to-date with the latest resources from their favorite developer communities.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes and Endpoints](#api-routes-and-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

## Installation

1. First, clone the repository:

   ```
   git clone https://github.com/nearlyerika/devNexus.git
   ```
2. Install the required dependencies:

   ```
   npm install
   ```

3. Set up the environment variables:

   ```
   cp .env.example .env
   ```

4. Update the .env file with your own configurations:
   <br>Keep in mind there is no need to modify the mongo uri string itself.
   <br>Just paste your DB username and password to the ``DB_USER`` and ``DB_PASS`` variables, respectively.
## Usage
   ```
   DB_URL=
   DB_PASS=
   DB_USER=

   PORT=
   JWT_SECRET=
   ```

## API Routes and Endpoints
List and describe the available API routes and endpoints here.


## Technologies Used

### Node.js, MongoDB, Atlas Cloud, JWT.

| Main Libs    |---------------| Dev Dependencies       |
| ------------ |---------------| ---------------------- |
| express      |               | nodemon                |
| mongoose     |               | prettier               |
| cors         |               | jest                   |
| bcrypt       |               | mongodb-memory-server  |
| jsonwebtoken |               | swagger-ui-express     |
| dotenv-safe  |               | swagger-autogen        |
| pug          |               |                        |

## Project Structure
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
Contributing
Contributions are welcome! Follow these steps to contribute:

Fork the project
Create a new branch
Make your changes
Submit a pull request
Please make sure to follow the code style and guidelines.

## Acknowledgments
Thank the individuals or organizations that contributed to the project here.

## Contact
If you have any questions or feedback, feel free to contact me:

Email: your.email@example.com
GitHub: YourGitHubUsername

devNexus
├─ .gitignore
├─ .prettierrc
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ app.js
│  ├─ config
│  │  └─ db.js
│  ├─ controllers
│  │  ├─ areaController.js
│  │  ├─ authController.js
│  │  ├─ langController.js
│  │  ├─ techController.js
│  │  └─ userController.js
│  ├─ models
│  │  ├─ Area.js
│  │  ├─ Lang.js
│  │  ├─ Tech.js
│  │  └─ User.js
│  ├─ public
│  │  └─ index.html
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
│  └─ views
│     └─ overview.pug
├─ tests
│  ├─ area.test.js
│  ├─ lang.test.js
│  ├─ tech.test.js
│  └─ user.test.js
└─ tools
   ├─ swagger.js
   └─ swagger_output.json

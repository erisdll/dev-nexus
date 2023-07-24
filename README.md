*readme*

dev-app
├─ .gitignore
├─ .prettierrc
├─ package-lock.json
├─ package.json
├─ README.md
├─ server.js
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
│  ├─ routes
│  │  ├─ areaRouter.js
│  │  ├─ authRouter.js
│  │  ├─ langRouter.js
│  │  ├─ techRouter.js
│  │  └─ userRouter.js
│  └─ utils
│     ├─ bcrypt.js
│     ├─ errorHandler.js
│     └─ jwt.js
├─ tests
│  ├─ auth.test.js
│  ├─ lang.test.js
│  ├─ skill.test.js
│  ├─ tech.test.js
│  └─ user.test.js
└─ tools
   ├─ swagger.js
   └─ swagger_output.json
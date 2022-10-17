# REQUIREMENTS

| Nodejs | Mongodb |
|-------| ---------|
| [![ node logo ](.github/nodejs-icon.svg)](https://nodejs.org/en/ 'Nodejs') | [![ node logo ](.github/mongodb.svg)](https://www.mongodb.com/ 'Mongodb')

# START THE PROJECT

1. Open your terminal on your computer.

2. Git clone https://github.com/alexandermontillarivera/cototask.git.

3. cd cototask dir.

4. Find the .env-example file and rename it to .env.

5. Open the .env file and add the settings.

```javascript
APP_PORT = // Port where you want to run the app, by default if you do not put any it is 3000.

APP_SECRET_COOKIE_NAME = // It is a secret word with which session cookies are created.

// These data are necessary for the operation of the app, you can install Mongodb or use mongodb atlas.

DATABASE_USER = // Your db user
DATABASE_PASSWORD = // Your db pass
DATABASE_HOST = // Your db host
DATABASE_NAME = // Your db name

```

6. Open your terminal inside the project and run npm install or npm i.

7. Open your terminal inside the project and run npm run start.

8. Look at the terminal logs and look for the url where your application is running

# react-notes
Notes app using react

### Features
* Add, edit, and delete notes
* Soft-deletes notes
* Sync Notes while editing 
* User React for front-end
* User Nodejs for backend
* User MongoDB as database

This is a simple React application. Just worth a shot!

### To run this locally
NOTE: This app is capable with docker and developed using a docker environment. If you have docker installed it would simplify running in fewer steps.

Clone this repo
```SELL
git clone https://github.com/remintroy/react-notes.git
```
#### Running with docker
```SHELL
 docker compose up
```
Yay that's it with docker compose

<hr/>

#### Running without docker
* Installing packages on the server and client
```SHELL
  npm install 
```
- Create `.env` on the server
```SHELL
# SETTUP ENV FOR SERVER
MONGODB_URL=<Mongodb database url>
```
* Startin server and client
```SHELL
  npm run dev
```

This should start to work by now. Happy coding!


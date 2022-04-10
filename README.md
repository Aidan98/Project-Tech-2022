# Festify
Festify is an app that allows it's users encounter new people based on their shared interest in music (genres), and go to festivals / concerts together.

## Job story
_When I am using the app I want to be able to create an account so that others can see who I am._
![Wireframes festiv](https://github.com/Aidan98/Project-Tech-2022/blob/main/public/images/interface_v2.png?raw=true)

## What can you do with Festivy
With the current iteration of this node.js app you can register, login and update your account. Furthermore your password is hashed using Argon2 for added security.

## Install Festify
Make a new folder in wich you want to place this repository. This way you will be able to find the project easily on your computer.

### Clone the repository
You can install Festiv either by downloading the ZIP, or alternatively if you prefer cloning it in the CLI; you should run the following code:

`gh repo clone Aidan98/Project-Tech-2022`

### Install dependencies
Once you have cloned the repo you need to install the dependencies. You do this by running `npm install` in the terminal (make sure your terminal is set in the right directory i.e the directory the repo is in).

### Run Festify
In order to run Festify you need to enter `npm start` in your terminal. the server will run on port 3000. Your url should look like this: `http://localhost:3000/users/register` 

### Set up your .env
Set up your .env file for a MongoDB connection, the file should include the following:
```
MongoURI= <YOUR MONGO DB URI>
SecretSESSION = <YOUR SECRET KEY>
```

## Sources
* How to hash and compare hashed passwords using Argon2  https://github.com/ranisalt/node-argon2/wiki/Migrating-from-another-hash-function
* How to apply dotenv to your application https://www.youtube.com/watch?v=17UVejOw3zA&t=222s
* A confusing guide on how to use passport.js https://www.passportjs.org/concepts/authentication/strategies/
* EJS documentation https://ejs.co/#docs
* Express-session https://github.com/expressjs/session#readme
* How to validate using mongoose https://mongoosejs.com/docs/validation.html
* How to populate using mongoose https://mongoosejs.com/docs/populate.html
* How to find and update data in MongoDB using Mongoose https://mongoosejs.com/docs/tutorials/findoneandupdate.html
* How to hande authentication and create protected routes https://morioh.com/p/88d350eef785

#  AlkemyChallenge
Disney API


## Description

This is a NodeJS and Express API that allows you to search a database of characters and movies from the world of Disney. As well as adding new records to a database.

### Pre requirements

_**NODE:**_

Download and install  [nodejs](https://nodejs.org/es/).

_**SENDGRID:**_

Create an account on  [Sendgrid](https://signup.sendgrid.com/). 

### Getting started

1.  Clone the repository

2.  Install NPM packages

```bash
npm install
```
3. When a user is registered, a welcome email is sent to him/her.  After creating an account on Sendgird, go to Sender Authentication and verirfy an email to use. Then go to Api Key and create one. Add sendgrid’s api key to the SENDGRID_API_KEY variable and your verified email to the SENDGRID_EMAIL variable in the ".env" file.

4. Start the server
```bash
npm start
```
5. Read the  _[Endpoints Documentation](https://documenter.getpostman.com/view/17950634/UVymzxZG)_ to use them


### Built with
**Express** - Web framework

**SQLite** - Database

**Sequelize** - Node ORM for mysql

**SendGrid** - Mail manager


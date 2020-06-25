[![Build Status](https://travis-ci.org/AbdoulNuru/Teamwork.svg?branch=develop)](https://travis-ci.org/AbdoulNuru/Teamwork) [![Coverage Status](https://coveralls.io/repos/github/AbdoulNuru/Teamwork/badge.svg?branch=develop)](https://coveralls.io/github/AbdoulNuru/Teamwork?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/118853cb469c86c9ecda/maintainability)](https://codeclimate.com/github/AbdoulNuru/Teamwork/maintainability)
# Teamwork
Teamwork is an internal social network for organizations employees, the goal of this application is to facilitate more interaction between colleagues and facilitate team bonding.

## Homepage
https://abdoulnuru.github.io/Teamwork/UI/index.html

## User Interface(UI)
- HTML
- CSS
- Javascript

## Api Endpoints
| Request Routes                       | Methods | Description                   |
| --------------                       | ------- | -----------                   |
| /api/v1/auth/signup                  | POST    | users can sign up             |
| /api/v1/auth/signin                  | POST    | users can sign in             |
| /api/v1/articles                     | POST    | users can add articles        |
| /api/v1/articles/:articleId          | PATCH   | users can modify articles     |
| /api/v1/articles/:articleId          | DELETE  | users can delete articles     |
| /api/v1/articles/:articleId/comments | POST    | users can comment on articles |
| /api/v1/feeds                        | GET     | users can view all articles   |
| /api/v1/articles/:articleId          | GET     | users can view a specific article|

## Api Documentation
[Documentation](https://documenter.getpostman.com/view/8960332/SVtPXB2b)

## Pivotal Tracker Stories 
[Project Stories](https://www.pivotaltracker.com/n/projects/2395459)

## Backend, Frameworks and other tools used
- Node js
- Express
- Mocha and Chai(for testing)
- babel

## Installation Guide
- To use this project locally you must install node js, then clone the project using
```
> git clone https://github.com/AbdoulNuru/Teamwork.git
```
- after cloning the project, you must install all the project dependencies using
```
> npm i
```
- after installing the project dependencies, you need to create a .env file to the project root and specify which port the project will run on, u do it like
```
> touch .env
```
- after that you are good to go, now you can run the project using
```
> npm start
```
- to test endpoints you will use a tool called postman.
- and finally to run tests you can use
```
> npm test
```
## Contributor
Abdoul Nuru Niyigena abdoulniyigena@gmail.com

## Copyright
Copyright (c) Abdoul Nuru Niyigena

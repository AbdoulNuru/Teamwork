[![Build Status](https://travis-ci.org/AbdoulNuru/Teamwork.svg?branch=develop)](https://travis-ci.org/AbdoulNuru/Teamwork) [![Coverage Status](https://coveralls.io/repos/github/AbdoulNuru/Teamwork/badge.svg?branch=develop)](https://coveralls.io/github/AbdoulNuru/Teamwork?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/118853cb469c86c9ecda/maintainability)](https://codeclimate.com/github/AbdoulNuru/Teamwork/maintainability)
# Teamwork
Teamwork is an internal social network for organizations employees, the goal of this application is to facilitate more interaction between colleagues and facilitate team bonding.

## Homepage
https://abdoulnuru.github.io/Teamwork/UI/index.html

## User Interface(UI)
- HTML
- CSS
- Javascript

## Required Features
1. Employees can create their own user account. https://abdoulnuru.github.io/Teamwork/UI/views/signup.html
2. Employees can sign in. https://abdoulnuru.github.io/Teamwork/UI/views/login.html
3. Employees can write and/or share articles with colleagues on topics of interest to them. https://abdoulnuru.github.io/Teamwork/UI/views/userDashboard.html
4. Employees can edit their articles. https://abdoulnuru.github.io/Teamwork/UI/views/editArticle.html
5. Employees can delete their articles. https://abdoulnuru.github.io/Teamwork/UI/views/deleteArticle.html
6. Employees can comment on other colleagues' article post. https://abdoulnuru.github.io/Teamwork/UI/views/addComment.html
7. Employees can view all articles showing the most recently posted articles first. https://abdoulnuru.github.io/Teamwork/UI/views/viewAll.html
8. Employees can view a specific article. https://abdoulnuru.github.io/Teamwork/UI/views/viewOne.html

## Optional Features
- Employees can view all articles that belong to a category (tag). https://abdoulnuru.github.io/Teamwork/UI/views/viewAll.html
- Employees can flag a comment, or article as inappropriate. https://abdoulnuru.github.io/Teamwork/UI/views/viewOne.html   
- Admin can delete a comment, or article flagged as inappropriate. https://abdoulnuru.github.io/Teamwork/UI/views/adminDashboard.html

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
[Documentation](https://web.postman.co/collections/8960332-c389a896-fb23-4d3a-b5b6-9a313c2c1bc6?version=latest&workspace=8f86e689-ecec-4e31-8b13-41a7832e1ba8)

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
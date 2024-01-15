# Task Management API

This API allows users to manage tasks associated with their accounts. The API provides endpoints for user authentication, task creation, retrieval, updating, and deletion.

## Table of Contents
- [Get User Data](#get-user-data)
- [User Signup](#user-signup)
- [User Login](#user-login)
- [Create Task](#create-task)
- [Get User Tasks](#get-user-tasks)
- [Update Task](#update-task)
- [Delete Task](#delete-task)

## Get User Data

Retrieve user data by providing the email in the request:

```http
GET http://localhost:3001/user/john.doe@example.com

## User Signup
Sign up a new user by sending a POST request with the following JSON payload:

POST http://localhost:3001/user/signup

{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "hashedpassword123"
}

User Login
Log in as an existing user by sending a POST request with the user's email and password:
POST http://localhost:3001/user/login

{
  "email": "john.doe@example.com",
  "password": "hashedpassword123"
}

Create Task
Create a new task for a user by sending a POST request with task details:

http://localhost:3001/user/john.doe@example.com/tasks

{
  "title": "Complete Taskeddd",
  "description": "Finish the assignment",
  "user": "65a515a6d374ffcc9cc65371",
  "completed": true
}

Get User Tasks
Retrieve tasks associated with a user by sending a GET request:

GET http://localhost:3001/user/john.doe@example.com/tasks


Update Task
Update an existing task for a user by sending a PUT request with task details:

PUT http://localhost:3001/user/john.doe@example.com/tasks/65a535285efb219581e1ae23

{
  "title": "Complete Task",
  "description": "Finish the assignment",
  "user": "65a515a6d374ffcc9cc65371",
  "completed": false
}

Delete Task
Delete an existing task for a user by sending a DELETE request:

http://localhost:3001/user/john.doe@example.com/tasks/65a535285efb219581e1ae23




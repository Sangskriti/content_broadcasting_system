# Content Broadcasting System - Backend

## Project Overview
This is a Node.js and Express-based backend system designed for managing and broadcasting educational content with Role-Based Access Control (RBAC).

## Key Features
Database Management: MySQL with Sequelize ORM for efficient data handling.

File Storage: Implemented Local Storage system using Multer for handling teacher-uploaded media.

RBAC (Role-Based Access Control):

Teacher: Can upload content and view their own dashboard.

Principal: Has the authority to approve or reject content with specific reasons.

Dynamic Scheduling Logic:

Content visibility is restricted to the defined start_time and end_time.

Automated Rotation: If multiple approved contents exist, the system dynamically rotates them based on their duration (e.g., every 5 minutes).

## Tech Stack
Runtime: Node.js

Framework: Express.js

Database: MySQL

Authentication: JWT (JSON Web Token)

ORM: Sequelize

Middleware: Multer (File Uploads), Bcrypt (Password Hashing)

# AskDoc

## Introduction

AskDoc is an application that leverages Artificial Intelligence (AI) to
guide users through symptom descriptions, offering preliminary
medical advice instantly. The frontend application of this app was built with Vite + React and Python Django on the server.

## Overview

This app allows users to do the following

- Register an account.
- Create a user profile including relevant personal data that can help generate personalized responses.
- Make inquiries based on their health issue and symptoms.
- Receive possible symptoms from our backend based on their input and available personal information.

## Tech Stack (Dependencies)

## Frontend

You must have the [Vite + React JS](https://vitejs.dev/guide/) with [TailwindCSS](https://tailwindcss.com/) to get started with the website's frontend. All frontend dependencies in this project can be installed with the Node Package Manager (NPM). Therefore, if not already installed on your machine, download and install [Node.js](https://nodejs.org/en/download/).

### Installation

-Fork and clone the repository to your machine
-Install all frontend dependencies with the following commands sequentially:

```
npm init -y
npm install
```

## The server-side contains two Django apps: user_authentication and web app.

### user_authentication app
This app is responsible for user authentication and authorization. It customizes Django’s built-in User model and auth module to handle user registration, login, logout, password change, and password reset. It also uses Django’s permission and group features to assign different levels of access to users based on their roles.

### web app
This app is responsible for machine learning and artificial intelligence endpoints. It uses various Python libraries such as pandas, openai. It also uses Django’s rest_framework module to create RESTful APIs that can be consumed by the frontend or other applications.

## Database Configuration
The project uses PostgreSQL as the database backend. PostgreSQL is a powerful, open source, object-relational database system that supports advanced features such as transactions, concurrency, and full-text search. To connect to PostgreSQL, the project uses psycopg2, which is a popular PostgreSQL adapter for Python.

The database configuration is specified in the settings.py file as follows:

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'django_db',
        'USER': 'django_user',
        'PASSWORD': 'django_password',
        'HOST': 'localhost',
        'PORT': 'port',
    }
}

## Run
To run the project, you need to have Python 3.8 or higher and PostgreSQL installed on your system. You also need to install the required Python packages using the following command:

pip install -r requirements.txt

The requirements.txt file contains the list of packages and their versions that are needed for the project.

To start the development server, you can use the following command:

python manage.py runserver

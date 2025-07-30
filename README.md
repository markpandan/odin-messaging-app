# odin-messaging-app

### App Title: <ins>**_BuzzChat_**</ins>

This repository was made as a submission requirement to [The Odin Project: Messaging App](https://www.theodinproject.com/lessons/nodejs-messaging-app)

![BuzzChat app Image](https://imgur.com/VWvrpUC.jpg)

## Live Demo

You can access the website here: https://odin-messaging-app-three.vercel.app/login

## Features

This is a messenger web app that features the following key aspects:

- **Account management** - Allows to sign up, and log in which utilizes [JWT (JSON Web Token)](https://www.jwt.io/introduction) as authentication
- **Chat with available users** - Which are securely stored on the [PostgreSQL](https://www.postgresql.org/) database.
- **Allows image uploads** - Utilizes [Cloudinary](https://cloudinary.com/) to securely store uploaded images.
- **Modify account profile** - Allows the user to change how their details being displayed, and is being dynamically updated to the backend.

## Installation

Clone this repository, and install the necessary modules by running this command in your command line that was relative to the file directory you've created:

```
npm install
```

The backend of this app was located at [odin-messaging-app-api
](https://github.com/markpandan/odin-messaging-app-api). Make sure to run them side-by-side to ensure that it works.

This app utilizes environment variable to secretly store the API URL. Make sure to create an `.env` file, and the place the URL of the configured API of this app to continue:

```
VITE_API_URL = "your_api_url"
```

You can now run the app by executing this command. A URL link will be provided as an output which you need to access:

```
npm run dev
```

## Components

This repository utilizes the following libraries and/or APIs:

- [React](https://react.dev/learn)
- [Tailwind CSS](https://tailwindcss.com/)
- [jwt-decode](https://www.npmjs.com/package/jwt-decode)

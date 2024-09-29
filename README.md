# Generic Node.js Express API

Welcome to the Generic Node.js Express API repository! This repository contains the code and documentation for a generic Express API built using Node.js, as well as a frontend server.

### Quick Start

> [!TIP]
> Create a project from scratch
```
npx generic-nodejs-express-api my-awesome-api-project
```

> [!TIP]
> Add it to an existing project
```
npm i generic-nodejs-express-api
```

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Generic Node.js Express API is a template project that provides a basic setup for building RESTful APIs using Node.js and Express. It includes several utilities and configurations to help you get started quickly. Additionally, this project runs both a frontend and an API server. The frontend is accessible at `localhost`, and the API is available at `api.localhost`.

| Front End | API |
|--|--|
| ![frontend](https://github.com/user-attachments/assets/f55ce564-22a2-48f3-b44f-ff4aff5b4edf)| ![api](https://github.com/user-attachments/assets/2e96d3ff-8e9d-48b6-be19-4486fd757643)|
| localhost | api.localhost |
| [dmeo frontend](https://generic-nodejs-express-api-442d639bd451.herokuapp.com/) | [demo api](https://api.generic-nodejs-express-api-442d639bd451.herokuapp.com) |

## Installation

### NPX
> RUn it as an NPX

  ```bash
  npx generic-nodejs-express-api my-awesome-api-project
  ```

To set up the Generic Node.js Express API, follow these steps:

1. Clone this repository to your local machine:
   ```bash
   git clone git@github.com:npm-packages-collection/generic-nodejs-express-api.git
   ```
2. Navigate into the project directory:
   ```bash
   cd generic-nodejs-express-api
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. (Optional) Set up HTTPS certificates:
   ```bash
   sudo npm run certs
   ```

## Usage

To start the API server, use one of the following commands depending on your environment:

- **Development:**
  ```bash
  npm run dev
  ```

- **Production:**
  ```bash
  npm run start
  ```

You can also run the server with HTTPS enabled:

- **Development with HTTPS:**
  ```bash
  npm run dev:https
  ```

- **Production with HTTPS:**
  ```bash
  npm run prod:https
  ```

## Development

### Scripts

- **Reset dependencies:**
  ```bash
  npm run reset
  ```
  This command removes `node_modules` and `package-lock.json` and reinstalls dependencies.

- **Generate certificates:**
  ```bash
  sudo npm run certs
  ```
  This command will:

  1. Create a certs directory (if it doesn't already exist).
  2. Generate a self-signed SSL certificate (`selfsigned.crt`) and private key (`selfsigned.key`) in the certs directory for HTTPS development.
  3. Set appropriate permissions for the generated files.
  4. Base64-encode the certificate and key and store them as environment variables (`APP_CRT` and `APP_KEY`) in the `.env` file.
  5. Set the application port (APP_PORT=3000) in the `.env` file.
  6. Clean up by removing the certs directory after the environment variables have been set.

### Environment Variables

Create a `.env` file in the root directory and add your environment-specific variables, such as API keys and database URLs.

### Testing

The project uses Mocha and Chai for testing. To run tests, use:

```bash
npm test
```

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request. Ensure that you follow the project's contribution guidelines.

## License

This project is licensed under the ISC License.


### Environment Variables

Create a `.env` file in the root directory and add your environment-specific variables, such as API keys and database URLs.

### Testing

The project uses Mocha and Chai for testing. To run tests, use:

```bash
npm test
```

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request. Ensure that you follow the project's contribution guidelines.

## License

This project is licensed under the ISC License.

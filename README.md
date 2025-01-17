# To-Do List Application

A To-Do List application built as part of The Odin Project assignment. This project allows users to add, modify, and delete tasks and projects, with features to filter tasks by date, priority, and project.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [DevDependencies](#devdependencies)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/todo-list.git
   cd todo-list
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

### Development

To start the development server with hot reloading:
```sh
npm start
```

### Production

To build the project for production:
```sh
npm run build
```

## Features

- Add, modify, and delete tasks
- Add, modify, and delete projects
- Filter tasks by date, priority, and project
- Persistent storage using `localStorage`
- Responsive design

## Project Structure

```
├── .gitignore
├── package.json
├── README.md
├── src/
│   ├── dataStore.js
│   ├── defaultData.js
│   ├── displayController.js
│   ├── index.js
│   ├── style.css
│   ├── taskManager.js
│   ├── taskView.js
│   ├── template.html
│   └── UIController.js
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js
```

- `src`: Contains the source code for the project.
  - `dataStore.js`: Manages the data storage and retrieval.
  - `defaultData.js`: Provides default data for the application.
  - `displayController.js`: Handles the rendering of UI elements.
  - `index.js`: Entry point of the application.
  - `style.css`: Contains the styles for the application.
  - `taskManager.js`: Defines the `TaskClass` and `SubTaskClass`.
  - `taskView.js`: Handles task filtering and sorting.
  - `template.html`: HTML template for the application.
  - `UIController.js`: Manages the UI interactions and event handlers.

- `webpack.common.js`: Common Webpack configuration.
- `webpack.dev.js`: Webpack configuration for development.
- `webpack.prod.js`: Webpack configuration for production.

## Scripts

The following scripts are defined in the `package.json` file:

- `start`: Starts the development server using Webpack Dev Server.
- `build`: Builds the project for production using Webpack.
- `test`: Placeholder for running tests.

## DevDependencies

The following development dependencies are defined in the `package.json` file:

- `css-loader`: ^7.1.2
- `html-loader`: ^5.1.0
- `html-webpack-plugin`: ^5.6.3
- `style-loader`: ^4.0.0
- `webpack`: ^5.95.0
- `webpack-cli`: ^5.1.4

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the ISC License.

# mars-rover

A simple NodeJS/React app to simulate the Mars Rover solution.

- [Getting started](#getting-started)
  - [Running the application](#running-the-application)
  - [Running the tests](#running-the-tests)
- [Roving the rovers](#roving-the-rovers)
- [Possible future extensions](#possible-future-extensions)
- [Scaling the solution](#scaling-the-solution)

## Getting started

Once you have cloned the solution, there are then a couple of prerequisites required for running this solution locally:

- [`node`](https://nodejs.org/en/) (project built with `v10.16.3`)
- [`yarn`](https://yarnpkg.com/lang/en/) (project built with `v1.17.3`)

Once these prerequisites have been installed, you must then run the following command in the root of the project in order to install the dependencies:

```bash
yarn install
```

### Running the application

In order to run the rover application, simply open a terminal in the root of the project and run the command:

```bash
yarn start
```

Once the rover is running, there are a number of features you may leverage. For more information on how to use the application, see the section [below](#roving-the-rovers).

### Running the tests

There are a number of unit tests covering the solution. These are run via the [`jest`](https://jestjs.io) framework. In order to run the tests, simply open a terminal in the root of the project and run the command:

```bash
yarn test
```

## Roving the rovers

Once you have [started the rover](#running-the-application), open a browser window at the following address:

```
http://localhost:9001
```

Here, you will see a number of input fields and buttons. The main application pane shows a list of rovers and their state. Each rover can be independently updated.

### **Grid boundary** input field

This input field is responsible for setting the upper X and upper Y coordinates of the grid. This must be in the format `"X Y"`, where both `X` and `Y` are numerical positive digits. These digits cannot exceed `100`. This field will error if all of the previously mentioned conditions are not met.

### **Remove a rover!** button

This button will remove a rover from the end of the input list. It will be `disabled` once there is only one rover left in the list.

### **Add a rover!** button

This button will add a new blank rover to the end input list. It will be `disabled` once there are ten rovers in the input list.

### **Rover \#** heading (per rover)

This heading depicts a unique identifier to separate the rovers.

### **Start state** input field (per rover)

This input field is responsible for setting the starting state of the rover. This must be in the format `"X Y BEARING"`, where both `X` and `Y` must be numerical positive digits not exceeding the grid boundaries, and `BEARING` is a single character representing one of the four standard compass points (`"N"`, `"E"`, `"S"`, `"W"`). This field will error if all of the previously mentioned conditions are not met.

### **Instructions to rove** input field (per rover)

This input field is responsible for setting the course of the rover. This must be a non-empty string with no whitespace, consisting of any combination of `"L"` (left), `"R"` (right), and `"M"` (move one cell in current bearing direction). This field will error if all of the previously mentioned conditions are not met.

### **End state** text field (per rover)

This text field is responsible for displaying the end state of the rover. This will be displayed in the format `"X Y BEARING"`. This field will error if the end state cannot be calculated yet (grid boundary, start state, and/or instructions have not been set) or if the end state escapes the specified grid boundary.

## Possible future extensions

There are a few of potential extensions available for this solution, should more time be spent on it. These include:

- displaying succinct and helpful error messages when an error occurs, rather than just setting an error state
- displaying the rovers in a grid, showing their movement from start to end
- extending the state management to recalculate all of the rover states on the changing of the grid boundary (the rover states currently only change when they are updated individually)

## Scaling the solution

This solution will scale relatively well due to the limitations and validation put in place. However, many of these are hard-coded and arbitrary for the purposes of a demo. These could be extended to be configurable.

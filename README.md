# Cron Parser

This project is a cron parser that takes a cron string and outputs the expanded values for each field along with the command to be executed.

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository:

    ```sh
    git clone <repository-url>
    cd cronParser
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

### Running the Cron Parser

To run the cron parser, provide a cron string as an argument:

```sh
node cronParser.js "*/15 0 1,15 * 1-5 /usr/bin/find"
```

Expected Output :

minute        0 15 30 45
hour          0
day of month  1 15
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   1 2 3 4 5
command       /usr/bin/find

### Running the test cases

To run the test cases, execute the below command :

```sh
npm test
```


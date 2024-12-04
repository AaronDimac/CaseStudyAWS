
# Case Study Project

This project demonstrates the implementation of an admin login page and employee details page using Node.js, Express, and `jsdom` for testing.

## Installation

### Install Dependencies
Run the following commands to set up the project:

```bash
npm init -y
npm install express cors
```

### Start the Server
To start the Node.js server:

```bash
node server.js
```

The server runs on [http://localhost:3000](http://localhost:3000).

## Testing

### Install Testing Dependencies
For testing, install the `jsdom` library:

```bash
npm install jsdom
```

### Run Tests
To run the test script:

```bash
node test-login.js
```

### Note on Testing
Since `jsdom` does not support full page navigation, you may see some error messages while testing. This is expected. If you see the message `"All tests passed!"`, it indicates that all tests have passed successfully.


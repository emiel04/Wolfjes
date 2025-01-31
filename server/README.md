# Wolfjes server

## Running the Project

Once the dependencies are installed, you can start the server in development mode with the following command:

- Using **npm**:

    ```bash
    npm run dev
    ```

- Using **pnpm**:
    ```bash
    pnpm run dev
    ```

This will start the Express server with **TypeScript** support and auto-reloading, and the WebSocket server using **Socket.io**. The server will be accessible at `http://localhost:3000`.

---

## Testing

The project is set up with [Jest](https://jestjs.io/) for unit testing.

To run the tests, use the following command:

```bash
 pnpm run test
```

Jest will automatically find all test files and run them, providing feedback on the test results.

---

## Linting and Formatting

This project uses **Biome** for linting and formatting to ensure code quality and consistency.

### To lint your code:

```bash
pnpm run lint
```

### To format your code:

```bash
pnpm run format
```

---

## Scripts

- **dev**: Starts the development server with hot reloading.
    ```bash
    pnpm run dev
    ```
- **build**: Builds the project using TypeScript.
    ```bash
    pnpm run build
    ```
- **start**: Starts the application in production mode.
    ```bash
    pnpm run start
    ```
- **test**: Runs unit tests.
    ```bash
    pnpm run test
    ```
- **bs**: Runs both build and start in sequence
    ```bash
    pnpm run bs
    ```
- **format**: Formats the project files using Biome.
    ```bash
    pnpm run format
    ```
- **lint**: Lints the source code with Biome.
    ```bash
    pnpm run lint
    ```
- **qa**: Runs the full QA pipeline, including formatting, linting, and testing.
    ```bash
    pnpm run qa
    ```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

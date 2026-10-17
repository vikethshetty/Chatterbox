# ChatterBox

ChatterBox is a real-time chat application with a React frontend and an Express/Socket.IO backend. MongoDB stores user accounts, conversations, and messages.

## Requirements

- Node.js 18 or newer (npm is included with Node.js)
- A MongoDB database. The app is set up to use MongoDB Atlas, so an internet connection is needed.
- A modern web browser
- A Gmail app password only if you want password-reset emails to work

## Setup

Open PowerShell in the project folder:

```powershell
cd "C:\Users\HP\OneDrive\Documents\Chatterbox"
```

Install the backend packages:

```powershell
npm.cmd install
```

Install the frontend packages:

```powershell
cd frontend
npm.cmd install
cd ..
```

If PowerShell allows npm scripts on your computer, you can use `npm` instead of `npm.cmd`. `npm.cmd` is provided as a workaround when PowerShell blocks the `npm.ps1` script.

## Configure environment variables

Create a file named `.env` in the project root, next to the top-level `package.json`. Add these settings and replace the example values with your own:

```env
PORT=5000
MONGO_DB_URI=mongodb+srv://<database-user>:<URL-encoded-password>@<cluster-host>/ChatterBox?appName=Chatterbox
JWT_SECRET=<long-random-secret>
USER=<gmail-address-for-password-resets>
PASS=<gmail-app-password>
NODE_ENV=development
```

In MongoDB Atlas, create a **Database User** and allow your computer's IP address under **Network Access**. The password in `MONGO_DB_URI` is the database user's password, not your Atlas website password. Atlas does not display an existing database user's password; reset it if you don't know it. If it contains URL-reserved characters such as `@`, `:`, `/`, or `#`, URL-encode those characters in the URI.

`USER` and `PASS` are used to send password-reset emails through Gmail. Create an app password for the Gmail account; do not use its normal sign-in password. If you do not need password-reset emails, these settings are not needed for basic chat.

Keep `.env` private. It is excluded by `.gitignore`; do not commit it, publish it, or paste credentials into chats or screenshots. If a secret is exposed, rotate it in the service that issued it and update `.env`.

## Run the application

Start the backend from the project root in one PowerShell window:

```powershell
cd "C:\Users\HP\OneDrive\Documents\Chatterbox"
npm.cmd run server
```

The backend listens on `http://localhost:5000`. When the database connects successfully, the terminal prints `Connected to MongoDB`.

Start the frontend in a second PowerShell window:

```powershell
cd "C:\Users\HP\OneDrive\Documents\Chatterbox\frontend"
npm.cmd run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Keep both terminal windows open while using the app. Stop either server with `Ctrl+C`.

## View the application's stored data

In MongoDB Atlas, open the cluster and select **Browse Collections**. The Mongoose models create collections for users, conversations, and messages (MongoDB commonly displays these as `users`, `conversations`, and `messages`) in the `ChatterBox` database.

User records contain private account data. Passwords are hashed by the app, but still treat the database as sensitive. Do not share database exports or screenshots containing personal information.

## Troubleshooting

- **`npm` is not recognized:** install Node.js, close and reopen PowerShell, then check `node -v` and `npm -v`.
- **PowerShell says running scripts are disabled:** run the commands as `npm.cmd ...` (for example, `npm.cmd run dev`). This avoids changing the machine's PowerShell execution policy.
- **MongoDB says `bad auth` / `authentication failed`:** check the database username and password in `MONGO_DB_URI`. Reset the Atlas Database User password if needed, update `.env`, and restart the backend.
- **MongoDB cannot connect:** confirm the Atlas cluster is running and your current IP is allowed under **Network Access**.
- **Frontend cannot reach the backend:** confirm both servers are running on ports `3000` and `5000`. The Vite development server proxies `/api` requests to port `5000`.
- **Password-reset emails fail:** verify `USER` and `PASS` are a Gmail address and its valid Gmail app password.

## Available scripts

From the project root:

- `npm.cmd run server` — start the backend with Nodemon

From the `frontend` folder:

- `npm.cmd run dev` — start the Vite development server
- `npm.cmd run build` — create a production frontend build in `frontend/dist`
- `npm.cmd run preview` — preview a production build locally
- `npm.cmd run lint` — run ESLint on the frontend source

About this app:
This is a Web app demo which consists of 3 separate modules:
1. NODE.js (without Express) | RestAPI Backend  | ex. localhost:5000/api/products
2. Vanilla JS | Admin frontend | localhost:8080
3. VUE.js | Client frontend | localhost:8081 (in development)

Scope creep consideration for the demo:
1. No cryptographic hash functions implementation on session cookies and user passwords (ex. bcrypt).
2. No https implementation (consequently no 'Secure' parameter on cookie headers).
3. No API test framework implementation (ex. Mocha).
4. No proper storage for users, currently they are stored in './backend/models/users.json' for ease of running this demo (ex. mySQL implementation would require Docker implementation as well).

Installation:
1. Install Node.js (https://nodejs.org/en/).
2. Pull git repo into any directory, -
$git remote add demo https://github.com/gregsavvy/Test-Web-App.git)
$git pull demo
3. Install dependencies, -
$npm install

Run:
1. From the main directory, -
$npm start

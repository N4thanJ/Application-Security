# Shop & Go
A app where a user could login and shop for various items, these items belong to different categories like:

## Installation
Create the following .env files in the corresponding directories:

`./front-end/.env`:
```
NEXT_PUBLIC_API_URL = http://localhost:3000
```

`./back-end/.env`:
```
DATABASE_URL = "postgresql://postgres:t@localhost:5432/ShopAndGo?schema=public"
APP_PORT = 3000

JWT_SECRET = "5ee95009d069d9a963d0c682aef1c42383b3fd08fc08b0b6f3b6dee0b8449731de98ed7005017c93340607d65590e35a627f8d7892f84faf269821de5c3394bc32cbe6820babd89547b1bbafde6195d56c155f4dae7837a4902b8acd04c457592af9e46cad1adf73fb570e2bbf283234fdbaf9e89a0840f11b3069d4788e65569d537c639ee575d75b344622db7caaef36d87084e7cefaa0b65ffcf3799476e4d1bf1f3e254437418fd8d0e603e1710e71af58d94c968dd99aeabd17a99de3359cb1e14bda6dac882f335268c077a92f16ff790f889057c761e5210d801c870e16e7108d5e8b320dcb666c9b41b32f1e2d41b9169bdbe2bc8ef1e715abba0850"
```

## Running the app
To get the app to run, run the following commands in the corresponding directories:

`./front-end/.env`:
```
cd front-end
npm install
npm run dev
```

`./back-end/.env`:
```
cd back-end
npm install
npm start
```

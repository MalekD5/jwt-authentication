# JWT Authentication (Javascript version)

JWT Authentication is an express project w/ MongoDB (mongoose). This project was built as PoC for a blog backend.



**Features:**

- JWT Authentication w/ Refresh Token.

- Protected routes for only authenticated users.

- Role Based routes protection for specific roles.

- auth, logout, refresh, and register routes.

- httpOnly and secure cookies. 

- Async CRUD operations using mongoose.



# Compiling

This project requires to have Mongo database. get your free database from [MongoDB Atlas]([https://www.mongodb.com/atlas/database).

1. clone this repository

```
git clone https://github.com/MalekD5/jwt-authentication.git
```

2. install depedencies

```
npm i
```

3. add your environmental variable to your `.env` file

```
MONGODB_URL=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
```

the `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` can be anything. for `MONGODB_URL` if you are using atlas, follow [this tutorial](https://www.mongodb.com/docs/guides/atlas/connection-string/) to get your mongodb connection string.

4. run `npm run dev` and happy hacking!

# License

This project falls under the MIT license.



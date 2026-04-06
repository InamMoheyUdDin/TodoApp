// import express from "express";
// import bodyParser from "body-parser";
// import pg from "pg";
// import bcrypt from "bcrypt";
// import session from "express-session";
// import passport from "passport";
// import dotenv from "dotenv";
// import { Strategy } from "passport-local";

import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import dotenv from "dotenv";
import passport from "./server/config/passport.js";
import todoRoutes from "./server/routes/todoRoutes.js";
import authRoutes from "./server/routes/authRoutes.js";

const app = express();
const port = 3000;
const saltRounds = 10;

dotenv.config()

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", todoRoutes);
app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// // HOME
// app.get("/", (req, res) => {
//   res.render("home.ejs");
// });

// // DASHBOARD
// app.get("/dashboard", (req, res) => {
//   if (!req.isAuthenticated()) {
//     return res.redirect("/login");
//   }
//   res.render("index.ejs");
// });

// // TODOS
// app.get("/todos", async (req, res) => {
//   if (!req.isAuthenticated()) {
//     return res.redirect("/login");
//   }

//   const duration = req.session.duration || "today";

//   const results = await db.query(
//     "SELECT * FROM items WHERE user_id = ($1) AND duration = ($2) ORDER BY id ASC",
//     [req.user.id, duration]
//   );

//   res.render("index.ejs", {
//     listTitle: "Today",
//     listItems: results.rows,
//     duration: duration,
//   });
// });

// // AUTH PAGES
// app.get("/register", (req, res) => {
//   res.render("register.ejs");
// });

// app.get("/login", (req, res) => {
//   res.render("login.ejs");
// });

// // REGISTER
// app.post("/register", async (req, res) => {
//   const email = req.body.username;
//   const password = req.body.password;

//   try {
//     const result = await db.query(
//       "SELECT email FROM users WHERE email = ($1)",
//       [email]
//     );

//     if (result.rows.length > 0) {
//       return res.redirect("/register");
//     }

//     const hash = await bcrypt.hash(password, saltRounds);

//     const newUser = await db.query(
//       "INSERT INTO users(email, hashed_password) VALUES ($1, $2) RETURNING *",
//       [email, hash]
//     );

//     req.login(newUser.rows[0], (err) => {
//       if (err) return res.redirect("/login");
//       res.redirect("/dashboard");
//     });
//   } catch (err) {
//     console.log(err);
//     res.redirect("/register");
//   }
// });

// // LOGIN
// app.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/todos",
//     failureRedirect: "/login",
//   })
// );

// // ADD ITEM
// app.post("/add", async (req, res) => {
//   if (!req.isAuthenticated()) {
//     return res.redirect("/login");
//   }

//   const item = req.body.newItem;
//   const duration = req.session.duration || "today";

//   if (!item || item.trim() === "") {
//     return res.redirect("/todos");
//   }

//   await db.query(
//     "INSERT INTO items(title, duration, user_id) VALUES($1, $2, $3)",
//     [item, duration, req.user.id]
//   );

//   res.redirect("/todos");
// });

// // EDIT ITEM
// app.post("/edit", async (req, res) => {
//   if (!req.isAuthenticated()) {
//     return res.redirect("/login");
//   }

//   const itemID = req.body.updatedItemId;
//   const updatedItem = req.body.updatedItemTitle;

//   await db.query(
//     "UPDATE items SET title = ($1) WHERE id = ($2) AND user_id = ($3)",
//     [updatedItem, itemID, req.user.id]
//   );

//   res.redirect("/todos");
// });

// // SET DURATION
// app.post("/duration", (req, res) => {
//   req.session.duration = req.body.duration;
//   res.redirect("/todos");
// });

// // DELETE ITEM
// app.post("/delete", async (req, res) => {
//   if (!req.isAuthenticated()) {
//     return res.redirect("/login");
//   }

//   const itemID = req.body.deleteItemId;

//   await db.query(
//     "DELETE FROM items WHERE id = ($1) AND user_id = ($2)",
//     [itemID, req.user.id]
//   );

//   res.redirect("/todos");
// });

// //PASSPORT STRATEGY
// passport.use(
//   new Strategy(async function verify(username, password, cb) {
//     try {
//       const result = await db.query(
//         "SELECT * FROM users WHERE email = ($1)",
//         [username]
//       );

//       if (result.rows.length === 0) {
//         return cb(null, false);
//       }

//       const user = result.rows[0];

//       const isValid = await bcrypt.compare(
//         password,
//         user.hashed_password
//       );

//       if (isValid) {
//         return cb(null, user);
//       } else {
//         return cb(null, false);
//       }
//     } catch (err) {
//       return cb(err);
//     }
//   })
// );

// // SERIALIZE USER 
// passport.serializeUser((user, cb) => {
//   cb(null, user.id);
// });

// // DESERIALIZE USER 
// passport.deserializeUser(async (id, cb) => {
//   try {
//     const result = await db.query(
//       "SELECT * FROM users WHERE id = $1",
//       [id]
//     );
//     cb(null, result.rows[0]);
//   } catch (err) {
//     cb(err);
//   }
// });

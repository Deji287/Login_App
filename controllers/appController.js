import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import userModel from "../model/user.model.js";

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export const register = async (req, res) => {
  try {
    const { email, password, username, profile } = req.body;

    // check for existing user

    const existUsername = userModel.findOne(
      { username }.then((user) => {
        if (err) reject(new Error(err));
        if (user) reject({ error: "Please use unique username" });
      })
    );

    //check for existing email

    const existEmail = userModel.findOne(
      { email }.then((email) => {
        if (err) reject(new Error(err));
        if (email) reject({ error: "Please use unique email" });
      })
    );

    Promise.all([existUsername, existEmail])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new UserModel({
                username,
                password: hashedPassword,
                email,
                profile: profile || "",
              });

              // return and save password
              user
                .save()
                .then((result) =>
                  res.status(201).send({ msg: "User registered successfully" })
                )
                .catch((error) => res.status(500).send({ error }));
            })
            .catch((error) => {
              return res.status(500).send({
                error: "Enable to hashed password",
              });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
};

/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export const login = async (req, res) => {
  res.json("login route");
};

/** GET: http://localhost:8080/api/user/example123 */

export const getUser = async (req, res) => {
  res.json("getUser route");
};

/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export const updateUser = async (req, res) => {
  res.json("update route");
};

/** GET: http://localhost:8080/api/generateOTP */
export const generateOTP = async (req, res) => {
  res.json("generateOTP route");
};

/** GET: http://localhost:8080/api/verifyOTP */
export const verifyOTP = async (req, res) => {
  res.json("verifyOTP route");
};

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export const createResetSession = async (req, res) => {
  res.json("createResetSession route");
};

// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export const resetPassword = async (req, res) => {
  res.json("reset route");
};

import { NextFunction } from "express";
import passport from "passport";
import { User } from "../../database/user/userSchema.js";

/**
 * Handles login request from the user
 * 
 * @param req `Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>`
 * @param res `Response<any, Record<string, any>, number>`
 * @param next `NextFunciton`
 */
export const login = (req: any, res: any, next: NextFunction) => {
  if ((req.body.username, req.body.password)) {
    passport.authenticate("local", (error, user) => {
      if (error) return res.status(500).send(error);
      req.login(user, (error) => {
        if (error) return res.status(500).send(error);
        return res.status(200).send("Bejelentkezes sikeres");
      });
    })(req, res);
  } else {
    return res.status(400).send("Hibas keres, username es password kell");
  }
};

/**
 * Logs out the user.
 * 
 * @param req `Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>`
 * @param res `Response<any, Record<string, any>, number>`
 * @param next `NextFunciton`
 */
export const logout = (req: any, res: any, nex: NextFunction) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        console.log("Hiba a kijelentkezés során");
        return res.status(500).send(err);
      }
      return res.status(200).send("Kijelentkezes sikeres");
    });
  } else {
    return res.status(403).send("Nem is volt bejelentkezve");
  }
};

/**
 * Requests the user's status, if it is logged in then returns with HTTP 200, if not
 * it throw an HTTP error.
 * 
 * @param req `Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>`
 * @param res `Response<any, Record<string, any>, number>`
 * @param next `NextFunciton`
 */
export const user_status = (req: any, res: any, next: NextFunction) => {
    if (req.isAuthenticated()) return res.status(200).send(req.user);

    return res.status(403).send("Cannot find sufficient login record!");
}


/**
 * Register users in to the database
 * 
 * @param req `Request<{}, any, any, QueryString.ParsedQs, Record<string, any>>`
 * @param res `Response<any, Record<string, any>, number>`
 */
export const regiszt = async (req: any, res: any) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    accessLevel: 1,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
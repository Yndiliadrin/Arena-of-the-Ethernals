
/**
 * If the request does not have a valid session, than this middleware will
 * throw a HTTP 499
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export async function MAuth(req, res, next) {
  if (!req.user) return res.status(499).json({ message: "Unauthorized" });
  next();
}

import cookie from "cookie";
import { func } from "prop-types";

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || " " : "");
}

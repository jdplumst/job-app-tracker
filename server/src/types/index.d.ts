import "express-session";
export = session;
declare module "express-session" {
  interface SessionData {
    user: { userId: string; username: string };
  }
}

interface SessionData {
  cookie: Cookie;
}

import { CognitoJwtVerifier } from "aws-jwt-verify";
import { NextFunction, Request, Response } from "express";

const verifier = CognitoJwtVerifier.create({
  userPoolId: "eu-central-1_5sj9hFIrD",
  tokenUse: "access",
  clientId: "j46vuvdm8r6s4fcq4bk37airl",
});

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ error: "Token error" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: "Token malformatted" });
  }

  try {
    await verifier.verify(token);
  } catch (err) {
    return res.status(401).json({ error: "Token invalid" });
  }

  return next();
};

export { auth };

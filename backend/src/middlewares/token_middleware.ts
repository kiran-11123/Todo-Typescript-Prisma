import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Extend the Request interface to include `user`
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string;
    }
  }
}

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]; // Bearer <token>

    if (!token) {
      res.status(401).json({ message: 'Access token required' });
      return;
    }

    jwt.verify(token, 'kiran', (err, decoded) => {
      if (err) {
        res.status(403).json({ message: 'Invalid token' });
        return;
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(400).json({ message: 'Token validation failed' });
  }
}

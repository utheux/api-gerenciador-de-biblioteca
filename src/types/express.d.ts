// express.d.ts
declare namespace Express {
    export interface Request {
      user?: {
        userId: string;
        userRole: string;
        userEmail: string;
      };
    }
  }
  
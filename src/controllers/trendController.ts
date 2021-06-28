import { Request, Response, NextFunction } from 'express';
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'db',
  user: 'user',
  password: 'password',
  database: 'door',
  port: 3306,
});

connection.connect();

type GetTrends = {
  id: string;
  ogpId: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

export interface TrendController {
  getTrends: Promise<GetTrends>;
}

const TrendController = {
  getTrends: async (req: Request, res: Response, next: NextFunction) => {
    connection.query('select * from trends', function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
  },
};

export default TrendController;

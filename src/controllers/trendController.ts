import { Request, Response, NextFunction } from 'express';
import mysql from 'mysql2';
import { GetOGPResponse } from './ogpController';

const connection = mysql.createConnection({
  host: 'db',
  user: 'user',
  password: 'password',
  database: 'door',
  port: 3306,
});

connection.connect();

type Trend = {
  id: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

type GetTrendResponse = {
  id: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
} & GetOGPResponse;

export interface TrendController {
  getTrends: Promise<GetTrendResponse[]>;
}

// select trend.id, trend.comment, trend.created_at, trend.updated_at, ogp.href, ogp.title, ogp.description, ogp.src from trends trend inner join ogps ogp where ogp.trend_id = trend.id

const TrendController = {
  getTrends: async (req: Request, res: Response, next: NextFunction) => {
    connection.query(
      'select trend.id, trend.comment, trend.created_at, trend.updated_at, ogp.href, ogp.title, ogp.description, ogp.src from trends trend inner join ogps ogp where ogp.trend_id = trend.id',
      (error, results: Trend[], fields) => {
        if (error) throw error;
        res.json(results);
      }
    );
  },
};

export default TrendController;

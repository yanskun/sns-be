import { Request, Response, NextFunction } from 'express';
import mysql from 'mysql2';
import { Trend, OGP, Tag } from '../types';

const connection = mysql.createConnection({
  host: 'db',
  user: 'user',
  password: 'password',
  database: 'door',
  port: 3306,
});

connection.connect();

type GetTrendResponse = {
  id: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  ogp: OGP;
  tags: Tag[];
};

type GetTrendResult = {
  trend: Trend;
  ogp: OGP;
};

export interface TrendController {
  getTrends: Promise<GetTrendResponse[]>;
}

const TrendController = {
  getTrends: async (req: Request, res: Response, next: NextFunction) => {
    connection.query(
      {
        sql: 'SELECT * FROM trends trend INNER JOIN ogps ogp ON ogp.trend_id = trend.id',
        nestTables: true,
      },
      async (error, results: GetTrendResult[], fields) => {
        if (error) throw error;

        results.map((result) => {
          connection.query(
            {
              sql: `select * from tags where tags.id in (SELECT trend_tags.tag_id FROM trend_tags WHERE trend_tags.trend_id = ?)`,
              values: result.trend.id,
            },
            (tagErr, tagResults: Tag[]) => {
              if (tagErr) throw tagErr;

              const response = {
                ...result.trend,
                ogp: result.ogp,
                tags: tagResults,
              };

              res.json(response);
            }
          );
        });
      }
    );
  },
};

export default TrendController;

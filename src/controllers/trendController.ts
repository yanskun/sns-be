import { Request, Response } from 'express';
import mysql from 'mysql2';
import async from 'async';
import { v4 as uuid4 } from 'uuid';
import { Trend, OGP, Tag } from '../types';

const connection = mysql.createConnection({
  host: 'db',
  user: 'user',
  password: 'password',
  database: 'door',
  port: 3306,
  multipleStatements: true,
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

type PostTrendRequest = {
  trend: Pick<Trend, 'comment'>;
  ogp: Pick<OGP, 'href' | 'title' | 'description' | 'src'>;
  tags: string[];
};

export interface TrendController {
  getTrends: Promise<GetTrendResponse[]>;
}

const TrendController = {
  getTrends: async (_: any, res: Response) => {
    connection.query(
      {
        sql: 'SELECT * FROM trends trend INNER JOIN ogps ogp ON ogp.trend_id = trend.id',
        nestTables: true,
      },
      async (error, results: GetTrendResult[]) => {
        if (error) throw error;

        const response: GetTrendResponse[] = [];
        await async.eachSeries(
          results,
          (data, callback) => {
            connection.query(
              {
                sql: `select * from tags where tags.id in (SELECT trend_tags.tag_id FROM trend_tags WHERE trend_tags.trend_id = ?)`,
                values: data.trend.id,
              },
              (tagErr, tagResults: Tag[]) => {
                if (tagErr) throw tagErr;

                response.push({
                  ...data.trend,
                  ogp: data.ogp,
                  tags: tagResults,
                });

                callback();
              }
            );
          },
          () => {
            res.json(response);
          }
        );
      }
    );
  },
  postTrend: async (req: Request<PostTrendRequest>, res: Response) => {
    const { trend, tags, ogp } = req.body;
    const now = new Date();

    const trendId = uuid4();
    const postTrendQuery = 'INSERT INTO trends VALUES (?, ?, ?, ?)';
    const postTrendValues = [trendId, trend.comment, now, now];
    const postTrendSQL = mysql.format(postTrendQuery, postTrendValues);

    const OGPId = uuid4();
    const postOGPQuery = 'INSERT INTO ogps VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const postOGPValues = [
      OGPId,
      ogp.title,
      ogp.description,
      ogp.src,
      ogp.href,
      now,
      now,
      trendId,
    ];
    const postOGPSQL = mysql.format(postOGPQuery, postOGPValues);

    const tagQueries = tags
      .map((tagId: string) => {
        const TrendTagsId = uuid4();
        const postTrendTagsQuery =
          'INSERT INTO trend_tags VALUES (?, ?, ?, ?, ?)';
        const postTrendTagsValues = [TrendTagsId, trendId, tagId, now, now];
        return mysql.format(postTrendTagsQuery, postTrendTagsValues);
      })
      .join(';');

    const sql = `begin;${postTrendSQL};${postOGPSQL};${tagQueries};commit;`;
    connection.query({ sql }, (err) => {
      if (err) {
        throw err;
      } else {
        res.send('created!');
      }
    });
  },
};

export default TrendController;

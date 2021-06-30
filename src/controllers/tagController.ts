import { Response } from 'express';
import mysql from 'mysql2';
import { Tag } from '../types';

const connection = mysql.createConnection({
  host: 'db',
  user: 'user',
  password: 'password',
  database: 'door',
  port: 3306,
  multipleStatements: true,
});

type GetTagResponse = {
  tags: Tag;
};

connection.connect();

const TagController = {
  getTags: async (_: any, res: Response) => {
    connection.query(
      {
        sql: 'SELECT * FROM tags',
        nestTables: true,
      },
      async (error, results: GetTagResponse[]) => {
        if (error) throw error;
        const response = results.map((tag) => {
          return tag.tags;
        });
        res.json(response);
      }
    );
  },
};

export default TagController;

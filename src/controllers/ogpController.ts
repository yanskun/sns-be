import { Request, Response, NextFunction } from 'express';
import { convertOGP } from '../utils/converter';
import axios from 'axios';
import { decode } from 'js-base64';

type GetOGPParam = {
  url: string;
};

export type GetOGPResponse = {
  href: string;
  title: string;
  description: string;
  src: string;
};

export interface OGPController {
  getOGP: Promise<GetOGPResponse>;
}

const OGPController = {
  getOGP: async (
    req: Request<{}, {}, {}, GetOGPParam>,
    res: Response,
    next: NextFunction
  ) => {
    const { url } = req.query;
    const decodedURL = decode(url);
    try {
      const result = await axios
        .get(decodedURL)
        .then((res) => res.data)
        .then((data) => convertOGP(data))
        .then((convertedORG) => {
          return { ...convertedORG, href: decodedURL };
        });
      res.json(result);
    } catch (err) {
      next(err.message);
    }
  },
};

export default OGPController;

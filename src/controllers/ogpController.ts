import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { decode } from 'js-base64';
import { JSDOM } from 'jsdom';

type GetORGParam = {
  url: string;
};

const convertOGP = async (url: string) => {
  const jsdom = new JSDOM();
  const parser = new jsdom.window.DOMParser();

  return await axios
    .get(url)
    .then((res) => res.data)
    .then((data) => {
      const el = parser.parseFromString(data, 'text/html');
      const headEls = el.head.children;

      // src
      const imageEl = Array.from(headEls).find(
        (e) => e.getAttribute('property') === 'og:image'
      );
      const src = !imageEl ? '' : imageEl.getAttribute('content') ?? '';

      // title
      const titleEl = Array.from(headEls).find(
        (e) =>
          e.getAttribute('property') === 'og:title' ||
          e.tagName === 'title' ||
          e.tagName === 'TITLE'
      );

      const title = !titleEl ? '' : titleEl.textContent ?? '';

      // title
      const descriptionEl = Array.from(headEls).find(
        (e) =>
          e.getAttribute('property') === 'og:description' ||
          e.getAttribute('name') === 'description'
      );
      const description = !descriptionEl ? '' : descriptionEl.textContent ?? '';

      return {
        href: url,
        title,
        description,
        src,
      };
    });
};

export interface OGPController {
  getOGP: Promise<void>;
}

const OGPController = {
  getOGP: async (
    req: Request<{}, {}, {}, GetORGParam>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await convertOGP(decode(req.query.url));
      res.json(result);
    } catch (err) {
      next(err.message);
    }
  },
};

export default OGPController;

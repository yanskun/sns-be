import { JSDOM } from 'jsdom';

type ConvertedOGP = {
  title: string;
  description: string;
  src: string;
};

export const convertOGP = (data: any): ConvertedOGP => {
  const jsdom = new JSDOM();
  const parser = new jsdom.window.DOMParser();

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
    title,
    description,
    src,
  };
};

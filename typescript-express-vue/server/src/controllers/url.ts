import { Request, Response } from "express";
import { UrlInterface, UrlShortner } from "../models/url-shortner";

import dotenv from "dotenv";
import { generateRandomStringFromCharArray } from "../util";
dotenv.config();

export class UrlShortnerController {
  private _url: string = "localhost:3000/u";
  private _baseSize: number = 6;
  private _base64Chars: string[] =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");

  constructor() {}

  getAll = (req: Request, res: Response) => {
    UrlShortner.findAll()
      .then((urls) => {
        if (urls) {
          res.json(urls);
        } else {
          res.json({ none: "none" });
        }
      })
      .catch((err) => {});
  };

  get = (req: Request, res: Response) => {
    const shortenedUrlRequest: GetShortenedUrl = req.params;
    console.log(shortenedUrlRequest);

    const shortenedUrlSuffix = shortenedUrlRequest.shortenedUrl;

    console.log(`Getting shortened url ${shortenedUrlSuffix}`);

    UrlShortner.findOne({
      where: { shortenedUrlSuffix },
    }).then((entity: UrlInterface | null) => {
      if (entity) {
        res.json(entity);
      } else {
        res.status(204).send();
      }
    });
  };

  create = (req: Request, res: Response) => {
    const actualUrlRequest: CreateShortenedUrl = req.body as CreateShortenedUrl;
    const actualUrl = actualUrlRequest.actualUrl;

    const shortenedUrlSuffix = generateRandomStringFromCharArray(
      this._base64Chars,
      this._baseSize
    );

    const shortenedUrl = `${this._url}/${shortenedUrlSuffix}`;
    console.log(`new url: ${shortenedUrl}`);

    const newShortenedUrl: UrlInterface = {
      shortenedUrl,
      shortenedUrlSuffix,
      actualUrl,
    };

    UrlShortner.create(newShortenedUrl)
      .then((urlShortner: UrlInterface) => {
        res.json(urlShortner);
      })
      .catch((e) => {
        res.json(e);
      });
  };
}

export interface GetShortenedUrl {
  shortenedUrl: string;
}

export interface CreateShortenedUrl {
  actualUrl: string;
}

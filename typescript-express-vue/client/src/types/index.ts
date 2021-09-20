export interface UrlInterface {
  id: number;
  shortenedUrlSuffix: string;
  shortenedUrl: string;
  actualUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateShortenedUrlCommand {
  actualUrl: string;
}

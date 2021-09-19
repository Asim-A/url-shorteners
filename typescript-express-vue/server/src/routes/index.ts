import { Request, Response, Router } from "express";
import { UrlShortnerController } from "../controllers/url";

export default class MainRouter {
  router: Router;

  shortenedUrlController: UrlShortnerController;

  constructor() {
    // Initialize controllers objects
    this.shortenedUrlController = new UrlShortnerController();

    // Initialize router object
    this.router = Router({ mergeParams: true });
    this.userRoutes();
  }

  private userRoutes() {
    this.router.route("/").get((req: Request, res: Response) => {
      console.log("hit standard");

      res.json({ result: "works" });
    });

    this.router.route("/u/:shortenedUrl").get(this.shortenedUrlController.get);

    this.router
      .route("/urls")
      .get(this.shortenedUrlController.getAll)
      .post(this.shortenedUrlController.create);
  }
}

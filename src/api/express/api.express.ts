import { Api } from "../api";
import express, { Express, Request, Response } from "express";

export class ApiExpress implements Api {
  private constructor(readonly app: Express) {}

  public static build() {
    const app = express();
    app.use(express.json());
    return new ApiExpress(app);
  }

  public addGetRoute(
    path: string,
    handle: (req: Request, res: Response) => Promise<void>
  ) {
    this.app.get(path, async (req, res) => {
      try {
        await handle(req, res);
      } catch (error) {
        res.status(500).json({
          message: "Internal server error",
          error: error,
        });
      }
    });
  }

  public addPostRoute(
    path: string,
    handle: (req: Request, res: Response) => Promise<void>
  ) {
    this.app.post(path, async (req, res) => {
      try {
        await handle(req, res);
      } catch (error) {
        res.status(500).json({
          message: "Internal server error",
          error: error,
        });
      }
    });
  }

  public addDeleteRoute(
    path: string,
    handle: (req: Request, res: Response) => Promise<void>
  ) {
    this.app.delete(path, async (req, res) => {
      try {
        await handle(req, res);
      } catch (error) {
        res.status(500).json({
          message: "Internal server error",
          error: error,
        });
      }
    });
  }

  async start(port: number): Promise<void> {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

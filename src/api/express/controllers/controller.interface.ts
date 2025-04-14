import { Request, Response } from "express";

export interface ControllerInteface {
  create(req: Request, res: Response): Promise<void>;
}

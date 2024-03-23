import { Response } from 'express';

export enum Status {
  Success = 200,
  Created = 201,
  Updated = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  InternalServerError = 500,
}

export const responseHandler = (
  res: Response,
  status: Status,
  success: boolean,
  message: string,
  data?: object | any[] | string | null,
) => {
  return res.status(status).json({ success, message, data });
};

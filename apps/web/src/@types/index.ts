export type ErrorFromBe = {
  message: string;
  success: boolean;
};

export type DecodedRefreshToken = {
  userId: number;
  role: string;
  exp: number;
  iat: number;
};

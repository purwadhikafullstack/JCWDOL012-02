export type RegisterPayload = {
  email: string;
};

export interface VerificationPayload extends RegisterPayload {
  name: string;
  password: string;
  code: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

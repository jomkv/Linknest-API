import { type Profile } from 'passport-google-oauth20';

export type AuthInput = Profile;

export type SignInData = { userId: string; displayName: string };

export type AuthResult = {
  accessToken: string;
  userId: string;
  displayName: string;
};

export type TokenPayload = { sub: string; displayName: string };

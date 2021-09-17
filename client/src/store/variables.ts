import { makeVar } from "@apollo/client";

export const errorAlertVar = makeVar<string>('');

export const successAlertVar = makeVar<string>('');
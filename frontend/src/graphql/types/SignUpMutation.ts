

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignUpMutation
// ====================================================

export interface SignUpMutation_signUp_user {
  id: string;
  name: string;
}

export interface SignUpMutation_signUp {
  token: string | null;
  user: SignUpMutation_signUp_user | null;
}

export interface SignUpMutation {
  signUp: SignUpMutation_signUp | null;
}

export interface SignUpMutationVariables {
  name: string;
  email: string;
  password: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
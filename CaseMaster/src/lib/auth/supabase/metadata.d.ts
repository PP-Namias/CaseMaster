// NOTE: You can define the user.user_metadata here
//  But I recommend to override the type exposed by supabase-js library
//  using TS Module Override strategy

export interface UserMetadata {
  avatar: string | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
}

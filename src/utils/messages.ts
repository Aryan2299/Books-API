export enum MESSAGES {
  USER_NOT_FOUND_ERR = "Error: User not found.",
  PASS_MATCH_ERR = "Error: Passwords do not match",
  LOGIN_ERR = "Error: An error occured. Couldn't login.",
  UNAUTH_ERR = "Error: Access denied",
  TOKEN_ERR = "Error: Invalid token",
  BOOK_EXISTS_ERR = "Error: Book already exists.",
  BOOK_DOES_NOT_EXIST_ERR = "Error: Book does not exist.",
  INT_SER_ERR = "Error: Something went wrong.",
  INVALID_PAGE_PARAMS_ERR = "Error: Invalid page number or page size.",

  BOOK_CREATED_SUCCESS = "Book created successfully.",
  BOOK_UPDATED_SUCCESS = "Book updated successfully.",
  BOOK_REMOVED_SUCCESS = "Book removed successfully.",
  REGISTER_SUCCESS = "User registered successfully. Please login with your credentials.",
}

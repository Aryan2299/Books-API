export type UpdateBooksDTO = {
  _id: string;
  update: {
    author?: string;
    title?: string;
    publication_year?: string;
  };
};

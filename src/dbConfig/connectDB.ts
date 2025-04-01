import { DataAPIClient, Db, VectorizeDoc } from "@datastax/astra-db-ts";

/**
 * Connects to a DataStax Astra database.
 * This function retrieves the database endpoint and application token from the
 * environment variables `ASTRA_DB_API_ENDPOINT` and `ASTRA_DB_APPLICATION_TOKEN`.
 *
 * @returns An instance of the connected database.
 * @throws Will throw an error if the environment variables
 * `ASTRA_DB_API_ENDPOINT` or `ASTRA_DB_APPLICATION_TOKEN` are not defined.
 */
export async function connectToDatabase(): Promise<Db> {
  const { ASTRA_DB_API_ENDPOINT: endpoint, ASTRA_DB_APPLICATION_TOKEN: token } =
    process.env;

  if (!token || !endpoint) {
    throw new Error(
      "Environment variables ASTRA_DB_API_ENDPOINT and ASTRA_DB_APPLICATION_TOKEN must be defined."
    );
  }

  // Create an instance of the `DataAPIClient` class with your token.
  const client = new DataAPIClient(token);

  // Get the database specified by your endpoint.
  const database = client.db(endpoint);

  console.log(`Connected to database ${database.id}`);

  return database;
}

export interface blogs extends VectorizeDoc {
    title: string;
    content: string;
    tags: Array<string>;
    videoFile: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

// // You can define interfaces that describe the shape of your data.
// // The VectorizeDoc interface adds a $vectorize key.
// export interface Book extends VectorizeDoc {
//   title: string;
//   author: string;
//   numberOfPages: number;
//   rating: number;
//   publicationYear: number;
//   summary: string;
//   genres: string[];
//   metadata: {
//     ISBN: string;
//     language: string;
//     edition: string;
//   };
//   isCheckedOut: boolean;
//   borrower: string | null;
//   dueDate: string | null;
// }

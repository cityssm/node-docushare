export interface JavaConfig {
  dsapiPath: string[];
}

export interface ServerConfig {
  serverName: string;
  serverPort?: number;
}

export interface SessionConfig {
  userDomain?: string;
  userName: string;
  password: string;
}

export interface JavaOutput {
  status: number;
  stdout: string;
  stderr: string;
}

export type DocuShareObjectClass = "Collection" | "Document";

export interface DocuShareOutput {
  success: boolean;
  dsObjects: DocuShareObject[];
  error?: string;
}

export interface DocuShareObject {
  handle: string;
  title: string;
  summary: string;
  description: string;
  keywords: string;
  createDate: string;
  createDateMillis: number;
  modifiedDate: string;
  modifiedDateMillis: number;
  expirationDate?: string;
  expirationDateMillis?: number;
}

export interface Filter {
  searchType: "equals" | "includes" | "includesPieces";
  searchString: string;
  _searchStringSplit?: string[];
}

type FilterField = "text" | "handle" | "title" | "summary" | "description";

export type FindChildrenFilters = {
  [filterField in FilterField]?: Filter;
};

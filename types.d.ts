export interface JavaConfig {
    dsapiPath: string;
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
export declare type DocuShareObjectClass = "Collection" | "Document";
export interface DocuShareObject {
    handle: string;
    title: string;
    summary: string;
    description: string;
    keywords: string;
    create_date: string;
    modified_date: string;
}

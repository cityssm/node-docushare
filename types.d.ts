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
export interface DocuShareOutput {
    dsObjects: DocuShareObject[];
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

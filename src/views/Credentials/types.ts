export interface Credential {
    ID: number,
    website_name: string,
    website_url: string,
    username: string,
    password: string
}

export type CredentialFormType = Omit<Credential, 'ID'>;

export interface Logo {
    name: string,
    ticker: string,
    image: string
}
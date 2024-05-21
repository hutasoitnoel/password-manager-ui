import { CredentialFormType } from "../components/Credentials/types"

export const BASE_URL: string = process.env.REACT_APP_PASSWORD_MANAGER_SERVICE_BASE_URL as string

export const ENDPOINT = {
    CHECK_AUTHORIZATION: 'check-auth',
    LOGIN: 'login',
    LOGOUT: 'logout',
    REGISTER: 'register',
    PASSWORDS: 'passwords',
    WEBSITE_LOGO: 'website-logo',
    SAVINGS: 'savings'
}

export const CARD_MODE = {
    EDIT: 'EDIT',
    DELETE: 'DELETE'
}

export const INITIAL_CREDENTIAL_FORM: CredentialFormType = {
    website_name: "",
    website_url: "",
    username: "",
    password: ""
}

export const TOAST_ICON = {
    SUCCESS: 'success',
    ERROR: 'error'
}

export const credentialFormFields: Array<keyof CredentialFormType> = [
    'website_name',
    "website_url",
    "username",
    "password"
]

export const FIELD_LABEL_MAPPER: CredentialFormType = {
    website_name: 'Website Name',
    website_url: 'Website URL',
    username: 'Username',
    password: 'Password'
}

export const SAVING_COLOR_MAPPER = {
    BCA: '#1164B2',
    Bibit: '#1164B2',
    Pluang: '#4B44FE',
    Stockbit: '#343434',
    Koinworks: '#A1333B'
}
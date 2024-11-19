import { CredentialFormType } from "../views/Credentials/types"
import { SavingFormType } from "../views/Savings/types"

interface StringMapper {
    [key: string]: string;
}

export const BASE_URL: string = process.env.REACT_APP_PASSWORD_MANAGER_SERVICE_BASE_URL as string

export const OCR_SERVICE_BASE_URL: string = process.env.REACT_APP_OCR_SERVICE_BASE_URL as string

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

export const INITIAL_SAVING_FORM: SavingFormType = {
    name: '',
    description: '',
    amount: 0
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


export const savingFormFields: Array<keyof SavingFormType> = [
    'name',
    "amount",
    "description"
]

export const CREDENTIALS_FIELD_LABEL_MAPPER: StringMapper = {
    website_name: 'Website Name',
    website_url: 'Website URL',
    username: 'Username',
    password: 'Password'
}

export const CREDENTIALS_FIELD_PLACEHOLDER_MAPPER: StringMapper = {
    website_name: 'Google',
    website_url: 'https://google.com',
    username: 'JohnDoe',
    password: '******'
}

export const SAVINGS_FIELD_LABEL_MAPPER: StringMapper = {
    name: 'Name',
    amount: 'Amount',
    description: 'Description'
}

export const SAVING_COLOR_MAPPER = {
    BCA: '#1164B2',
    Bibit: '#219F5F',
    Pluang: '#4B44FE',
    Stockbit: '#343434',
    Koinworks: '#A1333B'
}
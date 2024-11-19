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

export const INITIAL_KTP_FORM: any = {
    id_number: '',
    name: '',
    province: '',
    city: '',
    nationalId: '',
    dob: '',
    gender: '',
    blood_type: '',
    address: '',
    rt_rw: '',
    sub_district: '',
    district: '',
    religion: '',
    marital_status: '',
    occupation: '',
    citizenship: '',
    expiration_date: '',
}

export const INITIAL_SIM_FORM: any = {
    id_number: '',
    name: '',
    dob: '',
    blood_type: '',
    gender: '',
    address: '',
    occupation: '',
    place_of_issue: '',
    expiration_date: ''
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

export const ktpFormFields: any = [
    "id_number",
    "name",
    "province",
    "city",
    "dob",
    "gender",
    "blood_type",
    "address",
    "rt_rw",
    "sub_district",
    "district",
    "religion",
    "marital_status",
    "occupation",
    "citizenship",
    "expiration_date",
]

export const simFormFields: any = [
    "id_number",
    "name",
    "dob",
    "blood_type",
    "gender",
    "address",
    "occupation",
    "place_of_issue",
    "expiration_date"
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

export const KTP_FIELD_LABEL_MAPPER: StringMapper = {
    id_number: 'Identification number',
    name: 'Name',
    province: 'Province',
    city: 'City',
    dob: 'Place and date of birth',
    gender: 'Gender',
    blood_type: 'Blood type',
    address: 'Address',
    rt_rw: 'RT/RW',
    sub_district: 'Sub-distrcit',
    district: 'District',
    religion: 'Religion',
    marital_status: 'Marital status',
    occupation: 'Occupation',
    citizenship: 'Citizenship',
    expiration_date: 'Expiration date',
}

export const SIM_FIELD_LABEL_MAPPER: StringMapper = {
    id_number: 'Identification number',
    name: 'Name',
    dob: 'Date of birth',
    blood_type: 'Blood type',
    gender: 'Gender',
    address: 'Address',
    occupation: 'Occupation',
    place_of_issue: 'Place of issue',
    expiration_date: 'Expiration date'
}

export const CREDENTIALS_FIELD_PLACEHOLDER_MAPPER: StringMapper = {
    website_name: 'Google',
    website_url: 'https://google.com',
    username: 'JohnDoe',
    password: '******'
}

export const KTP_FIELD_PLACEHOLDER_MAPPER: StringMapper = {
    id_number: 'xxxxxxxxxxxx',
    province: 'DKI Jakarta',
    city: 'Jakarta Timur',
    name: 'John Doe',
    dob: 'DKI Jakarta, 25-01-1989',
    gender: 'Laki-Laki',
    blood_type: 'AB',
    address: 'DKI Jakarta',
    rt_rw: '001/002',
    sub_district: 'Grogol Petamburan',
    district: 'Tomang',
    religion: 'Islam',
    marital_status: 'Belum kawin',
    occupation: 'Pegawai Swasta',
    citizenship: 'WNI',
    expiration_date: 'Seumur hidup',
}

export const SIM_FIELD_PLACEHOLDER_MAPPER: StringMapper = {
    id_number: 'xxx-xxx-xxxxxx',
    name: 'John Doe',
    dob: '25-01-1989',
    blood_type: 'AB',
    gender: 'Pria',
    address: 'DKI Jakarta',
    occupation: 'Pegawai Swasta',
    place_of_issue: 'DKI Jakarta',
    expiration_date: '25-01-2028'
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
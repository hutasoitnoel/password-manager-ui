import z from 'zod'

export const ktpFormSchema = z.object({
    id_number: z.string().min(16, {
        message: 'Please enter a valid KTP number',
    }),
    name: z.string().min(1, {
        message: 'Please enter your name',
    }),
    dob: z.string().min(1, {
        message: 'Please enter your date of birth',
    }),
    blood_type: z.string().max(3, {
        message: 'Please enter a valid blood type',
    }),
    gender: z.string().min(1, {
        message: 'Please enter your gender',
    }),
    address: z.string().min(1, {
        message: 'Please enter your address',
    }),
    occupation: z.string().min(1, {
        message: 'Please enter your occupation',
    }),
    expiration_date: z.string().min(1, {
        message: 'Please enter your SIM\'s expiration date',
    }),
    province: z.string().min(1, {
        message: 'Please enter your province',
    }),
    city: z.string().min(1, {
        message: 'Please enter your city',
    }),
    rt_rw: z.string().min(1, {
        message: 'Please enter your RT/RW',
    }),
    sub_district: z.string().min(1, {
        message: 'Please enter your sub-district',
    }),
    district: z.string().min(1, {
        message: 'Please enter your district',
    }),
    religion: z.string().min(1, {
        message: 'Please enter your religion',
    }),
    marital_status: z.string().min(1, {
        message: 'Please enter your marital status',
    }),
    citizenship: z.string().min(1, {
        message: 'Please enter your citizenship',
    }),
});


export const simFormSchema = z.object({
    id_number: z.string().min(14, {
        message: 'Please enter a valid SIM number',
    }),
    name: z.string().min(1, {
        message: 'Please enter your name',
    }),
    dob: z.string().min(1, {
        message: 'Please enter your date of birth',
    }),
    blood_type: z.string().max(3, {
        message: 'Please enter a valid blood type',
    }),
    gender: z.string().min(1, {
        message: 'Please enter your gender',
    }),
    address: z.string().min(1, {
        message: 'Please enter your address',
    }),
    occupation: z.string().min(1, {
        message: 'Please enter your occupation',
    }),
    place_of_issue: z.string().min(1, {
        message: 'Please enter place of issuance of your SIM',
    }),
    expiration_date: z.string().min(1, {
        message: 'Please enter your SIM\'s expiration date',
    }),
});
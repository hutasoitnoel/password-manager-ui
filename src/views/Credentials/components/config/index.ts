import z from 'zod'

export const formSchema = z.object({
    website_name: z.string().min(2, {
        message: 'Website name must be at least 2 characters.',
    }),
    website_url: z.string().min(2, {
        message: 'Enter a valid URL.',
    }),
    username: z.string().min(4, {
        message: 'Username must be at least 4 characters.',
    }),
    password: z.string().min(4, {
        message: 'Password must be at least 4 characters.',
    }),
});

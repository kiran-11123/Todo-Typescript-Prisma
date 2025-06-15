import {z} from 'zod'

export const signInput = z.object({
      email:z.string(),
      password : z.string(),

})

//zod inference so that we can take this type to frontend

export type SignupParams = z.infer<typeof signInput>




/* eslint-disable jsx-a11y/label-has-associated-control */

'use client'

import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '../../../_components/Input'
import { Button } from '../../../_components/Button'

const SingInSchema = z
  .object({
    mail: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'Minimum of 8 characters' })
      .regex(/^(?=.*[A-Z])(?=.*[\W_]).+$/, {
        message: 'At least 1 uppercase and 1 symbol',
      }),
  })
  .required({
    mail: true,
    password: true,
  })

export type SignInSchemaType = z.infer<typeof SingInSchema>

const SignIn = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignInSchemaType>({
    defaultValues: {
      mail: '',
      password: '',
    } as SignInSchemaType,
    resolver: zodResolver(SingInSchema),
  })

  const onSubmit = handleSubmit(async (formValue) => {
    console.log('======when submit sign in', formValue)
  })

  return (
    <main className="absolute top-0 left-0 z-10 w-full h-full overflow-hidden bg-gray-200 flex justify-center items-center">
      <section className="px-6 py-10 border border-solid border-gray-400 w-[300px] h-[350px] bg-white space-y-6">
        <div className="flex justify-center items-center h-10">
          <h2 className="font-bold text-2xl text-red-primary ">Book store</h2>
        </div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-start gap-6 h-[218px] "
        >
          <div className="flex flex-col gap-5">
            <label htmlFor="email" className="font-semibold text-sm">
              Email (*)
              <Input
                id="email"
                placeholder="Enter your email"
                registration={register('mail')}
                error={errors.mail}
              />
            </label>
            <label htmlFor="password" className="font-semibold text-sm">
              Password (*)
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                registration={register('password')}
                error={errors.password}
              />
            </label>
          </div>
          <Button
            className="bg-red-primary text-white font-bold text-sm h-10 w-full"
            type="submit"
            btnText="Login"
          />
        </form>
      </section>
    </main>
  )
}

export default SignIn

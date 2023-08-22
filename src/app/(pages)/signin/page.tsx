'use client'

// import useAuth from '@/context/useAuth'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
import { AuthContainer, Button, Input } from '@/components'
import useAuth from '@/context/useAuth'
import { useRouter } from 'next/navigation'
import { useForm, Resolver, SubmitHandler } from 'react-hook-form'

type TFormValues = {
  email: string
  password: string
}

const resolver: Resolver<TFormValues> = async values => {
  return {
    values,
    errors: {
      email: !values.email ? { type: 'required', message: 'This is required.' } : {},
      password:
        !values.password || values.password.length < 6
          ? { type: 'required', message: 'Password should be 6 length at least' }
          : {}
    }
  }
}

export default function SignInPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TFormValues>({ resolver })
  const onSubmit: SubmitHandler<TFormValues> = data => {
    console.log(data)
  }
  if (isAuthenticated) {
    router.replace('/')
    return <></>
  }
  return (
    <AuthContainer title="Sign Up">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('email', { required: true })}
          type="email"
          placeholder="email"
          label="Email"
          error={errors.email?.message}
          required
        />
        <Input
          {...register('password', { required: true })}
          type="password"
          placeholder="password"
          label="Password"
          error={errors.password?.message}
          required
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </AuthContainer>
  )
}
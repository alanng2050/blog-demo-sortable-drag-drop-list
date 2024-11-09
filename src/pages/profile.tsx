import {
  Button,
  Divider,
  Heading,
  HStack,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '@tinychange/chakra-hook-form'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import type { InferType } from 'yup'
import { passwordStrength } from 'check-password-strength'
import { omit } from '@tinychange/omit-pick'
import { useStoreState } from '@/store'
import { useUpdatePass, useUpdateUser } from '@/api/user'
import { CommonError } from '@/components/Error'

export { getStaticProps } from '@/utils/getStaticSideProps'

export default function Profile() {
  const updateMutation = useUpdateUser()
  const updatePassMutation = useUpdatePass()
  const toast = useToast()

  const user = useStoreState((s) => s.user.user)
  const schema = object({
    name: string().required('Required'),
  })
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: user?.name || '' },
  })

  const onSubmit = (data: InferType<typeof schema>) => {
    updateMutation.mutate(data, {
      onSuccess: () => {
        toast({ title: 'Updated.' })
      },
    })
  }

  const passwordSchema = object({
    password: string().required('Required'),
    newPassword: string()
      .required('Required')
      .test('password_strength', 'Too weak', (v) => {
        return passwordStrength(v).id > 0
      }),

    confirmNewPassword: string()
      .required('Required')
      .test('password_strength', 'Not match the New Password', (v, context) => {
        return context.parent['newPassword'] === v
      }),
  })

  const passwordForm = useForm({ resolver: yupResolver(passwordSchema) })
  const onUpdatePass = (data: InferType<typeof passwordSchema>) => {
    updatePassMutation.mutate(omit(data, ['confirmNewPassword']), {
      onSuccess: () => {
        toast({ title: 'Updated.' })
        passwordForm.reset()
      },
    })
  }

  return (
    <Stack
      spacing={4}
      sx={{
        maxWidth: 500,
        mx: 'auto',
      }}
    >
      <Heading>Profile</Heading>
      <Divider />
      <Heading size="md">Personal Information</Heading>
      <Stack spacing={4} as="form" onSubmit={handleSubmit(onSubmit)}>
        {updateMutation.isError && <CommonError />}
        <Input
          label="Name"
          inputProps={register('name')}
          err={errors.name?.message}
        />
        <Input
          inputProps={{ isDisabled: true, value: user?.email }}
          label="Email"
        />
        <HStack sx={{ mt: 4 }} justify="flex-end">
          <Button isLoading={updateMutation.isPending} type="submit">
            Update Info
          </Button>
        </HStack>
      </Stack>
      <Divider />
      <Heading size="md">Update Password</Heading>
      <Stack
        spacing={4}
        as="form"
        onSubmit={passwordForm.handleSubmit(onUpdatePass)}
      >
        {updatePassMutation.isError && <CommonError />}
        <Input
          label="Password"
          containerProps={{ mb: 4 }}
          inputProps={{
            ...passwordForm.register('password'),
            type: 'password',
          }}
          err={passwordForm.formState.errors.password?.message}
        />
        <Input
          label="New Password"
          inputProps={{
            ...passwordForm.register('newPassword'),
            type: 'password',
          }}
          err={passwordForm.formState.errors.newPassword?.message}
        />
        <Input
          label="Confirm New Password"
          inputProps={{
            ...passwordForm.register('confirmNewPassword'),
            type: 'password',
          }}
          err={passwordForm.formState.errors.confirmNewPassword?.message}
        />
        <HStack sx={{ mt: 4 }} justify="flex-end">
          <Button isLoading={updatePassMutation.isPending} type="submit">
            Update Password
          </Button>
        </HStack>
      </Stack>
    </Stack>
  )
}

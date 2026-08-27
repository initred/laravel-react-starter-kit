import { IconEye, IconEyeOff } from '@tabler/icons-react'
import type { ComponentProps, Ref } from 'react'
import { useState } from 'react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'

export default function PasswordInput({
  className,
  ref,
  ...props
}: Omit<ComponentProps<'input'>, 'type'> & { ref?: Ref<HTMLInputElement> }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <InputGroup className={className}>
      <InputGroupInput
        type={showPassword ? 'text' : 'password'}
        ref={ref}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          title={showPassword ? 'Hide password' : 'Show password'}
          size="icon-xs"
          tabIndex={-1}
          onClick={() => setShowPassword((previous) => !previous)}
        >
          {showPassword ? <IconEyeOff /> : <IconEye />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

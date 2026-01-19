@php
    /** @var \Laravel\Boost\Install\GuidelineAssist $assist */
@endphp
## Inertia v2 + React Forms

@if($assist->inertia()->hasFormComponent())
    @boostsnippet("`<Form>` Component Example", "react")
        import { Form } from '@inertiajs/react'

        export default () => (
        <Form action="/users" method="post">
            {({
            errors,
            hasErrors,
            processing,
            wasSuccessful,
            recentlySuccessful,
            clearErrors,
            resetAndClearErrors,
            defaults
            }) => (
            <>
            <input type="text" name="name" />

            {errors.name && <div>{errors.name}</div>}

            <button type="submit" disabled={processing}>
                {processing ? 'Creating...' : 'Create User'}
            </button>

            {wasSuccessful && <div>User created successfully!</div>}
        </>
        )}
    </Form>
    )
    @endboostsnippet

### Form with shadcn Field Components
- Use Inertia's `<Form>` for state management and shadcn's `Field` components for styling.
- Use Wayfinder's `.form()` method for type-safe action and method attributes.
- Apply `data-invalid` to `Field` and `aria-invalid` to inputs when errors exist.
- Use `FieldError` to display validation messages from Inertia's `errors` object.

    @boostsnippet("`<Form>` with Field Components", "react")
        import { Form } from '@inertiajs/react'
        import { store } from '@/actions/App/Http/Controllers/UserController'
        import { Input } from '@/components/ui/input'
        import { Button } from '@/components/ui/button'
        import { Spinner } from '@/components/ui/spinner'
        import {
            Field,
            FieldGroup,
            FieldLabel,
            FieldDescription,
            FieldError,
        } from '@/components/ui/field'

        export default () => (
            <Form {...store.form()} disableWhileProcessing>
                {({ errors, processing }) => (
                    <FieldGroup>
                        <Field data-invalid={!!errors.name}>
                            <FieldLabel htmlFor="name">Full name</FieldLabel>
                            <Input
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                aria-invalid={!!errors.name}
                            />
                            {errors.name && <FieldError>{errors.name}</FieldError>}
                        </Field>

                        <Field data-invalid={!!errors.email}>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                aria-invalid={!!errors.email}
                            />
                            <FieldDescription>We'll never share your email.</FieldDescription>
                            {errors.email && <FieldError>{errors.email}</FieldError>}
                        </Field>

                        <Button type="submit" disabled={processing}>
                            {processing && <Spinner />}
                            Create User
                        </Button>
                    </FieldGroup>
                )}
            </Form>
        )
    @endboostsnippet
@endif

@if($assist->inertia()->hasFormComponent() === false)
    {{-- Inertia 2.0.x, not 2.1.0 or higher. So still need to use 'useForm' --}}
    @boostsnippet("Inertia React useForm Example", "react")
    import { useForm } from '@inertiajs/react'

    const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
    })

    function submit(e) {
    e.preventDefault()
    post('/login')
    }

    return (
    <form onSubmit={submit}>
        <input type="text" value={data.email} onChange={e => setData('email', e.target.value)} />
        {errors.email && <div>{errors.email}</div>}
        <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} />
        {errors.password && <div>{errors.password}</div>}
        <input type="checkbox" checked={data.remember} onChange={e => setData('remember', e.target.checked)} /> Remember Me
        <button type="submit" disabled={processing}>Login</button>
    </form>
    )
    @endboostsnippet
@endif

## shadcn/ui Button Component

### Icon Styling
- Do NOT add margin classes (`mr-*`, `ml-*`, `mx-*`) to icons inside buttons. The button uses `gap-2` for spacing.
- Do NOT add size classes (`w-*`, `h-*`, `size-*`) to icons unless a custom size is explicitly needed. The button sets `[&_svg:not([class*='size-'])]:size-4` as the default.
- Icons inside buttons automatically inherit these styles from the button component:
  - `pointer-events-none`
  - `size-4` (default, ~16px)
  - `shrink-0`

### Examples
@verbatim
<code-snippet name="Correct Button with Icon" lang="tsx">
// Correct - no extra classes needed
<Button>
    <Mail />
    Send Email
</Button>

// Correct - custom size when explicitly needed
<Button>
    <Mail className="size-5" />
    Send Email
</Button>
</code-snippet>

<code-snippet name="Incorrect Button with Icon" lang="tsx">
// Incorrect - unnecessary margin
<Button>
    <Mail className="mr-2" />
    Send Email
</Button>

// Incorrect - unnecessary size (default is already size-4)
<Button>
    <Mail className="h-4 w-4" />
    Send Email
</Button>
</code-snippet>
@endverbatim

## React 19 & Compiler Notes

### React Compiler
- Remove manual `useMemo`, `useCallback`, `React.memo` - compiler handles this automatically.
- Use `"use no memo"` directive to opt-out problematic components.

### React 19
- `useRef()` requires argument: use `useRef(null)` or `useRef<T>(null)`.
- Ref callbacks must use explicit blocks: `ref={el => { inputRef = el }}`, not `ref={el => inputRef = el}`.

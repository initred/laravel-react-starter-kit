---
paths:
  - 'resources/js/**/*.tsx'
---

# Js

## Base UI Button must set type=submit in forms
Base UI Button defaults to type="button", so it does not submit HTML or Inertia <Form> elements. Any Button that should submit a form must set type="submit".

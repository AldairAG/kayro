type AuthFieldProps = {
  id: string
  label: string
  name: string
  type?: 'text' | 'email' | 'password'
  placeholder: string
  autoComplete?: string
  minLength?: number
  required?: boolean
}

function AuthField({
  id,
  label,
  name,
  type = 'text',
  placeholder,
  autoComplete,
  minLength,
  required = true,
}: AuthFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        minLength={minLength}
        required={required}
        className="h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-ink outline-none transition placeholder:text-muted/65 hover:border-brand-100 focus:border-brand-700 focus:ring-4 focus:ring-brand-100"
      />
    </div>
  )
}

export default AuthField

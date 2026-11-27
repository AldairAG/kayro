type AuthFieldProps = {
  id: string
  label: string
  name: string
  type?: 'text' | 'email' | 'password'
  placeholder: string
  autoComplete?: string
  minLength?: number
  required?: boolean
  defaultValue?: string
  readOnly?: boolean
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
  defaultValue,
  readOnly = false,
}: AuthFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-(--text-primary)">
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
        defaultValue={defaultValue}
        readOnly={readOnly}
        className="h-12 w-full rounded-xl border border-[color-mix(in_srgb,var(--border)_35%,var(--background))] bg-(--background) px-4 text-sm text-(--text-primary) outline-none transition placeholder:text-[color-mix(in_srgb,var(--text-primary)_35%,var(--background))] hover:border-[color-mix(in_srgb,var(--border)_65%,var(--background))] focus:border-(--primario) focus:ring-4 focus:ring-[color-mix(in_srgb,var(--primario)_10%,transparent)] read-only:bg-(--surface) read-only:cursor-not-allowed"
      />
    </div>
  )
}

export default AuthField

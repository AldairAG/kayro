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
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-[color-mix(in_srgb,var(--primario)_15%,black)]">
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
        className="h-12 w-full rounded-xl border border-[color-mix(in_srgb,var(--primario)_10%,white)] bg-white px-4 text-sm text-[color-mix(in_srgb,var(--primario)_15%,black)] outline-none transition placeholder:text-[color-mix(in_srgb,var(--primario)_30%,white)] hover:border-[color-mix(in_srgb,var(--primario)_12%,white)] focus:border-[color-mix(in_srgb,var(--primario)_65%,white)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--primario)_5%,white)]"
      />
    </div>
  )
}

export default AuthField

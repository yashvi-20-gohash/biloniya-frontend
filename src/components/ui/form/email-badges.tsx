import React, { useState } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  UseFormSetError,
  UseFormClearErrors,
} from 'react-hook-form'
import { toast } from 'sonner'

interface EmailBadgesProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  placeholder: string
  emails: string[]
  setEmails: React.Dispatch<React.SetStateAction<string[]>>
  setError: UseFormSetError<T>
  clearErrors: UseFormClearErrors<T>
}

export const EmailBadges = <T extends FieldValues>({
  name,
  placeholder,
  control,
  label,
  emails,
  setEmails,
  setError,
  clearErrors,
}: EmailBadgesProps<T>) => {
  const [emailInput, setEmailInput] = useState<string>('')
  const [customError, setCustomError] = useState<string>('')

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value && !emails.length) {
      setCustomError('Please Press "Enter" to add an email')
    } else {
      setCustomError('')
    }
    setEmailInput(event.target.value)
  }

  // Handle keydown events (Enter, space, comma)
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === ',') {
      event.preventDefault()
      addEmail(emailInput.trim())
    }
  }

  // Validate email format
  const isValidEmail = (email: string) => {
    const trimmedEmail = email.trim()
    if (trimmedEmail.length === 0) {
      return true
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(trimmedEmail)
  }

  // Add email to list
  const addEmail = (email: string) => {
    if (!isValidEmail(email)) {
      return toast.error('Please enter a valid email')
    }
    if (email && emails.includes(email)) {
      setError(name, {
        type: 'manual',
        message: 'This email is already exist',
      })
    }
    if (email && !emails.includes(email)) {
      setEmails([...emails, email])
      setEmailInput('')
      clearErrors(name)
    }
  }

  // Remove email from list
  const removeEmail = (emailToRemove: string) => {
    const updatedEmails = emails.filter((email) => email !== emailToRemove)
    setEmails(updatedEmails)

    // Trigger validation when no emails are left
    if (updatedEmails.length === 0) {
      setError(name, {
        type: 'manual',
        message: 'At least one email is required',
      })
    }
  }
  console.log('emailInput', emailInput)

  return (
    <div className="flex flex-col">
      <label className="mb-2">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {emails.map((email) => (
          <div
            key={email}
            className="flex items-center bg-secondary text-black rounded-lg px-2 py-1 text-sm"
          >
            <span>{email}</span>
            <button
              className="ml-2 text-black"
              onClick={() => removeEmail(email)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <div>
            <input
              {...field}
              type="text"
              value={emailInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={`border outline-none rounded-lg px-2 py-3 w-full ${error
                ? 'border-red-600 focus:border-red-600 focus:ring-red-500'
                : 'border-gray-300 focus:border-primary focus:ring-primary'
                }`}
              onBlur={() => {
                // addEmail(emailInput.trim())
                field.onChange(emails.join(', '))
              }}
            />
            {error && (
              <p className="mt-2 text-xs text-red-600 ">
                <span className="font-medium">
                  {customError || error.message}
                </span>
              </p>
            )}
          </div>
        )}
      />
    </div>
  )
}

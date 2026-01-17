'use client'

import { useState } from 'react'
import { updateLinkAction } from './actions'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface EditLinkModalProps {
  link: {
    id: number
    shortCode: string
    originalUrl: string
  }
  children: React.ReactNode
}

export function EditLinkModal({ link, children }: EditLinkModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({})

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setFieldErrors({})

    const form = e.currentTarget
    const formData = new FormData(form)
    const input = {
      linkId: link.id,
      originalUrl: formData.get('originalUrl') as string,
      shortCode: formData.get('shortCode') as string,
    }

    const result = await updateLinkAction(input)

    if ('error' in result) {
      setError(result.error)
      if (result.details) {
        setFieldErrors(result.details)
      }
      setLoading(false)
    } else {
      // Success - close modal
      setOpen(false)
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
          <DialogDescription>
            Update the URL or short code for this link.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="originalUrl">Original URL</Label>
            <Input
              id="originalUrl"
              name="originalUrl"
              type="url"
              defaultValue={link.originalUrl}
              placeholder="https://example.com"
              required
              disabled={loading}
            />
            {fieldErrors.originalUrl && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {fieldErrors.originalUrl[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="shortCode">Short Code</Label>
            <Input
              id="shortCode"
              name="shortCode"
              defaultValue={link.shortCode}
              placeholder="custom-code"
              required
              disabled={loading}
              pattern="[a-zA-Z0-9-_]+"
              minLength={3}
              maxLength={10}
            />
            {fieldErrors.shortCode && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {fieldErrors.shortCode[0]}
              </p>
            )}
          </div>
          {error && !fieldErrors.originalUrl && !fieldErrors.shortCode && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

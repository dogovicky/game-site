import { useState } from "react";
import { useForm, type DefaultValues, type FieldValues, type Path } from "react-hook-form";
import type { ZodType } from "zod";

export interface UseAuthFormOptions<T extends FieldValues> {
  defaultValues: T;
  schema: ZodType<T>;
  onSubmit: (values: T) => Promise<void>;
  onError?: (error: unknown) => string;
}

export function useAuthForm<T extends FieldValues>({
  defaultValues,
  schema,
  onSubmit,
  onError,
}: UseAuthFormOptions<T>) {
  const form = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
    mode: "onBlur",
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = form.handleSubmit(async (values) => {
    const parsed = schema.safeParse(values);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;

      Object.entries(fieldErrors).forEach(([field, messages]) => {
        if (field && messages && messages[0]) {
          form.setError(field as Path<T>, {
            type: "manual",
            message: messages[0],
          });
        }
      });

      setSubmitError(null);
      setIsSuccess(false);
      return;
    }

    setSubmitError(null);
    setIsSuccess(false);

    try {
      await onSubmit(parsed.data);
      setIsSuccess(true);
    } catch (error) {
      const message = onError ? onError(error) : "Something went wrong. Please try again.";
      setSubmitError(message);
      setIsSuccess(false);
    }
  });

  return {
    ...form,
    handleSubmit,
    submitError,
    isSuccess,
    setSubmitError,
  };
}

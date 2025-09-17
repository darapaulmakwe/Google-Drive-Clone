import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//returns json parsed value of a json stringified value
export const parseStringify = (value: unknown) =>
  JSON.parse(JSON.stringify(value))
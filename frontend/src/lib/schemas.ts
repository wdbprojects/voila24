import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email must be valid" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name must not be longer than 50 characters" }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must not be longer than 50 characters" }),
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .max(15, { message: "Username must not be longer than 15 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email must be valid" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password should be at least 8 characters long" })
    .max(25, { message: "Password must be no longer than 25 characters" }),
});

export const ProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name must not be longer than 50 characters" }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must not be longer than 50 characters" }),
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .max(15, { message: "Username must not be longer than 15 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email must be valid" }),
  role: z.string(),
});

export const PasswordSchema = z.object({
  oldPassword: z.string().min(1, { message: "Current password is required" }),
  password: z
    .string()
    .min(1, { message: "New password is required" })
    .min(8, { message: "Password should be at least 8 characters long" })
    .max(25, { message: "Password must be no longer than 25 characters" }),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email must be valid" }),
});
export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, { message: "New password is required" })
    .min(8, { message: "Password should be at least 8 characters long" })
    .max(25, { message: "Password must be no longer than 25 characters" }),
  confirmPassword: z.string(),
  // .min(1, { message: "Confirm new password is required" })
  // .min(8, { message: "Password should be at least 8 characters long" })
  // .max(25, { message: "Password must be no longer than 25 characters" }),
});
export const AddAddressSchema = z.object({
  country: z.string().min(1, { message: "Country is required" }),
  fullName: z
    .string()
    .min(1, { message: "Full name is required" })
    .max(25, { message: "You should not exceed 25 characters for this field" }),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^[0-9\s\-()]{7,12}$/, {
      message: "Make sure the number is correct",
    }),

  address1: z
    .string()
    .min(1, { message: "Address is required" })
    .min(8, { message: "At least 8 characters required" })
    .max(100, { message: "Maximun 100 characters allowed" }),
  address2: z.string().max(100, { message: "Maximum 100 characters allowed" }),
  city: z
    .string()
    .min(1, { message: "City is required" })
    .min(3, { message: "3 characters minimum" })
    .max(40, { message: "Maximum 40 characters allowed" }),
});

export const ProductSchema = z.object({
  name: z
    .string()
    .min(1, { message: "This is a required field" })
    .min(3, { message: "Name must have at least 3 characteres" })
    .max(50, { message: "Name can't exceed 50 characters" }),
  description: z
    .string()
    .min(1, { message: "This is a required field" })
    .min(5, { message: "Description must have at least 5 characters" })
    .max(1000, { message: "Description can't exceed 400 characters" }),
  category: z.string().min(1, { message: "This is a required field" }),
  seller: z.string().min(1, { message: "This is a required field" }),
  price: z
    .number()
    .min(1, { message: "Price is a required field" })
    .positive({ message: "Price can't be negative or zero" })
    .int({
      message:
        "Value must be an integer with 2 decimals - do not include a dot",
    }),

  stock: z
    .number()
    .min(1, { message: "This field is required" })
    .nonnegative({ message: "Negative numbers are not allowed" })
    .max(5000, { message: "Not more than 5000 items allowed" })
    .nullable()
    .transform((value) => value ?? NaN),
});

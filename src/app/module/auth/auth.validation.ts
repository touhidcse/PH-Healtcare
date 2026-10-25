import z from "zod";

const PatientRegistrationZodShcema = z.object({
	name: z
		.string("Not a string")
		.min(3, "At least 3 character long")
		.max(20, "Can not exceed 20 character"),
	email: z.email("Provide a valid email"),
	password: z
		.string()
		.min(8, "Password must contains 8 characters long")
		.max(32, "Password cannot exceed 32 characters")
		.regex(/[A-Z]/, "Password must contain one uppercase letter")
		.regex(/[a-z]/, "Password must contain one lowercase letter")
		.regex(/[0-9]/, "Password must contain one number")
		.regex(/[^A-Za-z0-9]/, "Password must contain one special character"),
	patient: z.object({ contactNumber: z.string().optional() }).optional(),
});
const PatientEmailVerifyZodSchema = z.object({
	email: z.email("Provide a valid email"),
	otp: z.string().length(6)

});

const LoginZodSchema = z.object({
	email: z.email(),
	password: z.string()
		.min(8, "Password must contains 8 characters long")
		.max(32, "Password cannot exceed 32 characters")
		.regex(/[A-Z]/, "Password must contain one uppercase letter")
		.regex(/[a-z]/, "Password must contain one lowercase letter")
		.regex(/[0-9]/, "Password must contain one number")
		.regex(/[^A-Za-z0-9]/, "Password must contain one special character"),
	
});
const ForgetPasswordZodSchema = z.object({
	email: z.email(),
	
});


const ResetPasswordZodSchema = z.object({
	email: z.email(),
	newPassword: z.string()
		.min(8, "Password must contains 8 characters long")
		.max(32, "Password cannot exceed 32 characters")
		.regex(/[A-Z]/, "Password must contain one uppercase letter")
		.regex(/[a-z]/, "Password must contain one lowercase letter")
		.regex(/[0-9]/, "Password must contain one number")
		.regex(/[^A-Za-z0-9]/, "Password must contain one special character"),
	otp: z.string().length(6)
	
});


export const UserValidation = {
	PatientRegistrationZodShcema,
	PatientEmailVerifyZodSchema,
	LoginZodSchema,
	ForgetPasswordZodSchema,
	ResetPasswordZodSchema
};

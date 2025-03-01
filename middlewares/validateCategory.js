import { categorySchema } from "../validation/categoryValidate.js";

export const validateCategory = (req, res, next) => {
    const validation = categorySchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        return res.status(400).json({
            eroors: validation.error.details.map((err) => err.message)
        });
    }
    next();
}
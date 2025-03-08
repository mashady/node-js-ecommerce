import { promocodeSchema }  from "../validation/promocodeValidate.js"
import { promocodeModel } from "../database/models/promocode.model.js";

export const validatePromocode = (req, res, next) => {
    const validation = promocodeSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        return res.status(400).json({
            errors: validation.error.details.map((err) => err.message)
        });
    }
    next();
}

export const validatePromocodeId = async (req, res, next) => {
    const reqPromocode = req.params.id;

    const foundedPromocodeById = await promocodeModel.findById(reqPromocode);

    if (!foundedPromocodeById) return res.status(404).json({ Message: "Promocode does not exist." });

    next();
}

export const validatePromocodeName = async (req, res, next) => {
    const { name } = req.body;

    const foundedPromocodeByName = await promocodeModel.findOne({
        name: { $regex: new RegExp(`^${name}$`, 'i') }
    });

    if (foundedPromocodeByName) return res.status(409).json({ Message: "Promocode already exists." });

    next();
}
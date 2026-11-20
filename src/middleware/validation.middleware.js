import { AppError } from "../common/error/error.js";

function validationMiddleware(dto) {
    return function (req, res, next) {
        const { success, data, error } = dto.safeParse(req.body);

        if (success === false) {
            let messageArr = error.issues.map(
                (error) => `${error.path[0]}: ${error.message}`,
            );

            throw new AppError(messageArr, 400);
        }

        req.body = data;
        next();
    };
}

export { validationMiddleware };

/**
 * Minimal request-body validator.
 * Usage: validateBody(["field1", "field2"])
 */
export function validateBody(requiredFields = []) {
  return (req, res, next) => {
    const missing = requiredFields.filter(
      (field) => req.body?.[field] === undefined || req.body[field] === null || req.body[field] === ""
    );

    if (missing.length > 0) {
      return res.status(400).json({
        error: "Validation failed",
        missingFields: missing,
      });
    }

    next();
  };
}

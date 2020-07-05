import { validate } from 'class-validator';
import { capitalizeFirstLetter } from '@utils/string.util';

/**
 * Validate typeorm entity
 * @param entity typeorm entity to be validated
 */
const validateEntity = async (entity: any) => {
  const errors = await validate(entity);
  if (errors.length > 0) {
    const err = {
      name: 'EntityValidationError',
      messages: [],
      stack: errors,
    };
    const messages = [];
    errors.forEach((item) => {
      Object.values(item.constraints).forEach((constraint) => {
        messages.push(capitalizeFirstLetter(constraint));
      });
    });
    err.messages = messages;
    throw err;
  }
};

export { validateEntity };

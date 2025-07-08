import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ name: 'isStrongPassword', async: false })
export class IsStrongPasswordConstraint
  implements ValidatorConstraintInterface
{
  validate(password: string) {
    if (!password || typeof password !== 'string') {
      return false;
    }

    // Check minimum length
    if (password.length < 8) {
      return false;
    }

    // Check for uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }

    // Check for lowercase letter
    if (!/[a-z]/.test(password)) {
      return false;
    }

    // Check for number
    if (!/[0-9]/.test(password)) {
      return false;
    }

    // Check for special character
    if (!/[^A-Za-z0-9]/.test(password)) {
      return false;
    }

    return true;
  }

  defaultMessage() {
    return 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
  }
}

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStrongPasswordConstraint,
    });
  };
}

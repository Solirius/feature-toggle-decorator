/**
 * Return a decorator that will only execute the wrapped function if it is given a truthy parameter, and optionally call a fallback method if the feature
 * is not enabled.
 */
export function isEnabled(featureEnabled: boolean, fallback?: string) {
  return function decorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    if (typeof original === "function") {
      descriptor.value = function(...args: any[]) {
        if (featureEnabled) {
          return original.apply(this, args);
        }
        else if (typeof this[fallback!] === "function") {
          return this[fallback!](...args);
        }
      };
    }
    return descriptor;
  };
}

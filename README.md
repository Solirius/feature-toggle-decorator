
Feature Toggle Decorator
=========================
[![Travis](https://img.shields.io/travis/solirius/feature-toggle-decorator.svg?style=flat-square)](https://travis-ci.org/solirius/feature-toggle-decorator) ![npm](https://img.shields.io/npm/v/feature-toggle-decorator.svg?style=flat-square) ![David](https://img.shields.io/david/solirius/feature-toggle-decorator.svg?style=flat-square)

A decorator that will only execute the wrapped function if it is given a truthy parameter, and optionally call a fallback method if the feature is not enabled. 

## Installation

```shell script
npm install --save feature-toggle-decorator
```

## Usage

```javascript 
import { isEnabled } from "feature-toggle-decorator";

const features = {
  FEATURE_1: true,
  FEATURE_2: false,
  FEATURE_3: false
};

class Example {
  @isEnabled(features.FEATURE_1)
  public test1() {
    // will be called
  }

  @isEnabled(features.FEATURE_2)
  public test2() {
    // will not be called
  }

  @isEnabled(features.FEATURE_3, "fallbackMethod")
  public test3(...args) {
    // will not be called
  }

  public fallbackMethod() {
    // will be called instead of test3
  }

}
```

Note that any arguments sent to a disabled method with a fallback will be passed on to the fallback.

## Limitations

- The decorator parameters are evaluated at compile time so it is not possible to dynamically toggle features
- Fallback methods must be specified by string name

## Contributing

Issues and PRs are very welcome. To get the project set up run:

```
git clone git@github.com:solirius/feature-toggle-decorator
npm install --dev
npm test
```

If you would like to send a pull request please write your contribution in TypeScript and if possible, add a test.

## License

This software is licensed under [GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html).


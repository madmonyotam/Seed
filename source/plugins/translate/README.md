

# core translate plugin

A plugin for translating text resources.

This plugin defines a `translate` function on the core object itself:

```js
core.translate('README.myKey');
```
## Usage

The plugin body is a simple getter-setter for the underlying language object, which is kept on the tree. a `load` function is added for convenience.

### Loading a language
```js
var language = {
    myKey: 'my value',
    myOtherKey: {
        defaultValue: 'my default value',
        value: 'my translated value'
    }
};

// following two lines are equal.
core.plugins.translate.load(language);
core.plugins.translate.set('language', language);
```
The plugin expects the provided language to be an object, where each property name is considered to be a translation key. the value of each property in the language can be either a string ( the translated text ) or an object. if an object is provided it is expected to have a `value` property ( the translated text ), and a `defaultValue`. `defaultValue` will be used if `value` is missing.
### Accessing translated values

The shortest way to access a theme value is through the `core.translate` function:

```js
core.translate('README.myKey');  // 'my value'

// add a default value
core.translate('README.myKey', 'my default value']);   // 'my value', but if 'myKey' is not found in the language object this will return 'my default value'.

// you can also dynamically render arguments
core.translate('README.your country', 'Your country is ${ country }', { country: 'Spain'}); // 'Your country is Spain'
```
# Blur
A library for filtering information from objects such as credit card information or other things which may be logged

## Usage


``` javascript
var obj = {
    creditcard: {
        number: 'ABCDEFGHIJKLMNOP',
        year: 17,
        month: 4
    }
};

var result = Blur(obj, { number: Blur.creditCard });
```


Will result in

``` javascript
{
    creditcard: {
        number: 'XXXXXXXXXXXXMNOP',
        year: 17,
        month: 4
    }
}
```


### `Blur(object, options)`

Recursively operate on keys in an object to censor, remove or modify values in
some way to make it safe for logging.

- `object` - Object to operated on
- `options` - object describing keys to be modified where:
    - `<keyName>` - name of key to be modified, and value is `type` of operation
    to be performed.

#### Operation types:

- `Blur.creditCard` - This option is used to set any string to show only the last four characters and blur out the rest with X's
- `Blur.remove` - Completely removes all matching keys
- `Blur.censor` - Replaces all values matching keys with the string `[BLURRED]`

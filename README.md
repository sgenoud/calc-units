# Calc Units

A simple parser for CSS like `calc` expressions. It provides a simple TLD
for combining different units together.

## Motivation

`calc()` expressions in CSS are very powerful to allow people to build UIs
without having to manually convert units.

CSS is not everywhere, `calc()` allows you to add a similar behaviour in other
libraries ([one to build powerpoint
presentations](https://github.com/sgenoud/bulletpoints) for instance).

## API

```ts
calcUnits(calExpr: string, unitConverter: (s: string) => number)
```

## Example

```js
import calcUnits from `calc-units`

const convertDistancesInMeters = d => {
  if (/^(\d|\.+)m$/.test(d)) {
    return parseFloat(d);
  }

  if (/^(\d|\.+)cm$/.test(d)) {
    return 0.01 * parseFloat(d);
  }

  if (/^(\d|\.+)mm$/.test(d)) {
    return 0.001 * parseFloat(d);
  }

  if (/^(\d|\.+)km$/.test(d)) {
    return 1000 * parseFloat(d);
  }

  if (/^(\d|\.+)in$/.test(d)) {
    return parseFloat(d) / 39.37;
  }

  if (/^(\d|\.+)ft$/.test(d)) {
    return parseFloat(d) / 3.281;
  }

  if (/^(\d|\.+)mi$/.test(d)) {
    return parseFloat(d) * 1609.34;
  }

  if (/^(\d|\.+)yd$/.test(d)) {
    return parseFloat(d) / 1.094;
  }
};

calcUnits("calc(3cm + 3m)", convertDistancesInMeters)
// 3.03
calcUnits("calc(20 * (3cm + 3in))", convertDistancesInMeters)
// 2.124003048006096

}
```

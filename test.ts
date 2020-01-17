import calc from "./index";

const floatIt = n => parseFloat(n);

describe("base functionality", () => {
  test("add numbers", () => {
    expect(calc("calc(1 + 3)", floatIt)).toBe(4);
  });

  test("subtract numbers", () => {
    expect(calc("calc(1 - 3)", floatIt)).toBe(-2);
  });

  test("multiply numbers", () => {
    expect(calc("calc(10 * 3)", floatIt)).toBe(30);
  });

  test("divide numbers", () => {
    expect(calc("calc(10 / 5)", floatIt)).toBe(2);
  });

  test("follows associativity", () => {
    expect(calc("calc(10 * 2 - 1)", floatIt)).toBe(19);
    expect(calc("calc(2 - 1 * 10)", floatIt)).toBe(-8);
    expect(calc("calc(2 + 10 / 2)", floatIt)).toBe(7);
  });
});

describe("parsing", () => {
  test("ignore whitespace", () => {
    expect(calc("calc(1+1*1/1-1+1)", floatIt)).toBe(2);
    expect(calc("calc(1 +   1       * 1      / 1  - 1   +  1 )", floatIt)).toBe(
      2
    );
  });

  test("ignore tabs", () => {
    expect(
      calc(`calc(\t\t1\t+\t1\t\t*\t1\t/\t1\t+\t1\t\t-\t1\t)`, floatIt)
    ).toBe(2);
  });
});

describe("parentheses", () => {
  test("associativity", () => {
    expect(calc("calc(10 * (2-1))", floatIt)).toBe(10);
    expect(calc("calc((2 - 1) * (5 + 5))", floatIt)).toBe(10);
  });

  test("follow nesting", () => {
    expect(calc("calc(10 * (2 - 2 * (1.5 - 1)))", floatIt)).toBe(10);
    expect(
      calc("calc(2 * (2 * (1 + 2 * (1 + 2 * (4 - 3) ))) - 10)", floatIt)
    ).toBe(18);
  });

  test("works with calc", () => {
    expect(calc("calc(10 * calc(2-1))", floatIt)).toBe(10);
    expect(calc("calc(calc(2 - 1) * 10)", floatIt)).toBe(10);
    expect(calc("calc(10 * calc(2 - 2 * calc(1.5 - 1)))", floatIt)).toBe(10);
  });
});

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

describe("value parsing", () => {
  const parseValue = n => {
    if (n === "k") return 1000;
    if (n === "M") return 1000000;
    if (n.indexOf("%")) return parseFloat(n) / 100;
    return parseFloat(n);
  };

  test("uses the parsing function", () => {
    expect(calc("calc(M + 2 * k)", parseValue)).toBe(1002000);
    expect(calc("calc(0.2 + 20%)", parseValue)).toBe(0.4);

    expect(calc("calc(20 * (3cm + 3in))", convertDistancesInMeters)).toBe(
      2.124003048006096
    );
    expect(calc("calc(3cm + 3m)", convertDistancesInMeters)).toBe(3.03);
  });
});

export declare const CALC_EXPR: RegExp;
export declare const isCalc: (calcExpr: string) => boolean;
export default function calcUnits(calcExpr: string, parseValue: (n: string) => number): number;

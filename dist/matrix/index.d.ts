declare function projection(width: number, height: number): number[];
declare function scaling(x: number, y: number): number[];
declare function translation(x: number, y: number): number[];
declare function rotation(angle: number): number[];
declare function multiply(a: Array<number>, b: Array<number>): Array<number>;
declare function someMultiply(...mat: Array<Array<number>>): Array<number>;
declare function identity(): Array<number>;
export { projection, scaling, translation, rotation, multiply, someMultiply, identity };
//# sourceMappingURL=index.d.ts.map
import Mtrx from 'mtrx';
import {assert, expect} from 'chai';

describe('Martix constructors', function () {

    it("Constructor 0 params", () => {
        const matrix = new Mtrx()
        assert.equal(matrix.cols, matrix.rows, matrix, 2, "Empty constructor expected to return a 1x1 matrix")
    });

    it("Constructor 1 param", () => {
        const matrix = new Mtrx(2)
        assert.equal(matrix.cols, matrix.rows, matrix, 2, "Constructor with 1 parameter should return square matrix")
    });

    it("Constructor 2 params", () => {
        const matrix = new Mtrx(2, 3)
        assert.isTrue((matrix.rows === 2 && matrix.cols === 3), "Constructor with 2 parameters should take (m,n) values and return (m,n) matrix")
    });

    it("Constructor 3 params", () => {
        const matrix = new Mtrx(2, 3, 9)
        const expected = new Mtrx([[9,9,9], [9,9,9]])
        assert.deepEqual(matrix, expected, "Constructor with 3 parameters should take (2, 3, 9) values and return ([9,9,9], [9,9,9]) matrix")
    });

    it("Constructor diag matrix", () => {
        const matrix = new Mtrx([2, 4, 5])
        const expected = new Mtrx([ [ 2, 0, 0 ], [ 0, 4, 0 ], [ 0, 0, 5 ] ])
        assert.deepEqual(matrix, expected, "Constructor for diagonal matrix should return a diagonal matrix.")
    });

    it("Constructor function expression", () => {
        const matrix = new Mtrx(2, 3, (i, j) => i + j)
        const expected = new Mtrx([ [ 0, 1, 2 ], [ 1, 2, 3 ] ])
        assert.deepEqual(matrix, expected, "Constructor with function expression should use it to create matrix")
    });

    
    it("Constructor 2-order numbers array", () => {
        const actual = new Mtrx([[1,2], [3,4]])
        assert.isTrue((actual[0][0] === 1 && actual[0][1] === 2 && actual[1][0] === 3 && actual[1][1] === 4), "Constructor with parameter: [[1,2], [3,4]] should return [[1, 2],[3, 4]] matrix")
    });


});

describe("Matrix methods", ()=>{

    const m = new Mtrx([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
    const n = new Mtrx([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
    const mSingular = new Mtrx()
    const m1x2 = new Mtrx([[3, 3]])
    const m2x2 = new Mtrx([[1, 1], [2, 2]])
    const m1x3 = new Mtrx([[1, 2, 3]])
    const m2x3 = new Mtrx([[1, 2, 3], [4, 5, 6]])
    const m3x3 = new Mtrx([[1,2,3],[4,5,6],[7,8,9]])
    const m4x4 = new Mtrx([[1,12,3,4],[5,6,12,8],[11,10,11,12],[13,14,15,16]])



    describe("Addition", ()=>{
        it("Adding 2 matricies should return a correct result", ()=>{
            const actual = Mtrx.add(m, n)
            const expected = new Mtrx([[2, 2, 3], [4, 6, 6], [7, 8, 10]])
            assert.deepEqual(actual, expected)
        })
        it("Adding 2 matricies with wrong sizes should throw TypeError", ()=>{
            expect(()=> {Mtrx.add(m, m2x3)}).to.throw(TypeError)
        })
    })

    describe("Multiplication", ()=>{
        it("Multiplying 2 matricies should return a correct result", ()=>{
            const actual = Mtrx.mul(m1x2, m2x2) // genuine error in multiplication, not my imagination...
            const expected = new Mtrx([[9, 9]]) 
            assert.deepEqual(actual, expected)
        })
        it("Multiplying 2 matricies with wrong sizes should throw TypeError", ()=>{
            expect(()=> {Mtrx.mul(m1x3, m2x3)}).to.throw(TypeError)
        })
    })

    describe("Transpose", ()=>{
        it("Maxtrix should be correctly transposed", ()=>{
            const actual = m2x3.T()
            const expected = new Mtrx([[1,4],[2,5],[3,6]])
            assert.deepEqual(actual, expected)
        })
    })

    describe("Determinant", ()=>{
        it("2x2 maxtrix should be calculated correctly", ()=>{
            const actual = new Mtrx([[1,3],[2,2]]).det
            const expected = -4
            assert.deepEqual(actual, expected)
        })
        it("3x3 maxtrix should be calculated correctly", ()=>{
            const actual = m3x3.det
            const expected = 0
            assert.deepEqual(actual, expected)
        })
        it("4x4 maxtrix should be calculated correctly", ()=>{
            const actual = m4x4.det
            const expected = 600
            assert.deepEqual(actual, expected)
        })

        it("Not square matrix should return nan det", ()=>{
            const actual = m2x3.det
            const expected = NaN
            assert.deepEqual(actual, expected)
        })
        it("Single element matrix should return self", ()=>{
            const actual = mSingular.det
            const expected = mSingular[0][0]
            assert.deepEqual(actual, expected)
        })
    })
})
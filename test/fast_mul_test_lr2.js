import Mtrx from 'mtrx';
import {fast_mul} from '../fast_mul/fast_mul.js';

import {assert, expect} from 'chai';


describe("Matrix methods", ()=>{

    const m2x2 = new Mtrx([[1, 1], [2, 2]])
    const m2x3 = new Mtrx([[1, 2, 3], [4, 5, 6]])
    const m3x3a = new Mtrx([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
    const m3x3b = new Mtrx([[11, 12, 13], [14, 15, 16], [17, 18, 19]])

    describe("Fast multiplication", ()=>{
        it("Multiplying not square matricies should return a correct result", ()=>{
            const actual = fast_mul(m2x2, m2x3)
            const expected = new Mtrx([[5, 7, 9], [10, 14, 18]]) 
            assert.deepEqual(actual, expected)
        })
        it("Multiplying square matricies should return a correct result", ()=>{
            const actual = fast_mul(m3x3a, m3x3b)
            const expected = new Mtrx([[90, 96, 102], [216, 231, 246], [342, 366, 390]]) 
            assert.deepEqual(actual, expected)
        })
        it("Multiplying wrong size matricies should throw a TypeError", ()=>{
            expect(()=> {Mtrx.mul(m2x2, m3x3b)}).to.throw(TypeError)
        })
    })


});
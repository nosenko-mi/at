import Mtrx from 'mtrx';
import {fast_mul} from '../fast_mul/fast_mul.js';

import {assert, expect} from 'chai';


describe("Matrix methods", ()=>{

    const m2x2 = new Mtrx([[1, 1], [2, 2]])
    const m2x3 = new Mtrx([[1, 2, 3], [4, 5, 6]])

    describe("Fast multiplication", ()=>{
        it("Multiplying 2 matricies should return a correct result", ()=>{
            const actual = fast_mul(m2x2, m2x3)
            const expected = new Mtrx([[5, 7, 9], [10, 14, 18]]) 
            assert.deepEqual(actual, expected)
        })
    })


});
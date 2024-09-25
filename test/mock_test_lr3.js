import gauss_lib from '../gauss_js/gauss_functions.cjs'
import matrix from '../gauss_js/matrix.cjs'

import { assert, expect } from 'chai';
import fs from "fs"
import sinon from 'sinon'


describe("Gauss", () => {

    describe("Input", () => {

        let stub;
        let sandbox;
        beforeEach(()=>{
            sandbox = sinon.createSandbox();
            stub = sandbox.stub(gauss_lib, "read_input")
        })

        afterEach(()=>{
            sandbox.restore();
        })

        it("Undefined input should not crush app", () => {
            stub.returns(undefined)
            
            expect((gauss_lib.gauss(stub()))).not.to.throw()
        })

        it("Null input should not crush app", () => {
            stub.returns(null)
            
            expect((gauss_lib.gauss(stub()))).not.to.throw()
        })

    })

    describe("gauss", () => {

        let stub;
        let sandbox;
        beforeEach(()=>{
            sandbox = sinon.createSandbox();
        })

        afterEach(()=>{
            sandbox.restore();
        })

        it("If matrix contains wrong row gauss() should return null ", () => {
            const m = new matrix(2)
            stub = sandbox.stub(m, "exists_wrong_row").returns(true)
            
            expect((gauss_lib.gauss(m))).to.equal(null)
        })

        it("If matrix contains zero row gauss() should return null ", () => {
            const m = new matrix(2)
            stub = sandbox.stub(m, "exists_zero_row").returns(true)
            
            expect((gauss_lib.gauss(m))).to.equal(null)
        })

        it("If matrix contains zero rows gauss_backwards() should return []", () => {
            const m = new matrix(2)
            stub = sandbox.stub(m, "get_rows").returns(0)
            
            assert((gauss_lib.gauss_backward(m)).length == 0)
        })

    })


    
});

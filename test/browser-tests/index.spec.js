/* eslint-env mocha, browser */
'use strict'

var expect = require('expect.js')

var AdditiveTweeningMock = require('../../src/index').AdditiveTweeningMock


describe('additween-mocks', function() {
    it('should export AdditiveTweeningMock class', function() {
        expect(AdditiveTweeningMock).to.be.a(Function)
    })
})

let {prepareResults} = require("./server");
let test = require("node:test");
let assert = require("assert");
let testResult = [{
    title: "Test title",
    snippet: "Test description",
    link:"https://test.com"
}];
let expectedResult = [{
    title: "Test title",
    description: "Test description",
    link: "https://test.com"
}];

let result = prepareResults(testResult);

test("prepareResults results PASS", function(){
    assert.deepEqual(expectedResult , result);
});




// var a=[12,12,13]
// console.log(a);
// console.log([...new Set(a)]);


function test() {
    this.arrow = function () {
        console.log(this)
    }
    this.arrow1 = function abc() {
        console.log(this)
    }
}
let run = new test();
run.arrow();
run.arrow1();
function add(a, b) {
    return a + b;
}
const mul = (a, b) => {
    return a * b;
}
console.log(mul(2, 3));
const obj = {
    name: "John",
    age: 30,
    message: function() {
            return `Hello, my name is ${this.name}`
        }
    };
console.log(obj.message());
console.log(obj.name);
const numbers = [1,3,4,88,-23,5454,-545]
const mappednum=numbers.map((n)=>n*3)
console.log(mappednum)
const posNum=numbers.filter((n)=>n>0)
console.log(posNum)
const oddnum = numbers.filter((n)=>n&1)
console.log(oddnum)
const total = numbers.reduce((sum, n) => (sum + n), 0)
console.log(total);

const products= [
    { name: "tv", price: 8000 },
    { name: "Phone", price: 5000 },  
    { name: "lap", price: 7500 },

]
const totalPrice = products.reduce((sum, n) => sum + n.price, 0);
console.log(totalPrice);
const filteredProducts = products.filter((p) => p.price >5000);
console.log(filteredProducts);

//Destructuring
const number = [1,2,3,4,5,6]
const [first, second,third,...spread] = number;
console.log(spread)
console.log(third);
const user = {name: "John",password: "12345678",}
const { name, password } = user
console.log(password)

// Spread
const arr1 = [1,2,3]
const arr2 = [7,8,9]
const arr3 = [...arr1, ...arr2]
const copy=[...arr1, 4,5,6]
console.log(copy);
console.log(arr3);

// Rest
function add2(...args) {
    return args.reduce((sum, n) => sum + n, 0);
}
console.log(add2(1, 2, 3, 4, 5))

//callbacks
function function1() {
    console.log("This is a callback function");
}
function fun(name, callback) {
    callback()
    return `Hello, ${name}`;
}
console.log(fun('function',function1))
console.log(fun('function', () => {console.log("from inside callback")}))

async function fetchUser() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data =await response.json();
        data.map((user) => {
            console.log(user.name);
        });
        //console.log(data);
    }
    catch (error) {
        console.error('Error fetching user:', error);
    }
}
fetchUser()
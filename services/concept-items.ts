export const conceptItems = {
    'primitive-data-types-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Create a variable named foo that has the boolean value true.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    [solution1]
                        <code-sample>
                            <template>
                                const foo = true;
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + \`
                            answer = foo === true;
                        \`);
                    }
                    else {
                        answer = false;
                    }
                `,
                userCompleted: false
            },
            2: {
                assessML: `
                    <p>Create a variable named foo that has the boolean value false.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    [solution1]
                        <code-sample>
                            <template>
                                const foo = false;
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + \`
                            answer = foo === false;
                        \`);
                    }
                    else {
                        answer = false;
                    }
                `,
                userCompleted: false
            },
            3: {
                assessML: `
                    <p>What is the value of foo?</p>
                    <p>
                        <code-sample>
                            <template>
                                const foo = !!0;
                            </template>
                        </code-sample>
                    </p>
                    <p><br></p>
                    <p>
                        [radio1]true[radio1]<br><br>[radio2]false[radio2]
                    </p>
                    [solution1]
                        <p>false</p>
                    [solution1]
                `,
                javaScript: `
                    answer = radio1 === false && radio2 === true;
                `,
                userCompleted: false
            },
            4: {
                assessML: `
                    <p>What is the value of foo?</p>
                    <p>
                        <code-sample>
                            <template>
                                const foo = !!1;
                            </template>
                        </code-sample>
                    </p>
                    <p><br></p>
                    <p>
                        [radio1]true[radio1]<br><br>[radio2]false[radio2]
                    </p>
                    [solution1]
                        <p>true</p>
                    [solution1]
                `,
                javaScript: `
                    answer = radio1 === true && radio2 === false;
                `,
                userCompleted: false
            },
            5: {
                assessML: `
                    <p>What are the six primitive data types in JavaScript?</p>
                    <p><br></p>
                    <p>[input1]</p>
                    <p>[input2]</p>
                    <p>[input3]</p>
                    <p>[input4]</p>
                    <p>[input5]</p>
                    <p>[input6]</p>
                    [solution1]
                        <p>The primitive data types in JavaScript are: boolean, null, undefined, number, string, and symbol.</p>
                        <p>More information can be found <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types" target="_blank">here</a>.</p>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    const solutionString = input1.toLowerCase() + input2.toLowerCase() + input3.toLowerCase() + input4.toLowerCase() + input5.toLowerCase() + input6.toLowerCase();
                    answer =
                        solutionString.includes('boolean') &&
                        solutionString.includes('null') &&
                        solutionString.includes('undefined') &&
                        solutionString.includes('number') &&
                        solutionString.includes('string') &&
                        solutionString.includes('symbol');
                `,
                userCompleted: false
            }
        }
    },
    'objects-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Create an empty object and store it in the variable foo.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    [solution1]
                        <code-sample>
                            <template>
                                const foo = {};
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + \`
                            answer = JSON.stringify(foo) === '{}';
                        \`);
                    }
                    else {
                        answer = false;
                    }
                `,
                userCompleted: false
            },
            2: {
                assessML: `
                    <p>Create an object named foo with one property.</p>
                    <p>The property's key should be hello and its value the string 'there'.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    [solution1]
                        <code-sample>
                            <template>
                                const foo = {
                                    hello: 'there'
                                };
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + \`
                            answer = foo.hello === 'there';
                        \`);
                    }
                    else {
                        answer = false;
                    }
                `,
                userCompleted: false
            },
            3: {
                assessML: `
                    <p>Create an object named monkey with three properties.</p>
                    <p>One property should have a key called type with its value the string chimp.</p>
                    <p>One property should have a key called numBananas with its value the number 50.</p>
                    <p>One property should have a key called ageInYears with its value the number 4.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <p>The simplest way to create a <a href="https://www.quora.com/What-is-a-plainObject-in-JavaScript" target="_blank">plain data object</a> in JavaScript is to use the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Object_literals" target="_blank">object literal</a> syntax.</p>
                        <p>Plain data objects only have properties with primitive key value pairs, meaning the keys and values are primitive data types.</p>
                        <p>The following is the best practice solution to this problem:</p>
                        <p>
                            <code-sample>
                                <template>
                                    const monkey = {
                                        type: 'chimp',
                                        numBananas: 50,
                                        ageInYears: 4
                                    };
                                </template>
                            </code-sample>
                        </p>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + 'answer = monkey.type === \\'chimp\\' && monkey.numBananas === 50 && monkey.ageInYears === 4');
                    }
                    else {
                        answer = false;
                    }
                `,
                userCompleted: false
            },
            4: {
                assessML: `
                    <p>Create an object named foo with one property.</p>
                    <p>The property's key should be child and its value an empty object.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    [solution1]
                        <code-sample>
                            <template>
                                const foo = {
                                    child: {}
                                };
                            </template>
                        </code-sample>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + \`
                            answer = JSON.stringify(foo.child) === '{}';
                        \`);
                    }
                    else {
                        answer = false;
                    }
                `,
                userCompleted: false
            },
            5: {
                assessML: `
                    <p>Create an object named foo with one property.</p>
                    <p>The property's key should be child and its value an object with one property.</p>
                    <p>That property's key should be grandchild and its value an empty object.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    [solution1]
                        <code-sample>
                            <template>
                                const foo = {
                                    child: {}
                                };
                            </template>
                        </code-sample>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + \`
                            answer = JSON.stringify(foo.child.grandchild) === '{}';
                        \`);
                    }
                    else {
                        answer = false;
                    }
                `,
                userCompleted: false
            }
        }
    },
    'arrays-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Create an array named numbers with five elements, each element being of type number.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <code-sample>
                            <template>
                                const numbers = [1, 2, 3, 4, 5];
                                // or
                                const numbers = new Array(1, 2, 3, 4, 5);
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + 'answer = numbers.length === 5 && typeof numbers[0] === \\\'number\\\' && typeof numbers[1] === \\\'number\\\' && typeof numbers[2] === \\\'number\\\' && typeof numbers[3] === \\\'number\\\' && typeof numbers[4] === \\\'number\\\'');
                    }
                    else {
                        answer = false;
                    }
                `,
                userCompleted: false
            }
        }
    },
    'async/await-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Create an asynchronous function called wait.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <code-sample>
                            <template>
                                async function wait() {}
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + \`
                            answer = typeof wait().then === 'function';
                        \`);
                    }
                    else {
                        answer = false;
                    }
                `,
                userCompleted: false
            }
        }
    },
    'callbacks-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Create a function named executeCallback that takes a callback function as a parameter and returns the result of that callback.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <code-sample>
                            <template>
                                function executeCallback(callback) {
                                    return callback();
                                }
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + 'answer = executeCallback(() => true) === true;');
                    }
                    else {
                        answer = false;
                    }
                `,
                userCompleted: false
            }
        }
    },
    'classes-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Create a class named Hans with two methods that each return true.</p>
                    <p>Name the methods pump and youUp.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <code-sample>
                            <template>
                                class Hans {
                                    pump() {
                                        return true;
                                    }

                                    youUp() {
                                        return true;
                                    }
                                }
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + 'const hans = new Hans(); answer = hans.pump() === true && hans.youUp() === true');
                    }
                    else {
                        answer = false;
                    }
                `,
                userCompleted: false
            }
        }
    },
    'closures-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Create a variable named closed and set it to true.</p>
                    <p>Create a function named closer that returns closed through a closure.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <code-sample>
                            <template>
                                const closed = true;

                                function closer() {
                                    return closed;
                                }
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + 'answer = closer() === true');
                    }
                    else {
                        answer = false;
                    }
                `,
                userCompleted: false
            }
        }
    },
    'control-flow-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Create a function named control that takes one parameter.</p>
                    <p>If that parameter is a number greater than or equal to 50, return the string 'You win!'.</p>
                    <p>If that parameter is a number less than 50, return the string 'You lose!'.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <code-sample>
                            <template>
                                function control(param) {
                                    if (param >= 50) {
                                        return 'You win!';
                                    }
                                    else {
                                        return 'You lose!';
                                    }
                                }
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + 'answer = control(50) === \\'You win!\\' && control(49) === \\'You lose!\\' && control(100) === \\'You win!\\' && control(3) === \\'You lose!\\'');
                    }
                    else {
                        answer = false;
                    }
                `,
                userCompleted: false
            }
        }
    },
    'functions-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Create an empty function named nothing.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    [solution1]
                        <code-sample>
                            <template>
                                function nothing() {}
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + \`
                            answer = nothing() === undefined;
                        \`);
                    }
                    else {
                        answer = false;
                    }
                `,
                userCompleted: false
            },
            2: {
                assessML: `
                    <p>Create a function named basicNumber that returns the number 10.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <p>There are many ways to create a function in JavaScript.</p>
                        <p>These are some of the most common ways:</p>
                        <p><br></p>
                        <code-sample>
                            <template>
                                function basicNumber() {
                                    return 10;
                                }

                                // or

                                const basicNumber = function() {
                                    return 10;
                                };

                                // or

                                const basicNumber = () => {
                                    return 10;
                                };
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + 'answer = basicNumber() === 10');
                    }
                    else {
                        answer = false;
                    }
                `,
                userCompleted: false
            },
            3: {
                assessML: `
                    <p>Create a function named hello that returns the string 'mundo!'.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    [solution1]
                        <code-sample>
                            <template>
                                function hello() {
                                    return 'mundo!';
                                }

                                // or

                                const hello = function() {
                                    return 'mundo!';
                                }

                                // or

                                const hello = () => {
                                    return 'mundo!';
                                };
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + \`
                            answer = hello() === 'mundo!';
                        \`);
                    }
                    else {
                        answer = false;
                    }
                `,
                userCompleted: false
            },
            4: {
                assessML: `
                    <p>Create a function named higherOrder that returns an empty function</p>
                    <p><br></p>
                    <p>[code1]</p>
                    [solution1]
                        <code-sample>
                            <template>
                                function higherOrder() {
                                    return function() {};
                                }

                                // or

                                function higherOrder() {
                                    return () => {};
                                }

                                // or

                                const higherOrder = () => {
                                    return function() {};
                                };

                                // or

                                const higherOrder = () => {
                                    return () => {};
                                };
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + \`
                            answer = higherOrder()() === undefined;
                        \`);
                    }
                    else {
                        answer = false;
                    }
                `,
                userCompleted: false
            },
            5: {
                assessML: `
                    <p>There is a function available to your editor called countCats.</p>
                    <p>Invoke the function countCats and store it in a variable called numCats.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    [solution1]
                        <code-sample>
                            <template>
                                const numCats = countCats();
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        function countCats() {
                            return 14535;
                        }

                        eval(code1 + \`
                            answer = numCats === countCats();
                        \`);
                    }
                    else {
                        answer = false;
                    }
                `,
                userCompleted: false
            }
        }
    },
    'generators-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Write a generator function called infiniteSum.</p>
                    <p>When the generator's next method is called, the result should have value 0, then 1, then 2 and repeat the pattern to infinity.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <code-sample>
                            <template>
                                function* infiniteSum() {
                                    for (let i=0; i < Infinity; i++) {
                                        yield i;
                                    }
                                }
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + \`
                            const theGenerator = infiniteSum();
                            answer = theGenerator.next().value === 0 && theGenerator.next().value === 1 && theGenerator.next().value === 2 && theGenerator.next().value === 3;
                        \`);
                    }
                    else {
                        answer = false;
                    }
                `,
                userCompleted: false
            }
        }
    },
    'modules-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>What is the correct value for the type attribute when importing a module through the script tag?</p>
                    <p><br></p>
                    <p>&lt;script type="[input1]" src="my-module.js" &gt;&lt;/script&gt;</p>
                    <p><br></p>
                    [solution1]
                        <p>&lt;script type="module" src="my-module.js" &gt;&lt;/script&gt;</p>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    answer = input1 === 'module';
                `,
                userCompleted: false
            }
        }
    },
    'operators-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Create a function named sum that takes two parameters.</p>
                    <p>Use the binary + operator to return the sum of these two parameters.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <p>+ is a binary operator, which means that it operates on two operands.</p>
                        <code-sample>
                            <template>
                                function sum(operand1, operand2) {
                                    return operand1 + operand2;
                                }
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + \`
                            answer = sum(100, 45) === 145;
                        \`);
                    }
                    else {
                        answer = false;
                    }
                `,
                userCompleted: false
            }
        }
    },
    'promises-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Create a function named timeout that returns a promise that resolves just after 1000 milliseconds.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <code-sample>
                            <template>
                                function timeout() {
                                    return new Promise((resolve) => {
                                        setTimeout(() => {
                                            resolve();
                                        }, 1000);
                                    });
                                }
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    autoPostMessage = false;

                    if (code1) {
                        eval(code1);

                        let before999 = true;

                        setTimeout(() => {
                            before999 = false;
                        }, 999);

                        timeout().then(() => {
                            if (before999 === true) {
                                postMessage({
                                    answer: false
                                });
                            }
                            else {
                                postMessage({
                                    answer: true
                                });
                            }
                        });

                        setTimeout(() => {
                            postMessage({
                                answer: false
                            });
                        }, 1001);
                    }
                    else {
                        postMessage({
                            answer: false
                        });
                    }
                `,
                userCompleted: false
            }
        }
    },
    'proxies-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Create an object named bank with one property named balance with a value of 100.</p>
                    <p>Create a proxy to that object, call it betterBank.</p>
                    <p>Whenever the balance property of betterBank is accessed, add 100 to it.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <code-sample>
                            <template>
                                const bank = {
                                    balance: 100
                                };

                                const betterBank = new Proxy(bank, {
                                    get: (target, prop, receiver) => {
                                        if (prop === 'balance') {
                                            return target[prop] + 100;
                                        }
                                        else {
                                            return target[prop];
                                        }
                                    }
                                });
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + \`
                            answer = betterBank.balance === 200;
                        \`);
                    }
                    else {
                        answer = false;
                    }
                `,
                userCompleted: false
            }
        }
    },
    'scope-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>The ability for a JavaScript function to be used before being declared is called [input1].</p>
                    <p><br></p>
                    [solution1]
                        <p><a href="https://developer.mozilla.org/en-US/docs/Glossary/Hoisting">Hoisting</a></p>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    answer = input1.toLowerCase() === 'hoisting';
                `,
                userCompleted: false
            }
        }
    },
    'variables-concept-item': {
        questions: {
            1: {
                assessML: `
                    <p>Use a constant declaration to declare and define an immutable variable named frozen.</p>
                    <p><br></p>
                    <p>[code1]</p>
                    <p><br></p>
                    [solution1]
                        <p>The value of the variable can be whatever you want, but you must use the const declaration.</p>
                        <code-sample>
                            <template>
                                const frozen = 'I am immutable';
                            </template>
                        </code-sample>
                        <p><br></p>
                    [solution1]
                `,
                javaScript: `
                    if (code1) {
                        eval(code1 + \`
                            try {
                                frozen = true;
                                answer = false;
                            }
                            catch(error) {
                                answer = true;
                            }
                        \`);
                    }
                    else {
                        answer = false;
                    }
                `,
                userCompleted: false
            }
        }
    }
};

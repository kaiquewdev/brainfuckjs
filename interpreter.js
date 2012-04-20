#!/usr/bin/env node

var Brainfuck = (function () {
    var _ = function () {};

    // Pointer
    var _pointer = 0;
    // Memory representation
    var _memory = (function () {
        "use strict";
        var output = [];
        var c = 0;
        var limit = 300*100;
        
        while ( c < limit ) {
            output.push(0);
            c += 1;
        }

        return output;
    } ());
    // Alocation
    var __memory = (function ( buffer ) {
        "use strict";
        var output = false;
        buffer = buffer || '';

        if ( buffer && buffer ) {
            output = buffer;
        }

        return output;
    } ( _memory ));
    // Debug flag
    var _debug = false;
    // Commands representation
    var commands = [
        '>', 
        '<', 
        '+', 
        '-', 
        '.', 
        ',',
        '#',
    ];
    // CommandsExecution
    var commandsExecution = {};
    
    // Increment the pointer
    commandsExecution.incrementPointer = function () {
        "use strict";
        _pointer += 1;

        return true;
    };
    // Decrement the pointer
    commandsExecution.decremenetPointer = function () {
        "use strict";
        if ( _pointer >= 0 ) {
            _pointer -= 1;
        }

        return true;
    };
    // Increment the byte in pointer
    commandsExecution.byteIncrement = function ( ) {
        "use strict";
        var output = false;
        var pointerValue = __memory[ _pointer ];

        if ( typeof pointerValue === 'number' || pointerValue ) {
            // Casting to number
            output =  pointerValue;
            output += 1;
            __memory[ _pointer ] = output;
            output = true;
        }

        return output;
    };
    // Decrement the byte in pointer
    commandsExecution.byteDecrement = function () {
        "use strict";
        var output = false;
        var pointerValue = __memory[ _pointer ];

        if ( pointerValue ) {
            // Casting to number
            output = pointerValue;
            output -= 1;
            __memory[ _pointer ] = output;
            output = true;
        }

        return output;
    };
    // Return the byte at the pointer
    commandsExecution.byteOutput = function () {
        "use strict";
        var output = false;
        var pointerValue = __memory[ _pointer ];

        if ( typeof pointerValue === 'number' || typeof pointerValue === 'string'  || pointerValue ) {
            output = String.fromCharCode( pointerValue );
        }

        return output;
    };
    // Input a byte and store it in the byte at the pointer.
    commandsExecution.byteInput = function ( input ) {
        "use strict";
        var output = false;
        var pointerValue = __memory[ _pointer ];
        input = input || '';

        if ( input ) {
            output = pointerValue.toString();
            output += input.toString();
            output += _pointer;
            __memory[ _pointer ] = output;
            output = true;
        }

        return output;
    };

    var _commands = {};
    // > assign to function
    _commands[ commands[0] ] = commandsExecution.incrementPointer;
    // < assign to function
    _commands[ commands[1] ] = commandsExecution.decremenetPointer;
    // + assign to function
    _commands[ commands[2] ] = commandsExecution.byteIncrement;
    // - assign to function
    _commands[ commands[3] ] = commandsExecution.byteDecrement;
    // . assign to function
    _commands[ commands[4] ] = commandsExecution.byteOutput;
    // , assign to function
    _commands[ commands[5] ] = commandsExecution.byteInput;

    _.prototype.commands = _commands;
    _.prototype.memory = __memory;

    // Internal list verify if target exist
    var _internal = {};
    // Verify if exist a item in the array
    _internal.hasInDeepList = function ( target, arrayList ) {
        "use strict";
        var output = false;
        target = target || '';
        arrayList = arrayList || '';

        if ( typeof target === 'number' || target && arrayList ) {
            var l = arrayList;
            for ( var i in l ) {
                if ( target === l[i] ) {
                    output = true;
                }
            }
        }

        return output;
    };
    // Internal for verify buffer
    _internal.filter = function ( arrayList ) {
        var output = false;
        arrayList = arrayList || '';

        if ( arrayList ) {
            for ( var i in arrayList ) {
                __memory[i] = __memory[i].toString();
            }
            
            output = true;
        }

        return output;
    };
    // Internal for verify char

    _.prototype.run = function ( input ) {
        "use strict";
        var output = '';
        var counterDeep = 0;
        var lastDeep = 0;
        var registers = [];
        
        if ( input.length > 0 ) {
            // Read input
            for ( var i = 0; i < input.length; i += 1 ) {
                // Commando in list
                if ( _internal.hasInDeepList( input[i], commands ) ) {
                    // for storage output
                    if ( input[i] === commands[4] ) {
                        output += _commands[ input[i] ]();
                    // Execute other commands
                    } else {
                        _commands[ input[i] ]();
                    }
                // Iteraction start
                } if ( input[i] === '[' ) {
                    counterDeep += 1;
                // Iteraction end
                } if ( input[i] === ']' ) {
                    counterDeep -= 1;
                    // If end last iteraction
                    if ( counterDeep === 0 ) {
                        _internal.filter( registers );
                    }
                // Other loop
                } if ( counterDeep > 0 && counterDeep > lastDeep ) {
                    lastDeep = counterDeep;
                // Register of pointers for convert
                } if ( counterDeep > 0 && input[i] === commands[0] || input[i] === commands[1] ) {
                    if ( !_internal.hasInDeepList( _pointer, registers ) ) {
                        registers.push( _pointer );
                    }
                }
            }
        }

        return output;
    };

    return new _();
} ());

console.log( Brainfuck.run('++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.') );

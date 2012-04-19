#!/usr/bin/env node

var Brainfuck = (function () {
    var _ = function () {};

    // Pointer
    var _pointer = 0;
    // Memory representation
    var _memory = (function () { 
        var output = [];
        var c = 0;
        var limit = 300*100;
        
        while ( c < limit ) {
            output.push('0');
            c += 1;
        }

        return output;
    } ());

    var __memory = (function ( buffer ) {
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
        _pointer += 1;

        return true;
    };
    // Decrement the pointer
    commandsExecution.decremenetPointer = function () {
        if ( _pointer >= 0 ) {
            _pointer -= 1;
        }

        return true;
    };
    // Increment the byte in pointer
    commandsExecution.byteIncrement = function ( inLoop ) {
        var output = false;
        var pointerValue = __memory[ _pointer ];

        if ( typeof pointerValue === 'number' || pointerValue ) {
            // Casting to number
            output =  pointerValue;
            output += '1';
            __memory[ _pointer ] = output;
            output = true;
        }

        return output;
    };
    // Decrement the byte in pointer
    commandsExecution.byteDecrement = function () {
        var output = false;
        var pointerValue = __memory[ _pointer ];

        if ( pointerValue ) {
            // Casting to number
            output = pointerValue.toString();
            output -= '1';
            __memory[ _pointer ] = output;
            output = true;
        }

        return output;
    };
    // Return the byte at the pointer
    commandsExecution.byteOutput = function () {
        var output = false;
        var pointerValue = __memory[ _pointer ];

        if ( typeof pointerValue === 'number' || typeof pointerValue === 'string'  || pointerValue ) {
            output = String.fromCharCode( pointerValue );
        }

        return output;
    };
    // Input a byte and store it in the byte at the pointer.
    commandsExecution.byteInput = function ( input ) {
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

    // Verify if exist a item in the array
    var hasInDeepList = function ( target, arrayList ) {
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

    _.prototype.run = function ( input ) {
        var output = '';
        var counterDeep = 0;
        var lastDeep = 0;
        
        if ( input.length > 0 ) {
            for ( var i = 0; i < input.length; i += 1 ) {
                if ( hasInDeepList( input[i], commands ) ) {
                    if ( input[i] === commands[4] ) {
                        output += _commands[ input[i] ]();
                    } else {
                        _commands[ input[i] ]();
                    }
                } if ( input[i] === '[' ) {
                    counterDeep += 1;
                } if ( input[i] === ']' ) {
                    counterDeep -= 1;
                } if ( counterDeep > 0 && counterDeep > lastDeep ) {
                    lastDeep = counterDeep;

                    if ( input[i] === '>' || input[i] === '<' ) {
                        _commands[ input[i] ]();    
                    }
                }
            }    
        }

        return output;
    };

    return new _();
} ());

console.log( Brainfuck.run('++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.') );

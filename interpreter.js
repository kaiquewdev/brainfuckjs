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
            output.push(0);
            c += 1;
        }

        return output;
    } ());

    _.prototype.memory = (function ( buffer ) {
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
        '[',
        ']',
        '#',
    ];
    // CommandsExecution
    var commandsExecution = {};
    
    // Increment the pointer
    commandsExecution.incrementPointer = function () {
        ++_pointer;

        return true;
    };
    // Decrement the pointer
    commandsExecution.decremenetPointer = function () {
        --_pointer;

        return true;
    };
    // Increment the byte in pointer
    commandsExecution.byteIncrement = function ( pointerValue ) {
        var output = false;
        pointerValue = pointerValue || '';

        if ( pointerValue ) {
            // Casting to number
            output =  pointerValue.toString();
            output += _pointer;
        }

        return output;
    };
    // Decrement the byte in pointer
    commandsExecution.byteDecrement = function ( pointerValue ) {
        var output = false;
        pointerValue = pointerValue || '';

        if ( pointerValue ) {
            // Casting to number
            output = pointerValue.toString();
            output -= _pointer;
        }

        return output;
    };
    // Return the byte at the pointer
    commandsExecution.byteOutput = function ( pointerValue ) {
        var output = false;
        pointerValue = pointerValue || '';

        if ( pointerValue ) {
            output = String.fromCharCode( pointerValue );    
        }

        return output;
    };
    // Input a byte and store it in the byte at the pointer.
    commandsExecution.byteInput = function ( pointerValue, input ) {
        var output = false;
        pointerValue = pointerValue || '';

        if ( pointerValue ) {
            output = pointerValue.toString();
            output += input.toString();
            output += _pointer;
        }

        return output;
    };

    var _commands = {};
    // > assign to function
    _commands[ commands[0] ] = commandsExecution.incrementPointer();
    // < assign to function
    _commands[ commands[1] ] = commandsExecution.decremenetPointer();
    // + assign to function
    _commands[ commands[2] ] = commandsExecution.byteIncrement;
    // - assign to function
    _commands[ commands[3] ] = commandsExecution.byteDecrement;
    // . assign to function
    _commands[ commands[4] ] = commandsExecution.byteOutput;
    // , assign to function
    _commands[ commands[5] ] = commandsExecution.byteInput;

    _.prototype.run = function ( input ) {
        var output = '';
        var self = this;
        
        console.log('Input:')
        if ( input.length > 0 ) {
            console.log('For:')
            for ( var i = 0; i < input.length; i += 1 ) {
                var isFunction = typeof _commands[ input[i] ] === 'function';
                
                if ( input[i] in commands ) {
                    switch( input[i] ) {
                        case commands[0]: _commands[ input[ i ] ]; break;   
                        case commands[1]: _commands[ input[ i ] ]; break;
                        case commands[2]: _commands[ input[ i ] ]( self.memory[ _pointer ] ); break;
                        case commands[3]: _commands[ input[ i ] ]( self.memory[ _pointer ] ); break;
                        case commands[4]: 
                            output += _commands[ input[ i ] ]( self.memory[ _pointer ] );
                        case commands[5]: _commands[ input[ i ] ]( self.memory[ _pointer ], '' ); break;
                    }
                }
            }    
        }

        return output;
    };

    return new _();
} ());

console.log( Brainfuck.run('++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.') );

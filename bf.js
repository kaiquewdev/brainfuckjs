#!/usr/bin/env node
// Brainfuck
var Brainfuck = (function () {
    // Main engine
    var _ = function () {};
    // External access methods and objects
    var external = {};
    // Internal itens
    var _internal = {
        // Pointer of memory
        pointer: 0,
        // Representation of memory
        memory: (function ( limit ) {
            var output = '';
            var c = 0;
            limit = limit || '';

            if ( limit ) {
                while ( c < limit ) {
                    output += 0;
                    c += 1;
                }
            }

            return output.split('');
        } ( 30000 )),
    };
    // List of commands
    _internal.commands = {
        'self': _internal,
        '>'     :   function () {
            // Pointer increment
            this.self.pointer += 1;

            return this.self;
        },
        '<'     :   function () {
            // Pointer decrement
            this.self.pointer -= 1;

            return this.self;
        },
        '+'     :   function () {
            // Increment memory reference
            this.self.memory[ this.self.pointer ] = Number( this.self.memory[ this.self.pointer ] ) + 1;

            return this.self;
        },
        '-'     :   function () {
           // Decrement memory reference
           this.self.memory[ this.self.pointer ] = Number( this.self.memory[ this.self.pointer ] ) - 1;

           return this.self;
        },
        '.'     :   function () {
           // putchar
           return String.fromCharCode( this.self.memory[ this.self.pointer ] );
        },
        ','     :   function ( byteInput ) {
            this.self.memory[ this.self.pointer ] = byteInput;
        },
        '['     :   function ( fn ) {
           fn = fn || function () {};

           if ( fn ) {
               fn();
           }

           return this.self;
        },
        ']'     :   function ( fn ) {
            fn = fn || function () {};

            if ( fn ) {
                fn();
            }

            return this.self;
        },
    };

    // Output access start
        // Copy of memory
        external.memory = _internal.memory;
        // Interpreted output
        external.output = ''; 
    // Output access end

    _.prototype.read = function ( program ) {
        var output = '';
        var deep = -1;
        program = program || '';

        // Transform tho recursive
        var loop = function () {
            while ( _internal.memory[ _internal.pointer ] ) {
                _internal.commands[ program[i] ]();
            }
        };

        if ( program ) {
            // Read the progam and execute arbitrary commands
            for ( var i in program ) {
                if ( program[i] === '[' || program[i] === ']' ) {
                    if ( program[i] === '[' ) {
                        deep += 1
                    } if ( program[i] === ']' ) {
                        deep -= 1;
                    }
                } if ( program[i] === '.' ) {
                    output += _internal.commands[ program[i] ]();
                } if ( deep > -1 ) {
                    while ( _internal.memory[ _internal.pointer ] ) {
                        _internal.commands[ program[i] ]();
                    }
                } else {
                    _internal.commands[ program[i] ]();
                }    
            }

            external.output = output;
        }

        return external;
    };
    
    // Itern out the box for test
    _.prototype.internal = _internal;

    return new _();
} ());

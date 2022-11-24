import { drop } from "lodash";
import Blockly from "scratch-blocks"
Blockly.JavaScriptGenerator = new Blockly.Generator("JSON");

// PRECEDENCE
Blockly.JavaScriptGenerator.ORDER_ATOMIC = 0;           // 0 "" ...
Blockly.JavaScriptGenerator.ORDER_NEW = 1.1;            // new
Blockly.JavaScriptGenerator.ORDER_MEMBER = 1.2;         // . []
Blockly.JavaScriptGenerator.ORDER_FUNCTION_CALL = 2;    // ()
Blockly.JavaScriptGenerator.ORDER_INCREMENT = 3;        // ++
Blockly.JavaScriptGenerator.ORDER_DECREMENT = 3;        // --
Blockly.JavaScriptGenerator.ORDER_BITWISE_NOT = 4.1;    // ~
Blockly.JavaScriptGenerator.ORDER_UNARY_PLUS = 4.2;     // +
Blockly.JavaScriptGenerator.ORDER_UNARY_NEGATION = 4.3; // -
Blockly.JavaScriptGenerator.ORDER_LOGICAL_NOT = 4.4;    // !
Blockly.JavaScriptGenerator.ORDER_TYPEOF = 4.5;         // typeof
Blockly.JavaScriptGenerator.ORDER_VOID = 4.6;           // void
Blockly.JavaScriptGenerator.ORDER_DELETE = 4.7;         // delete
Blockly.JavaScriptGenerator.ORDER_AWAIT = 4.8;          // await
Blockly.JavaScriptGenerator.ORDER_EXPONENTIATION = 5.0; // **
Blockly.JavaScriptGenerator.ORDER_MULTIPLICATION = 5.1; // *
Blockly.JavaScriptGenerator.ORDER_DIVISION = 5.2;       // /
Blockly.JavaScriptGenerator.ORDER_MODULUS = 5.3;        // %
Blockly.JavaScriptGenerator.ORDER_SUBTRACTION = 6.1;    // -
Blockly.JavaScriptGenerator.ORDER_ADDITION = 6.2;       // +
Blockly.JavaScriptGenerator.ORDER_BITWISE_SHIFT = 7;    // << >> >>>
Blockly.JavaScriptGenerator.ORDER_RELATIONAL = 8;       // < <= > >=
Blockly.JavaScriptGenerator.ORDER_IN = 8;               // in
Blockly.JavaScriptGenerator.ORDER_INSTANCEOF = 8;       // instanceof
Blockly.JavaScriptGenerator.ORDER_EQUALITY = 9;         // == != === !==
Blockly.JavaScriptGenerator.ORDER_BITWISE_AND = 10;     // &
Blockly.JavaScriptGenerator.ORDER_BITWISE_XOR = 11;     // ^
Blockly.JavaScriptGenerator.ORDER_BITWISE_OR = 12;      // |
Blockly.JavaScriptGenerator.ORDER_LOGICAL_AND = 13;     // &&
Blockly.JavaScriptGenerator.ORDER_LOGICAL_OR = 14;      // ||
Blockly.JavaScriptGenerator.ORDER_CONDITIONAL = 15;     // ?:
Blockly.JavaScriptGenerator.ORDER_ASSIGNMENT = 16;      // = += -= **= *= /= %= <<= >>= ...
Blockly.JavaScriptGenerator.ORDER_YIELD = 16.5;         // yield
Blockly.JavaScriptGenerator.ORDER_COMMA = 17;           // ,
Blockly.JavaScriptGenerator.ORDER_NONE = 99;


Blockly.JavaScriptGenerator.init = function(workspace) {
        // Create a dictionary of definitions to be printed before the code.
        this.definitions_ = Object.create(null);
        // Create a dictionary mapping desired function names in definitions_
        // to actual function names (to avoid collisions with user functions).
        this.functionNames_ = Object.create(null);
        // Create a dictionary of all the libraries which would be needed
        this.imports_ = Object.create(null);
        // Dictionary of any extra classes to output
        this.classes_ = Object.create(null);
        // Dictionary of all the globals
        this.globals_ = Object.create(null);
        // Start with the defaults that all the code depends on
        // for(var i = 0; i < this.needImports_.length; i++) {
        //   this.addImport(this.needImports_[i]);
        // }
        if (!this.variableDB_) {
          this.variableDB_ =
              new Blockly.Names(this.RESERVED_WORDS_);
        } else {
          this.variableDB_.reset();
        }
      
        var defvars = [];
        // Blockly.VariableTypeEquivalence['Colour'] = ['String'];
        var variables = Blockly.Variables.allVariables(workspace);
        var variables2 = Blockly.Variables.allVariables(workspace);
        //this.blocklyTypes_ = Blockly.Variables.allVariablesTypes(workspace);
        // Make sure all the type variables are pushed.  This is because we
        // Don't return the special function parameters in the allVariables list
        for(var name in variables2) {
            variables.push(name);
        }
        // for (var x = 0; x < variables.length; x++) {
        //   var key = variables[x];
        //   this.variableTypes_[key] = this.mapType(variables2[key]);
        // }
      };



//MOTION BLOCKS       ///////////////////////////////////////////////////////////////////////////////////////////
//Move steps
Blockly.JavaScriptGenerator['motion_movesteps'] = function (block) {
        var duration = Blockly.JavaScriptGenerator.valueToCode(block, 'STEPS', Blockly.JavaScriptGenerator.ORDER_ATOMIC) || "0"
        var code = Blockly.JavaScriptGenerator.INDENT +`this.move(${duration});`
        return code;
};

//Turn right
Blockly.JavaScriptGenerator['motion_turnright'] = function (block) {
        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'DEGREES', Blockly.JavaScriptGenerator.ORDER_ATOMIC) || "0"
        var code = Blockly.JavaScriptGenerator.INDENT + `this.direction(${value});`
        return code;
};

// Turn Left
Blockly.JavaScriptGenerator['motion_turnleft'] = function (block) {
        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'DEGREES', Blockly.JavaScriptGenerator.ORDER_ATOMIC) || "0"
        if(value == 0){
        var code = Blockly.JavaScriptGenerator.INDENT + `this.direction(${value});`    
        }
        else{
         var code = Blockly.JavaScriptGenerator.INDENT + `this.direction(-${value});`
        }
        
        return code;    
};

// Go to target
Blockly.JavaScriptGenerator['motion_goto'] = function (block) {
        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'TO', Blockly.JavaScriptGenerator.ORDER_ATOMIC) || "0"
        var code = Blockly.JavaScriptGenerator.INDENT + `this.goto(${value});`
        return code;
};

// Go to x y
Blockly.JavaScriptGenerator['motion_gotoxy'] = function (block) {
        var X = Blockly.JavaScriptGenerator.valueToCode(block, 'X', Blockly.JavaScriptGenerator.ORDER_ATOMIC) || '0'
        var Y = Blockly.JavaScriptGenerator.valueToCode(block, 'Y', Blockly.JavaScriptGenerator.ORDER_ATOMIC) || '0'
        // return `this.x(${X}) \n this.y(${Y}) \n`
        var code = Blockly.JavaScriptGenerator.INDENT + `this.goto(${X},${Y});`
        return code
};

// Glide to target
Blockly.JavaScriptGenerator['motion_glideto'] = function (block) {
        var value1 = Blockly.JavaScriptGenerator.valueToCode(block, 'SECS', Blockly.JavaScriptGenerator.ORDER_ATOMIC) || '0'
        var value2 = Blockly.JavaScriptGenerator.valueToCode(block, 'TO', Blockly.JavaScriptGenerator.ORDER_ATOMIC) || '0'
        // return `this.x(${X}) \n this.y(${Y}) \n`
        var code = Blockly.JavaScriptGenerator.INDENT + `this.glide(${value1},${value2});`
        return code
};

// Glide to x y
Blockly.JavaScriptGenerator['motion_glidesecstoxy'] = function (block) {
        var value1 = Blockly.JavaScriptGenerator.valueToCode(block, 'SECS', Blockly.JavaScriptGenerator.ORDER_ATOMIC) || "0"
        var value2 = Blockly.JavaScriptGenerator.valueToCode(block, 'X', Blockly.JavaScriptGenerator.ORDER_ATOMIC)|| "0"
        var value3 = Blockly.JavaScriptGenerator.valueToCode(block, 'Y', Blockly.JavaScriptGenerator.ORDER_ATOMIC)|| "0"

        var code = Blockly.JavaScriptGenerator.INDENT + `this.glide(${value1},${value2},${value3});`
        return code;
};

// Point in direction
Blockly.JavaScriptGenerator['motion_pointindirection'] = function (block) {
        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'DIRECTION', Blockly.JavaScriptGenerator.ORDER_ATOMIC) || '0'
        var code = Blockly.JavaScriptGenerator.INDENT + `this.direction(${value});`
        return code
};

// Point towards
Blockly.JavaScriptGenerator['motion_pointtowards'] = function (block) {
        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'TOWARDS', Blockly.JavaScriptGenerator.ORDER_ATOMIC) || '0'
        var code = Blockly.JavaScriptGenerator.INDENT + `this.direction(${value});`
        return code
};

// Change x by
Blockly.JavaScriptGenerator['motion_changexby'] = function (block) {
        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'DX', Blockly.JavaScriptGenerator.ORDER_ATOMIC)
        var field
        if(value>0){
                field = `+= ${value}`
        }
        if(value<0){

                var num = value.toString().split("-")
                field = `-= ${num[1]}`
        }
        if(value==0 || null){
                field = `+= 0`
        }
        var code = Blockly.JavaScriptGenerator.INDENT + `this.x ${field};`
        return code;
};

// Set x to
Blockly.JavaScriptGenerator['motion_setx'] = function (block) {
        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'X', Blockly.JavaScriptGenerator.ORDER_ATOMIC) || "0"
        var code = Blockly.JavaScriptGenerator.INDENT + `this.x = ${value};`
        return code;
};

// Change y by
Blockly.JavaScriptGenerator['motion_changeyby'] = function (block) {
        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'DY', Blockly.JavaScriptGenerator.ORDER_ATOMIC)
        var field
        if(value>0){
                field = `+= ${value}`
        }
        if(value<0){

                var num = value.toString().split("-")
                field = `-= ${num[1]}`
        }
        if(value==0 || null){
                field = `+= 0`
        }
        var code = Blockly.JavaScriptGenerator.INDENT + `this.y ${field};`
        return code;
};

// Set y to
Blockly.JavaScriptGenerator['motion_sety'] = function (block) {
        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'Y', Blockly.JavaScriptGenerator.ORDER_ATOMIC) || "0"
        var code = Blockly.JavaScriptGenerator.INDENT + `this.y = ${value};`
        return code;
};

// If on edge, bounce
Blockly.JavaScriptGenerator['motion_ifonedgebounce'] = function (block) {
        var code = Blockly.JavaScriptGenerator.INDENT + `this.bounceOnEdge();`
        return code
};

// Set rotation style
Blockly.JavaScriptGenerator['motion_setrotationstyle'] = function (block) {
        var value = (block.getFieldValue('STYLE'))
        var text;
        if(value == "left-right"){
                text = "LEFT_RIGHT"
        }
        else if (value == "don't rotate"){
                text = "DONT_ROTATE"
        }
        else if (value == "all around"){
                text = "ALL_AROUND"
        }
        var code = Blockly.JavaScriptGenerator.INDENT +`this.rotationStyle = Sprite.RotationStyle.${text};`
        return code
};

// X position
Blockly.JavaScriptGenerator['motion_xposition'] = function (block) {
        var code = `this.x`
        return [code,Blockly.JavaScriptGenerator.ORDER_ATOMIC];
};

// Y position
Blockly.JavaScriptGenerator['motion_yposition'] = function (block) {
        var code = `this.y`
        return [code,Blockly.JavaScriptGenerator.ORDER_ATOMIC];
};

// Direction
Blockly.JavaScriptGenerator['motion_direction'] = function (block) {
        var code = `this.direction`
        return [code,Blockly.JavaScriptGenerator.ORDER_ATOMIC];
};

//MOTION SHadow blocks
Blockly.JavaScriptGenerator['motion_pointtowards_menu'] = function (block) {
        var code;
        var value = (block.getFieldValue('TOWARDS'))
        if (value == "_mouse_") {
                code = 'this.mouse.x , this.mouse.y'
        }
        else {
                code = `this.sprite.${value}.x ,this.sprite.${value}.y`
        }
        var code1 =  code
        return [code1, Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};

Blockly.JavaScriptGenerator['motion_goto_menu'] = function (block) {
        var code;
        var value = (block.getFieldValue('TO'))
        if (value == "_mouse_") {
                code = 'this.mouse.x , this.mouse.y'
        }
        else if (value == "_random_") {
                code = 'this.random(-240, 240), this.random(-150, 150)'
        }
        else {
                code = `this.sprite.${value}.x ,this.sprite.${value}.y`
        }
        // var code1 =  Blockly.JavaScriptGenerator.INDENT + code
        return [code, Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};

Blockly.JavaScriptGenerator['motion_glideto_menu'] = function (block) {
        var code;
        var value = (block.getFieldValue('TO'))
        if (value == "_mouse_") {
                code = 'this.mouse.x , this.mouse.y'
        }
        else if (value == "_random_") {
                code = 'this.random(-240, 240), this.random(-150, 150)'
        }
        else {
                code = `this.sprite.${value}.x ,this.sprite.${value}.y`
        }
        // var code1 =  Blockly.JavaScriptGenerator.INDENT + code
        return [code, Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};

//LOOKS BLOCKS    ////////////////////////////////////////////////////////////////////////////////

// Say for seconds
Blockly.JavaScriptGenerator['looks_sayforsecs'] = function (block) {
        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'MESSAGE',
                Blockly.JavaScriptGenerator.ORDER_NONE)
        var value2 = Blockly.JavaScriptGenerator.valueToCode(block, 'SECS',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var code = Blockly.JavaScriptGenerator.INDENT +`this.sayAndWait("${value}", ${value2});`        
        return code;

};

//Say
Blockly.JavaScriptGenerator['looks_say'] = function (block) {
        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'MESSAGE',
                Blockly.JavaScriptGenerator.ORDER_NONE);
        var code = Blockly.JavaScriptGenerator.INDENT +`this.say("${value}");`
        return code;
};

// Think for seconds
Blockly.JavaScriptGenerator['looks_thinkforsecs'] = function (block) {
        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'MESSAGE',
                Blockly.JavaScriptGenerator.ORDER_NONE)
        var value2 = Blockly.JavaScriptGenerator.valueToCode(block, 'SECS',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var code = Blockly.JavaScriptGenerator.INDENT +`this.thinkAndWait("${value}", ${value2});`        
        return code;

};

// Think
Blockly.JavaScriptGenerator['looks_think'] = function (block) {
        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'MESSAGE',
                Blockly.JavaScriptGenerator.ORDER_NONE);
        var code = Blockly.JavaScriptGenerator.INDENT +`this.think("${value}");`
        return code;
};

// Switch costume
Blockly.JavaScriptGenerator['looks_switchcostumeto'] = function (block) {
        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'COSTUME',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var code = Blockly.JavaScriptGenerator.INDENT +`this.costume=${value};`
        
        return code;

};

// Next costume
Blockly.JavaScriptGenerator['looks_nextcostume'] = function (block) {
        
        var code = Blockly.JavaScriptGenerator.INDENT +`this.costumeNumber++ ;`
        
        return code;

};

// Switch backdrop
Blockly.JavaScriptGenerator['looks_switchbackdropto'] = function (block) {
        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'BACKDROP',
                Blockly.JavaScriptGenerator.ORDER_NONE)
        var backdrop;
        if(value == `"next backdrop"`){
                backdrop = "this.costumeNumber++ ;"
        }
        else if( value == `"previous backdrop"`){
                backdrop = "this.costumeNumber-- ;"
        }
        else {
                backdrop= `this.costume = ${value};`
        }
        var code = Blockly.JavaScriptGenerator.INDENT + backdrop;
        return code;

};

//Next Backdrop
Blockly.JavaScriptGenerator['looks_nextbackdrop'] = function (block) {
        var code = Blockly.JavaScriptGenerator.INDENT +"this.costumeNumber++ ;"    
         return code;
 };

//Change size
Blockly.JavaScriptGenerator['looks_changesizeby'] = function (block) {
        var field
        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'CHANGE',
        Blockly.JavaScriptGenerator.ORDER_NONE)
        if(value>0){
                field = `+= ${value}`
        }
        if(value<0){

                var num = value.toString().split("-")
                field = `-= ${num[1]}`
        }
        if(value==0 || null){
                field = `+= 0`
        }
        var code = Blockly.JavaScriptGenerator.INDENT + `this.size ${field};`
        return code;

};

// Set size
Blockly.JavaScriptGenerator['looks_setsizeto'] = function (block) {
        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'SIZE',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var code = Blockly.JavaScriptGenerator.INDENT +`this.size = ${value}%;`
        
        return code;

};

// Change graphic effect
Blockly.JavaScriptGenerator['looks_changeeffectby'] = function (block) {
        var dropdown = block.getFieldValue('EFFECT').toLowerCase();
        var field
        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'CHANGE',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
                if(value>0){
                        field = `+= ${value}`
                }
                if(value<0){
        
                        var num = value.toString().split("-")
                        field = `-= ${num[1]}`
                }
                if(value==0 || null){
                        field = `+= 0`
                }
        var code =  Blockly.JavaScriptGenerator.INDENT+`this.effect.${dropdown} ${field};`
        return code;

};

// Set graphic effect
Blockly.JavaScriptGenerator['looks_seteffectto'] = function (block) {
        var dropdown = block.getFieldValue('EFFECT').toLowerCase();

        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'VALUE',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var code =  Blockly.JavaScriptGenerator.INDENT+`this.effect.${dropdown} = ${value};`
        return code;

};

// Clear graphic effects
Blockly.JavaScriptGenerator['looks_cleargraphiceffects'] = function (block) {
        var code = Blockly.JavaScriptGenerator.INDENT +"this.effects.clear();"    
         return code;
 };

//Show
Blockly.JavaScriptGenerator['looks_show'] = function (block) {
        var code = Blockly.JavaScriptGenerator.INDENT +"this.visible = true;"    
         return code;
 };

//Hide
Blockly.JavaScriptGenerator['looks_hide'] = function (block) {
        var code = Blockly.JavaScriptGenerator.INDENT +"this.visible = false;"    
         return code;
 };

//Go to layer
Blockly.JavaScriptGenerator['looks_gotofrontback'] = function (block) {
        var dropdown = block.getFieldValue('FRONT_BACK');
        var text;
        if(dropdown == "front"){
                text = "Ahead"
        }
        if(dropdown == "back"){
                text = "Behind"
        }
        var code = Blockly.JavaScriptGenerator.INDENT +`this.move${text}();`    
         return code;
 };


// Go forward/backward layers
Blockly.JavaScriptGenerator['looks_goforwardbackwardlayers'] = function (block) {
        var dropdown = block.getFieldValue('FORWARD_BACKWARD');
        var text;
        if(dropdown == `forward`){
                text = "Ahead"
        }
        if(dropdown == "backward"){
                text = "Behind"
        }
        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'NUM',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var code = Blockly.JavaScriptGenerator.INDENT +`this.move${text}(${value});`
        
        return code;

};

// Costume number/name
Blockly.JavaScriptGenerator['looks_costumenumbername'] = function (block) {
        var code;
        var value = (block.getFieldValue('NUMBER_NAME'))
        if(value=='number'){
                value = "Number"
        }
        else if(value=='name'){
                value = ""
        }
        else{
                value=value;
        }
        code = `this.costume${value}`
        return [code, Blockly.JavaScriptGenerator.ORDER_ATOMIC];
};

// Backdrop number/name
Blockly.JavaScriptGenerator['looks_backdropnumbername'] = function (block) {
        var code;
        var value = (block.getFieldValue('NUMBER_NAME'))
        if(value=='number'){
                value = "Number"
        }
        else if(value=='name'){
                value = ""
        }
        else{
                value=value;
        }
        code = `this.costume${value}`
        return [code, Blockly.JavaScriptGenerator.ORDER_ATOMIC];
};

// Size
Blockly.JavaScriptGenerator['looks_size'] = function (block) {
        var code = "this.size"    
        return [code, Blockly.JavaScriptGenerator.ORDER_ATOMIC];
 };



//Looks Shadow

Blockly.JavaScriptGenerator['looks_costume'] = function (block) {
        var dropdown = block.getFieldValue('COSTUME');
        var code = `"${dropdown}"`
        return [code, Blockly.JavaScriptGenerator.ORDER_ATOMIC];
};
Blockly.JavaScriptGenerator['looks_backdrops'] = function (block) {
        var dropdown = block.getFieldValue('BACKDROP');
        var code = `"${dropdown}"`
        return [code, Blockly.JavaScriptGenerator.ORDER_ATOMIC];
};


//SENSING BLOCKS
Blockly.JavaScriptGenerator['sensing_touchingobject'] = function (block) {
        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'TOUCHINGOBJECTMENU',
                Blockly.JavaScriptGenerator.ORDER_NONE)
        var code = `this.isTouching(${value})`
        return [code, Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};
Blockly.JavaScriptGenerator['sensing_of'] = function (block) {
        var data;
        var field = (block.getFieldValue('PROPERTY'))
        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'OBJECT',
                Blockly.JavaScriptGenerator.ORDER_NONE)

        switch(field){
        case 'y position':data = 'y';
        break;
        case 'x position':data = 'x';
        break;
        case 'direction':data = 'direction';
        break;
        case 'costume #': data = 'costume';
        break;
        case 'costume name':data = 'costumeName';
        break;
        case 'size':data = 'size';
        break;
        case 'volume' : data = 'volume'
        break;
        case 'backdrop #':data = 'backdrop';
        break;
        case 'backdrop name' : data = 'backdropName'
        break;
        default: data = field;
        break;
        }
        var code = `${value}.${data}`
        return [code, Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};
Blockly.JavaScriptGenerator['sensing_touchingobjectmenu'] = function (block) {
        var code;
        var value = (block.getFieldValue('TOUCHINGOBJECTMENU'))
        if (value == "_mouse_") {
                code = 'this.mouse.x , this.mouse.y'
        }
        else if (value == "_edge_") {
                code = 'this.edge'
        }
        else {
                code = `this.sprite.${value}`
        }
        return [code, Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};
Blockly.JavaScriptGenerator['sensing_mousex'] = function (block) {
        var code = `this.mouse.x`
        return [code, Blockly.JavaScriptGenerator.ORDER_ATOMIC];
};

Blockly.JavaScriptGenerator['sensing_mousedown'] = function (block) {
        var code = `this.mouseClicked`
        return [code, Blockly.JavaScriptGenerator.ORDER_ATOMIC];
};
Blockly.JavaScriptGenerator['sensing_keypressed'] = function (block) {
        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'KEY_OPTION', Blockly.JavaScriptGenerator.ORDER_ATOMIC)
        var code = `this.keyPressed("${value}")`
        return [code, Blockly.JavaScriptGenerator.ORDER_ATOMIC];
};
//Sensing Shadow 
Blockly.JavaScriptGenerator['sensing_of_object_menu'] = function (block) {
        var value = (block.getFieldValue('OBJECT'))
        if(value=="_stage_"){
                value = "this.stage"
        }
        else{
                value = `this.sprite("${value}")`
        }
        var code = `${value}`
        return [code, Blockly.JavaScriptGenerator.ORDER_ATOMIC];
};
Blockly.JavaScriptGenerator['sensing_keyoptions'] = function (block) {
        var value = (block.getFieldValue('KEY_OPTION'))
        var code = `${value}`
        return [code, Blockly.JavaScriptGenerator.ORDER_ATOMIC];
};


//CONTROL BLOCKS
Blockly.JavaScriptGenerator['control_wait'] = function (block) {
        var duration = Blockly.JavaScriptGenerator.valueToCode(block, 'DURATION', Blockly.JavaScriptGenerator.ORDER_ATOMIC)
        var code = Blockly.JavaScriptGenerator.INDENT +`this.wait(${duration});`
        return code;
};
Blockly.JavaScriptGenerator['control_repeat'] = function (block) {
        // Repeat n times.
        var repeats = Blockly.JavaScriptGenerator.valueToCode(block, 'TIMES',
                Blockly.JavaScriptGenerator.ORDER_ASSIGNMENT) || '0'

        var branch = Blockly.JavaScriptGenerator.statementToCode(block, 'SUBSTACK');
        branch = Blockly.JavaScriptGenerator.addLoopTrap(branch, block.id);

        var code = Blockly.JavaScriptGenerator.INDENT+'for (var i' + ' = 0; ' +
                'i < ' + repeats + '; ' +
                'i++) {\n' +
                branch + '\n}';
        return code
};
Blockly.JavaScriptGenerator['control_forever'] = function (block) {
        // var branch;
        // var define_blocks =  block.getInputTargetBlock('SUBSTACK');
        // console.log("defineblock",define_blocks)
        // if (define_blocks)
        //     do {
        //        branch =  Blockly.JavaScriptGenerator.blockToCode(define_blocks);
        //     } while (define_blocks = define_blocks.getNextBlock());

        var branch = Blockly.JavaScriptGenerator.statementToCode(block, 'SUBSTACK');
        branch = Blockly.JavaScriptGenerator.addLoopTrap(branch, block.id);
        var code = Blockly.JavaScriptGenerator.INDENT+ 'while(true){\n' +
                branch + Blockly.JavaScriptGenerator.INDENT + '\n }';
        return code
};
Blockly.JavaScriptGenerator['control_repeat_until'] = function (block) {
        let n = 0;
        let code = '';
        if (Blockly.JavaScriptGenerator.STATEMENT_PREFIX) {
                // Automatic prefix insertion is switched off for this block.  Add manually.
                code += Blockly.JavaScriptGenerator.injectId(Blockly.JavaScriptGenerator.STATEMENT_PREFIX, block);
        }
        do {
                const conditionCode =
                        Blockly.JavaScriptGenerator.valueToCode(block, 'CONDITION', Blockly.JavaScriptGenerator.ORDER_NONE) ||
                        'false';
                let branchCode = Blockly.JavaScriptGenerator.statementToCode(block, 'SUBSTACK');
                if (Blockly.JavaScriptGenerator.STATEMENT_SUFFIX) {
                        branchCode = Blockly.JavaScriptGenerator.prefixLines(
                                Blockly.JavaScriptGenerator.injectId(Blockly.JavaScriptGenerator.STATEMENT_SUFFIX, block),
                                Blockly.JavaScriptGenerator.INDENT) +
                                branchCode;
                }
                code += Blockly.JavaScriptGenerator.INDENT+'while(' + conditionCode + ') {\n' + branchCode + '\n }';
                n++;
        } while (block.getInput('CONDITION' + n));

        // if (block.getInput('ELSE') || Blockly.JavaScriptGenerator.STATEMENT_SUFFIX) {
        //   let branchCode = Blockly.JavaScriptGenerator.statementToCode(block, 'ELSE');
        //   if (Blockly.JavaScriptGenerator.STATEMENT_SUFFIX) {
        //     branchCode = Blockly.JavaScriptGenerator.prefixLines(
        //         Blockly.JavaScriptGenerator.injectId(Blockly.JavaScriptGenerator.STATEMENT_SUFFIX, block),
        //         Blockly.JavaScriptGenerator.INDENT) +
        //         branchCode;
        //   }
        //   code += ' else {\n' + branchCode + '}';
        // }
        return code;
};
Blockly.JavaScriptGenerator['control_if'] = function (block) {
        let n = 0;
        let code = '';

        do {
                const conditionCode = Blockly.JavaScriptGenerator.valueToCode(block, 'CONDITION', Blockly.JavaScriptGenerator.ORDER_NONE)
                let branchCode = Blockly.JavaScriptGenerator.statementToCode(block, 'SUBSTACK');
                code += Blockly.JavaScriptGenerator.INDENT+'if(' + conditionCode + ') {\n' + branchCode + '\n }';
                if (Blockly.JavaScriptGenerator.STATEMENT_PREFIX) {
                        // Automatic prefix insertion is switched off for this block.  Add manually.
                        code += Blockly.JavaScriptGenerator.injectId(Blockly.JavaScriptGenerator.STATEMENT_PREFIX, block);
                }
                if (Blockly.JavaScriptGenerator.STATEMENT_SUFFIX) {
                        branchCode = Blockly.JavaScriptGenerator.prefixLines(
                                Blockly.JavaScriptGenerator.injectId(Blockly.JavaScriptGenerator.STATEMENT_SUFFIX, block),
                                Blockly.JavaScriptGenerator.INDENT) +
                                branchCode;
                        code += Blockly.JavaScriptGenerator.INDENT+'if('+conditionCode+') {\n' +branchCode+ '\n }';
                }
               
                n++;
        } while (block.getInput('CONDITION' + n));
        return code;
};


Blockly.JavaScriptGenerator['control_if_else'] = function (block) {
        let n = 0;
        let code = '';
        
        do {
                const conditionCode =
                        Blockly.JavaScriptGenerator.valueToCode(block, 'CONDITION', Blockly.JavaScriptGenerator.ORDER_NONE);
                let branchCode1 = Blockly.JavaScriptGenerator.statementToCode(block, 'SUBSTACK');
                let branchCode2 = Blockly.JavaScriptGenerator.statementToCode(block, 'SUBSTACK2');
                code += Blockly.JavaScriptGenerator.INDENT+'if(' + conditionCode + ') {\n' + branchCode1 + '\n } \n else'+'{\n' + branchCode2 + '\n }';
                if (Blockly.JavaScriptGenerator.STATEMENT_PREFIX) {
                        // Automatic prefix insertion is switched off for this block.  Add manually.
                        code += Blockly.JavaScriptGenerator.injectId(Blockly.JavaScriptGenerator.STATEMENT_PREFIX, block);
                }
                if (Blockly.JavaScriptGenerator.STATEMENT_SUFFIX) {
                        branchCode1 = Blockly.JavaScriptGenerator.prefixLines(
                                Blockly.JavaScriptGenerator.injectId(Blockly.JavaScriptGenerator.STATEMENT_SUFFIX, block),
                                Blockly.JavaScriptGenerator.INDENT) +
                                branchCode1;
                        branchCode2 = Blockly.JavaScriptGenerator.prefixLines(
                                Blockly.JavaScriptGenerator.injectId(Blockly.JavaScriptGenerator.STATEMENT_SUFFIX, block),
                                Blockly.JavaScriptGenerator.INDENT) +
                                branchCode2;
                                code += Blockly.JavaScriptGenerator.INDENT+'if(' + conditionCode + ') {\n' + branchCode1 + '\n } \n else'+'{\n' + branchCode2 + '\n }';
                }
               
                n++;
        } while (block.getInput('CONDITION' + n));

        return code;
};

Blockly.JavaScriptGenerator['control_start_as_clone'] = function (block) {

       // var value = Blockly.JavaScriptGenerator.valueToCode(block, 'CLONE_OPTION',Blockly.JavaScriptGenerator.ORDER_NONE);
        var code = Blockly.JavaScriptGenerator.INDENT +`this.onClone()`
        return code;

};

Blockly.JavaScriptGenerator['control_create_clone_of'] = function (block) {

        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'CLONE_OPTION',Blockly.JavaScriptGenerator.ORDER_NONE);
        var code =  Blockly.JavaScriptGenerator.INDENT+`this.sprite${value}.createClone();`
        return code;

};
//clone shadow
Blockly.JavaScriptGenerator['control_create_clone_of_menu'] = function (block) {
        var code;
        var value = (block.getFieldValue('CLONE_OPTION'))
        if (value == "_myself_") {
                code = ''
        }
        else {
                code = `["${value}"]`
        }
        return [code, Blockly.JavaScriptGenerator.ORDER_NONE];

};
Blockly.JavaScriptGenerator['control_delete_this_clone'] = function (block) {

        var value = Blockly.JavaScriptGenerator.valueToCode(block, 'CLONE_OPTION',Blockly.JavaScriptGenerator.ORDER_NONE);
        var code =  Blockly.JavaScriptGenerator.INDENT+`this.deleteThisClone();`
        return code;

};
Blockly.JavaScriptGenerator['control_stop'] = function (block) {

        var value = (block.getFieldValue('STOP_OPTION'))
        var code =  Blockly.JavaScriptGenerator.INDENT+`this.terminate("${value}");`
        return code;

};


//EVENTS BLOCK
Blockly.JavaScriptGenerator['event_whenflagclicked'] = function (block) {
        var code = "function flagClicked () {" 
        return code
};


//OPERATORS      ////////////////////////////////////////////////////////////////////////////////////


// Add (+)
Blockly.JavaScriptGenerator['operator_add'] = function (block) {
        var value1 = Blockly.JavaScriptGenerator.valueToCode(block, 'NUM1',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var value2 = Blockly.JavaScriptGenerator.valueToCode(block, 'NUM2',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var code =`${value1}+${value2}`
        
        return [code,Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};

// Subtract (-)
Blockly.JavaScriptGenerator['operator_subtract'] = function (block) {
        var value1 = Blockly.JavaScriptGenerator.valueToCode(block, 'NUM1',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var value2 = Blockly.JavaScriptGenerator.valueToCode(block, 'NUM2',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var code =`${value1}-${value2}`
        
        return [code,Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};

// Multiply (×)
Blockly.JavaScriptGenerator['operator_multiply'] = function (block) {
        var value1 = Blockly.JavaScriptGenerator.valueToCode(block, 'NUM1',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var value2 = Blockly.JavaScriptGenerator.valueToCode(block, 'NUM2',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var code =`${value1}*${value2}`
        
        return [code,Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};

// Divide (÷)
Blockly.JavaScriptGenerator['operator_divide'] = function (block) {
        var value1 = Blockly.JavaScriptGenerator.valueToCode(block, 'NUM1',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var value2 = Blockly.JavaScriptGenerator.valueToCode(block, 'NUM2',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var code =`${value1}/${value2}`
        
        return [code,Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};

// Pick random
Blockly.JavaScriptGenerator['operator_random'] = function (block) {
        var value1 = Blockly.JavaScriptGenerator.valueToCode(block, 'FROM',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var value2 = Blockly.JavaScriptGenerator.valueToCode(block, 'TO',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var code =`this.random(${value1},${value2})`
        
        return [code,Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};

// Greater than (>)
Blockly.JavaScriptGenerator['operator_gt'] = function (block) {
        var value1 = Blockly.JavaScriptGenerator.valueToCode(block, 'OPERAND1',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var value2 = Blockly.JavaScriptGenerator.valueToCode(block, 'OPERAND2',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var code =`${value1} > ${value2}`
        
        return [code,Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};

// Less than (<)
Blockly.JavaScriptGenerator['operator_lt'] = function (block) {
        var value1 = Blockly.JavaScriptGenerator.valueToCode(block, 'OPERAND1',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var value2 = Blockly.JavaScriptGenerator.valueToCode(block, 'OPERAND2',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var code =`${value1} < ${value2}`
        
        return [code,Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};

// Equal (=)
Blockly.JavaScriptGenerator['operator_equals'] = function (block) {
        var value1 = Blockly.JavaScriptGenerator.valueToCode(block, 'OPERAND1',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var value2 = Blockly.JavaScriptGenerator.valueToCode(block, 'OPERAND2',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var code =`${value1}==${value2}`
        
        return [code,Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};

// And
Blockly.JavaScriptGenerator['operator_and'] = function (block) {
        var value1 = Blockly.JavaScriptGenerator.valueToCode(block, 'OPERAND1',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var value2 = Blockly.JavaScriptGenerator.valueToCode(block, 'OPERAND2',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var code =`${value1} && ${value2}`
        
        return [code,Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};

// Or
Blockly.JavaScriptGenerator['operator_or'] = function (block) {
        var value1 = Blockly.JavaScriptGenerator.valueToCode(block, 'OPERAND1',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var value2 = Blockly.JavaScriptGenerator.valueToCode(block, 'OPERAND2',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var code =`${value1} || ${value2}`
        
        return [code,Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};

// Not
Blockly.JavaScriptGenerator['operator_not'] = function (block) {
        var value1 = Blockly.JavaScriptGenerator.valueToCode(block, 'OPERAND',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var code =`!${value1}`
        
        return [code,Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};

//join
Blockly.JavaScriptGenerator['operator_join'] = function (block) {
        var value1 = Blockly.JavaScriptGenerator.valueToCode(block, 'STRING1',
                Blockly.JavaScriptGenerator.ORDER_NONE) || ""
        var value2 = Blockly.JavaScriptGenerator.valueToCode(block, 'STRING2',
                Blockly.JavaScriptGenerator.ORDER_NONE) || ""
        var code =`"${value1}" + "${value2}"`
        
        return [code,Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};

// Letterof string
Blockly.JavaScriptGenerator['operator_letter_of'] = function (block) {
        var num;
        var value1 = Blockly.JavaScriptGenerator.valueToCode(block, 'LETTER',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        if(value1 >0){
                num = value1 - 1;
        }
        else{
                num = value1;
        }
        var value2 = Blockly.JavaScriptGenerator.valueToCode(block, 'STRING',
                Blockly.JavaScriptGenerator.ORDER_NONE) || ""
        var code =`"${value2}"[${num}]`
        
        return [code,Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};

//Length of strings
Blockly.JavaScriptGenerator['operator_length'] = function (block) {
        var value1 = Blockly.JavaScriptGenerator.valueToCode(block, 'STRING',
                Blockly.JavaScriptGenerator.ORDER_NONE) || ""
        var code =`"${value1}".length`
        
        return [code,Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};

//COntains string
Blockly.JavaScriptGenerator['operator_contains'] = function (block) {
        var value1 = Blockly.JavaScriptGenerator.valueToCode(block, 'STRING1',
                Blockly.JavaScriptGenerator.ORDER_NONE) || ""
        var value2 = Blockly.JavaScriptGenerator.valueToCode(block, 'STRING2',
                Blockly.JavaScriptGenerator.ORDER_NONE) || ""
        var code =`"${value1}".includes("${value2}")`
        
        return [code,Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};

//operator mod
Blockly.JavaScriptGenerator['operator_mod'] = function (block) {
        var value1 = Blockly.JavaScriptGenerator.valueToCode(block, 'NUM1',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var value2 = Blockly.JavaScriptGenerator.valueToCode(block, 'NUM2',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var code =`${value1} % ${value2}`
        
        return [code,Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};

//Round
Blockly.JavaScriptGenerator['operator_round'] = function (block) {
        var value1 = Blockly.JavaScriptGenerator.valueToCode(block, 'NUM',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var code =`Math.round(${value1})`
        
        return [code,Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};

//Math of 
Blockly.JavaScriptGenerator['operator_mathop'] = function (block) {
        var value = (block.getFieldValue('OPERATOR'))
        var value1 = Blockly.JavaScriptGenerator.valueToCode(block, 'NUM',
                Blockly.JavaScriptGenerator.ORDER_NONE) || "0"
        var func
        switch(value){
        case "sin" : func = `Math.sin(this.degToRad(${value1}))` ; break;
        case "cos" : func = `Math.cos(this.degToRad(${value1}))` ; break;
        case "tan" : func = `Math.tan(this.degToRad(${value1}))` ; break;
        case "asin" : func = `this.radToDeg(Math.asin(${value1}))` ; break;
        case "acos" : func = `this.radToDeg(Math.acos(${value1}))` ; break;
        case "atan" : func = `this.radToDeg(Math.atan(${value1}))` ; break;
        case "ceiling" : func = `Math.ceil(${value1})` ; break;
        case "ln" : func = `Math.log(${value1})` ; break;
        case "log" : func = `Math.log10(${value1})` ; break;
        case "e ^" : func = `Math.E ** (${value1})` ; break;
        case "10 ^" : func = `Math.10 ** (${value1})` ; break;
        default : func = `Math.${value}(${value1})`;break;
        }

        var code =`${func}`
        
        return [code,Blockly.JavaScriptGenerator.ORDER_ATOMIC];

};




//SHADOW type TEXT       ////////////////////////////////////////////
Blockly.JavaScriptGenerator['text'] = function (block) {
        var code;
        var value = (block.getFieldValue('TEXT'))
        code = value
        return [code, Blockly.JavaScriptGenerator.ORDER_ATOMIC];
};


// Math Block to code    //////////////////////////////////////
Blockly.JavaScriptGenerator['math_number'] = function (block) {
        // Numeric value. 
        var code = parseFloat(block.getFieldValue('NUM'));
        var order; if (code == Infinity) {
                code = 'float("inf")';
                order = Blockly.JavaScriptGenerator.ORDER_FUNCTION_CALL;
        } else if
                (code == -Infinity) {
                code = '-float("inf")';
                order = Blockly.JavaScriptGenerator.ORDER_UNARY_SIGN;
        }
        else {
                order = code < 0 ? Blockly.JavaScriptGenerator.ORDER_UNARY_SIGN : Blockly.JavaScriptGenerator.ORDER_ATOMIC;
        } return [code, order];
};
Blockly.JavaScriptGenerator['math_positive_number'] = function (block) {
        // Numeric value. 
        var code = parseFloat(block.getFieldValue('NUM'));
        var order; if (code == Infinity) {
                code = 'float("inf")';
                order = Blockly.JavaScriptGenerator.ORDER_FUNCTION_CALL;
        } else if
                (code == -Infinity) {
                code = '-float("inf")';
                order = Blockly.JavaScriptGenerator.ORDER_UNARY_SIGN;
        }
        else {
                order = code < 0 ? Blockly.JavaScriptGenerator.ORDER_UNARY_SIGN : Blockly.JavaScriptGenerator.ORDER_ATOMIC;
        } return [code, order];
};
Blockly.JavaScriptGenerator['math_integer'] = function (block) {
        // Numeric value. 
        var code = parseFloat(block.getFieldValue('NUM'));
        var order; if (code == Infinity) {
                code = 'float("inf")';
                order = Blockly.JavaScriptGenerator.ORDER_FUNCTION_CALL;
        } else if
                (code == -Infinity) {
                code = '-float("inf")';
                order = Blockly.JavaScriptGenerator.ORDER_UNARY_SIGN;
        }
        else {
                order = code < 0 ? Blockly.JavaScriptGenerator.ORDER_UNARY_SIGN : Blockly.JavaScriptGenerator.ORDER_ATOMIC;
        } return [code, order];
};
Blockly.JavaScriptGenerator['math_whole_number'] = function (block) {
        // Numeric value. 
        var code = parseFloat(block.getFieldValue('NUM'));
        var order; if (code == Infinity) {
                code = 'float("inf")';
                order = Blockly.JavaScriptGenerator.ORDER_FUNCTION_CALL;
        } else if
                (code == -Infinity) {
                code = '-float("inf")';
                order = Blockly.JavaScriptGenerator.ORDER_UNARY_SIGN;
        }
        else {
                order = code < 0 ? Blockly.JavaScriptGenerator.ORDER_UNARY_SIGN : Blockly.JavaScriptGenerator.ORDER_ATOMIC;
        } return [code, order];
};
Blockly.JavaScriptGenerator['math_angle'] = function (block) {
        // Numeric value. 
        var code = parseFloat(block.getFieldValue('NUM'));
        var order; if (code == Infinity) {
                code = 'float("inf")';
                order = Blockly.JavaScriptGenerator.ORDER_FUNCTION_CALL;
        } else if
                (code == -Infinity) {
                code = '-float("inf")';
                order = Blockly.JavaScriptGenerator.ORDER_UNARY_SIGN;
        }
        else {
                order = code < 0 ? Blockly.JavaScriptGenerator.ORDER_UNARY_SIGN : Blockly.JavaScriptGenerator.ORDER_ATOMIC;
        } return [code, order];
};
Blockly.JavaScriptGenerator.scrub_ = function (block, code, opt_thisOnly) {
        const nextBlock =
                block.nextConnection && block.nextConnection.targetBlock();
        if (nextBlock && !opt_thisOnly) {
                return code + '\n' + Blockly.JavaScriptGenerator.blockToCode(nextBlock)
        }
        return code;

};
Blockly.JavaScriptGenerator.INFINITE_LOOP_TRAP = null;

export default Blockly.JavaScriptGenerator;
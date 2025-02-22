import * as ohm from "ohm-js"
// --------------------------
// 1. Define the grammar source as a string
// --------------------------
const grammarSource = `
Question2Language {
  Program
    = Decl* Expression

  Decl
    = "func" Identifier "(" ParamList? ")" Body "end"

  Body
  = Expression ( ";" Expression )*

  ParamList
    = Identifier ("," Identifier)*

  Expression
    = Conditional

  Conditional
    = AddExp ("if" AddExp ("else" Expression)?)?

  AddExp
    = AddExp "+" MulExp  -- plus
    | AddExp "-" MulExp  -- minus
    | MulExp

  MulExp
    = MulExp "*" Unary  -- times
    | MulExp "/" Unary  -- divide
    | Unary

  Unary
    = "-" Unary         -- neg
    | Factor

  Factor
    = Factor "!"        -- factorial
    | Primary


  Primary
    = "(" Expression ")"  -- paren
    | NumericLiteral
    | StringLiteral
    | FunctionCall
    | Identifier

  FunctionCall
    = Identifier "[" ArgList? "]"

  ArgList
    = Expression ("," Expression)*

  NumericLiteral
    = digit+ ("." digit+)? Exp?

  Exp
    = ( "e" | "E" ) ("+" | "-")? digit+


  StringLiteral
  = "\"" StringChar* "\""

  StringChar
  = ~("\"" | "\\") any        
  
  Hex
    = digit
    | "a".."f"
    | "A".."F"

  Identifier
    = ~Reserved
      ( (letter | "@") ( letter | digit | "_" | "@" | "$" )* )

  Reserved
    = "func" | "end" | "if" | "else"

  space
    := " " | "\t" | "\n" | "\r"
}

  
`;

// --------------------------
// 2. Create the grammar
// --------------------------
let myGrammar;
try {
  myGrammar = ohm.grammar(grammarSource);
  console.log("Grammar loaded successfully!");
} catch (e) {
  console.error("Failed to create grammar:", e.message);
  process.exit(1);
}
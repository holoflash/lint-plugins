import { defineRule } from "oxlint";

const preferFunctionDeclaration = defineRule({
    meta: {
        type: "suggestion",
        docs: {
            description: "Prefer function declarations over arrow functions for JSX components",
        },
        fixable: "code",
        schema: [],
    },
    createOnce(context) {
        return {
            ArrowFunctionExpression(node) {
                // Helper function to check if a node contains JSX
                const containsJSX = (node) => {
                    if (!node) return false;

                    // Direct JSX
                    if (node.type === 'JSXElement' || node.type === 'JSXFragment') {
                        return true;
                    }

                    // Conditional expression (ternary)
                    if (node.type === 'ConditionalExpression') {
                        return containsJSX(node.consequent) || containsJSX(node.alternate);
                    }

                    // Logical expression (&&, ||)
                    if (node.type === 'LogicalExpression') {
                        return containsJSX(node.left) || containsJSX(node.right);
                    }

                    // Parenthesized expression
                    if (node.type === 'ParenthesizedExpression') {
                        return containsJSX(node.expression);
                    }

                    return false;
                };

                const returnsJSX =
                    containsJSX(node.body) ||
                    (node.body.type === 'BlockStatement' &&
                        node.body.body.some(stmt =>
                            stmt.type === 'ReturnStatement' && containsJSX(stmt.argument)
                        ));

                if (returnsJSX) {
                    const isVariableDeclaration =
                        node.parent?.type === 'VariableDeclarator' &&
                        node.parent.id?.type === 'Identifier';

                    if (isVariableDeclaration) {
                        const componentName = node.parent.id.name;
                        const variableDeclarator = node.parent;
                        const variableDeclaration = variableDeclarator.parent;

                        context.report({
                            node,
                            message: `Convert arrow function component '${componentName}' to function declaration`,
                            fix(fixer) {
                                const sourceCode = context.sourceCode || context.getSourceCode();

                                // Helper to get node position (support both oxlint and ESLint)
                                const getRange = (node) => {
                                    if (node.range) return node.range;
                                    return [node.start, node.end];
                                };

                                // Helper to get text
                                const getText = (node) => {
                                    const [start, end] = getRange(node);
                                    if (sourceCode.text) {
                                        return sourceCode.text.slice(start, end);
                                    }
                                    return sourceCode.getText(node);
                                };

                                // Extract type parameters if present (TypeScript generics)
                                let typeParameters = '';

                                if (node.typeParameters) {
                                    const tpRange = getRange(node.typeParameters);
                                    if (sourceCode.text) {
                                        typeParameters = sourceCode.text.slice(tpRange[0], tpRange[1]);
                                    } else {
                                        typeParameters = sourceCode.getText(node.typeParameters);
                                    }
                                }
                                // Get parameters as text
                                const params = node.params.length > 0
                                    ? node.params.map(param => getText(param)).join(', ')
                                    : '';

                                // Get body text
                                let bodyText;
                                if (node.body.type === 'BlockStatement') {
                                    // Already a block statement, use as-is
                                    bodyText = getText(node.body);
                                } else {
                                    // Expression body - need to add return statement and braces
                                    const expressionText = getText(node.body);
                                    bodyText = `{\n  return ${expressionText};\n}`;
                                }

                                // Check if exported
                                const isExported = variableDeclaration.parent?.type === 'ExportNamedDeclaration';
                                const isDefaultExport = variableDeclaration.parent?.type === 'ExportDefaultDeclaration';

                                // Build function declaration
                                let replacement;
                                if (isDefaultExport) {
                                    replacement = `export default function ${componentName}${typeParameters}(${params}) ${bodyText}`;
                                    // Replace the entire export statement
                                    return fixer.replaceTextRange(
                                        getRange(variableDeclaration.parent),
                                        replacement
                                    );
                                } else if (isExported) {
                                    replacement = `export function ${componentName}${typeParameters}(${params}) ${bodyText}`;
                                    // Replace the entire export statement
                                    return fixer.replaceTextRange(
                                        getRange(variableDeclaration.parent),
                                        replacement
                                    );
                                } else {
                                    replacement = `function ${componentName}${typeParameters}(${params}) ${bodyText}`;
                                    // Replace the entire variable declaration
                                    return fixer.replaceTextRange(
                                        getRange(variableDeclaration),
                                        replacement
                                    );
                                }
                            }
                        });
                    }
                }
            },
        };
    },
});

const plugin = {
    meta: {
        name: "holoflash-lint",
        version: "1.0.0",
    },
    rules: {
        "prefer-function-declaration": preferFunctionDeclaration,
    },
};

export default plugin;
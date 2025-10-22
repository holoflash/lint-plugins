import { defineRule } from "oxlint";

const preferFunctionDeclaration = defineRule({
    createOnce(context) {
        return {
            ArrowFunctionExpression(node) {
                const returnsJSX =
                    node.body.type === 'JSXElement' ||
                    node.body.type === 'JSXFragment' ||
                    (node.body.type === 'BlockStatement' &&
                        node.body.body.some(stmt =>
                            stmt.type === 'ReturnStatement' &&
                            (stmt.argument?.type === 'JSXElement' || stmt.argument?.type === 'JSXFragment')
                        ));

                if (returnsJSX) {
                    const isVariableDeclaration =
                        node.parent?.type === 'VariableDeclarator' &&
                        node.parent.id?.type === 'Identifier';

                    if (isVariableDeclaration) {
                        const componentName = node.parent.id.name;

                        context.report({
                            node,
                            message: `Convert arrow function component '${componentName}' to function declaration`,
                            fix(_fixer) {
                                // To be implemented
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
        name: "holoflash-lint-react-opinionated",
        version: "1.0.0",
    },
    rules: {
        "prefer-function-declaration": preferFunctionDeclaration,
    },
};

export default plugin;
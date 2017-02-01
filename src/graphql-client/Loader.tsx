import * as React from 'react';
import { execute, validate, DocumentNode, ExecutionResult, GraphQLError } from 'graphql'
import Schema from './Root';

export default class Loader {

    graphQlErrors: string[];

    constructor(public document: DocumentNode, initialOperation?: string, variables?: {[key: string]: any}, contextValue?) {
        if (initialOperation) this.execute(initialOperation, variables, contextValue)
    }

    execute(operationName: string, variables?: {[key: string]: any}, contextValue?, rootValue?) {
        const errors = validate(Schema, this.document);
        console.log("execute", operationName, errors);
        if( errors.length ) return errors;
        execute(
            Schema,
            this.document,
            rootValue,
            contextValue,
            variables,
            operationName
        ).then( result => {
            for ( const key in result.data ) {
                this[key] = result.data[key]
                this.graphQlErrors = result.errors ? result.errors.map(error => error.message) : null;
            }
        } );
    }
}
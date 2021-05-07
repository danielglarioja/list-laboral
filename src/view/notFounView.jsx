import React from 'react'

export class NotFoundView extends React.Component {
    constructor (){
        super();
        this.state = {
            somekey: 'someValue'
        };
    }
    render() {
        return <h1>PAGINA NO ENCONTRADA</h1>;
    }
}
import React from 'react';
import ReactDom from 'react-dom';
import MarkdownRenderer from 'react-markdown-renderer';


class RichText extends React.Component {

    constructor() {
        super()
    }

    render() {

        let text = this.props.children.replace(/(\+\+){1}(?<underline>[^++]*)(\+\+){1}/g, '<span style="text-decoration: underline">$<underline></span>');
        return (
            <div>
              <MarkdownRenderer markdown={text} options={{html: true}} />
            </div>

        )
    }
}
export default RichText



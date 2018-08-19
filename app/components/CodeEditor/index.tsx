import * as React from 'react';
import MonacoResizer from './MonacoResizer';
import MonacoEditor, {MonacoDiffEditor} from 'react-monaco-editor';

if (process.env.NODE_ENV === 'production') {
    const monaco = require('monaco-editor');
    (window as any).monaco = monaco;
}


interface CodeEditorProps {
    value?: string;
    onChange?(val: string, ev: any): void;
    language?: string;
    height?: string;
    wordWrap?: boolean;
    diffValue?: string;
}

const
    requireConfig = {
        // url: './vs/loader.js'
    },

    defaultEditorOptions = {
        autoIndent: true,
        fontFamily: 'Inconsolata'
    };

export default class CodeEditor extends React.Component<CodeEditorProps> {
    private editorRef: any;

    static resize() {
        MonacoResizer.resizeEditor();
    }

    constructor(props) {
        super(props);
        this.onEditorDidMount = this.onEditorDidMount.bind(this);
    }

    onEditorDidMount(editor: any, monaco: any) {
        this.editorRef = editor;
        MonacoResizer.addEditor(editor, monaco);
    }

    componentWillUnmount() {
        MonacoResizer.removeEditor(this.editorRef);
    }

    render() {
        const props = this.props;
        return props.diffValue ? (
            <MonacoDiffEditor
                value={props.value}
                original={props.diffValue}
                onChange={props.onChange}
                theme={'xcode'}
                language={props.language}
                editorDidMount={this.onEditorDidMount}
                options={{
                    ...defaultEditorOptions,
                    wordWrap: this.props.wordWrap
                }}
                requireConfig={requireConfig}
            />
            ) : (
            <MonacoEditor
                value={props.value}
                onChange={props.onChange}
                theme={'xcode'}
                language={props.language}
                editorDidMount={this.onEditorDidMount}
                options={{
                    ...defaultEditorOptions,
                    wordWrap: this.props.wordWrap
                }}
                requireConfig={requireConfig}
            />
        )
    }
};

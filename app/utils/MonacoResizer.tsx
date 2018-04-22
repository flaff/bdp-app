import ICodeEditor = monaco.editor.ICodeEditor;

const RESIZE_TIMEOUT = 250;

export default class ResizableMonacoEditor {
    editor: ICodeEditor;
    resizeTimeout: number;

    constructor() {
        window.addEventListener('resize', this.onWindowResizeQueueEditorResize);
    }

    setEditor = (editor: ICodeEditor) => {
        this.editor = editor;
    };

    resizeEditor() {
        console.log('resizing editor!', this.editor);
        this.editor.layout();
    }

    onWindowResizeQueueEditorResize = () => {
        console.log('resize detected');
        this.resizeTimeout && window.clearTimeout(this.resizeTimeout);
        this.resizeTimeout = window.setTimeout(this.resizeEditor.bind(this), RESIZE_TIMEOUT);
    }
}
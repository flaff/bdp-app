import ICodeEditor = monaco.editor.ICodeEditor;
import {defineXCodeTheme} from "./MonacoTheme";

const RESIZE_TIMEOUT = 250;

class MonacoResizer {
    editors: Array<ICodeEditor> = [];
    resizeTimeout: number;
    definedTheme: boolean;

    constructor() {
        window.addEventListener('resize', this.onWindowResizeQueueEditorResize);
    }

    addEditor = (editor: ICodeEditor, monaco: any) => {
        this.editors.indexOf(editor) === -1 && this.editors.push(editor);
        if (!this.definedTheme) {
            defineXCodeTheme(monaco.editor.defineTheme);
            this.definedTheme = true;
        }
    };

    removeEditor = (editor: ICodeEditor) => {
        const index = this.editors.indexOf(editor);
        index !== -1 && this.editors.splice(index, 1);
    };

    resizeEditor() {
        this.editors.forEach(editor => editor.layout());
    }

    onWindowResizeQueueEditorResize = () => {
        this.resizeTimeout && window.clearTimeout(this.resizeTimeout);
        this.resizeTimeout = window.setTimeout(this.resizeEditor.bind(this), RESIZE_TIMEOUT);
    }
}

export default new MonacoResizer();

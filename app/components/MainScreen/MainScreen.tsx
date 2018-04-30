import * as React from 'react';
// import {Link} from 'react-router-dom';

import Toggle from '../Toggle/index';
import Image from '../Image/index';
import ImageCrop from '../ImageCrop/index';
import {Icon, Button, Menu, Dropdown} from 'antd';
import {pythonModelCode, pythonViewCode, samplePythonBase64Graph} from "./MainScreen.mock";
import StatusBar from '../StatusBar/index';
import SideBar from '../SideBar/index';
import MonacoEditor, {MonacoDiffEditor} from 'react-monaco-editor';
import MonacoResizer from "../../utils/MonacoResizer";
import Markdown from '../Markdown/index';
import UserHighlight from '@components/UserHighlight';
import Link from '@components/Link';
import Notification from '@components/Notification';

const defaultEditorOptions = {
    autoIndent: true,
    fontFamily: 'Inconsolata'
};

// import {remote} from 'electron';

const styles = require('./MainScreen.scss');

interface HomeState {
    toggleValue: boolean;
    showImports: boolean;
    verboseMode: boolean;
    count: number;
    monacoResizer: MonacoResizer,
    markdownText: string
}

export default class MainScreen extends React.Component<{}, HomeState> {
    constructor(props: any) {
        super(props);
        this.state = {
            toggleValue: false,
            count: 0,
            showImports: true,
            verboseMode: true,
            monacoResizer: new MonacoResizer(),
            markdownText: ''
        };
    }

    renderMenu() {
        return (
            <Menu>
                <Menu.Item>Open file</Menu.Item>
                <Menu.Item>Settings</Menu.Item>
                <Menu.Item>About</Menu.Item>
            </Menu>
        );
    }

    onMdEditorChange(value: string) {
        this.state.markdownText !== value && this.setState({
            ...this.state,
            markdownText: value
        })
    }

    render() {
        return (
            <div className={styles.mainScreen}>
                <SideBar className={styles.sideBar}/>
                <div className={`container-fluid ${styles.container}`}>
                    <div className={`row ${styles.container}`}>

                        <div className={'col-4'}>
                            <div className={styles.sectionTopBar}>
                                <div>
                                    <div>
                                        <div>View</div>
                                        <div style={{fontSize: '75%'}}>
                                            <span>views/hotmill-1/view.py</span><span
                                            style={{color: '#aaa'}}>@41da38a</span> by
                                            {' '}
                                            <UserHighlight name={'flaff'} placement={'bottom'}>
                                                <Link>flaff</Link>
                                            </UserHighlight>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Notification buttonIcon={'fork'} buttonText={'Fork'} type={'warning'}>
                                <span><b>Warning!</b> This view is read-only.</span>
                            </Notification>
                            <MonacoEditor
                                value={pythonViewCode}
                                theme={'xcode'}
                                language={'python'}
                                editorDidMount={this.state.monacoResizer.addEditor}
                                options={defaultEditorOptions}
                            />
                        </div>

                        <div className={'col-4'}>
                            <div className={styles.sectionTopBar}>
                                <div>
                                    <div>
                                        <div>Model</div>
                                        <div style={{fontSize: '75%'}}>
                                            <span>models/hotmill-1/model.py</span><span
                                            style={{color: '#aaa'}}>@cc832eb</span> by
                                            {' '}
                                            <UserHighlight name={'homer'} placement={'bottom'}>
                                                <Link>homer</Link>
                                            </UserHighlight>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <MonacoEditor
                                language={'python'}
                                // original={pythonModelWithTypoCode}
                                theme={'xcode'}
                                options={defaultEditorOptions}
                                value={pythonModelCode}
                                editorDidMount={this.state.monacoResizer.addEditor}
                            />
                        </div>

                        <div className={'col-3'}>
                            <div>Visualization</div>
                            <MonacoEditor
                                language={'markdown'}
                                theme={'xcode'}
                                onChange={this.onMdEditorChange.bind(this)}
                                editorDidMount={this.state.monacoResizer.addEditor}
                                height={'50%'}
                                options={defaultEditorOptions}
                            />
                            <Markdown source={this.state.markdownText}/>
                            {/*<ImageCrop width={5} height={5}>*/}
                            {/*<Image base64={samplePythonBase64Graph}/>*/}
                            {/*</ImageCrop>*/}
                        </div>
                    </div>
                </div>

                <div className={`container-fluid ${styles.bottomBar}`}>
                    <div className={`row ${styles.bottomBarRow}`}>
                        <div className={`col-1 ${styles.leftSidebar}`}>{' '}</div>
                        <div className={'col-11'}>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


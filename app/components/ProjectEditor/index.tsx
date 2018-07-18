import * as React from 'react';
import {connect} from 'react-redux';
import {Tabs, Button, notification, Menu, Icon} from 'antd';
import {MarkdownIcon} from 'react-octicons';
import * as FontAwesome from 'react-fontawesome';

import {StoreState} from '@state';
import {Column, Row, ContainerFluid} from '@components/Bootstrap';
import CodeEditor from '@components/CodeEditor';
import classNames = require('classnames');
import {RepositoryType} from '@state/types/projectCreation';
import {SelectParam} from 'antd/es/menu';
import {
    modifyModelFile,
    modifyViewFile, modifyVisualizationFile, sandboxAndRun
} from '@state/actions/projectEdition';
import Markdown from '@components/Markdown';

const styles = require('./styles.scss');

type EditorProps = ReturnType<typeof stateToProps> & ReturnType<typeof dispatchToProps>;
type EditorPassedProps = {};

type EditorState = {
    currentRepo: string;
    currentFile: string;
    currentFileType: string;
    bottomDrawerOpen: boolean;
};

type RepositoryMenuProps = {
    repoType: string;
    repoName: string;
};

const
    extensionToFileType = {
        'py': 'python',
        'md': 'markdown',
        'txt': 'text'
    },

    fileTypeToIcon = (fileType: string) => {
        switch (fileType) {
            case 'python':
                return (<FontAwesome name={'python'} />);
            case 'markdown':
                return <MarkdownIcon />;
            default:
                return (<div />);
        }
    },

    capitalizeFirst = (string: string) => string[0].toUpperCase() + string.substr(1).toLowerCase(),

    RepositoryMenu = (props: RepositoryMenuProps) => (
        <Menu.SubMenu key={props.repoType} title={<div>
            <div>{capitalizeFirst(props.repoType)}</div>
            <div className={styles.secondary}>{props.repoName}</div>
        </div>}>
            <Menu.Item key={`${props.repoType}/${props.repoType}.py`}>
                <div>Source</div>
                <div className={styles.secondary}>{props.repoType}.py</div>
            </Menu.Item>
            <Menu.Item key={`${props.repoType}/README.md`}>
                <div>Description</div>
                <div className={styles.secondary}>README.md</div>
            </Menu.Item>
            <Menu.Item key={`${props.repoType}/short-desc.txt`}>
                <div>Short description</div>
                <div className={styles.secondary}>short-desc.txt</div>
            </Menu.Item>
        </Menu.SubMenu>
    );

class ProjectEditor extends React.Component<EditorProps, EditorState> {
    constructor(props) {
        super(props);

        this.state = {
            currentFile: 'view.py',
            currentRepo: 'view',
            currentFileType: 'python',
            bottomDrawerOpen: false
        };

        this.onRepoTabClick = this.onRepoTabClick.bind(this);
        this.renderView = this.renderView.bind(this);
        this.renderModel = this.renderModel.bind(this);
        this.renderVisualization = this.renderVisualization.bind(this);
        this.renderEditor = this.renderEditor.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
        this.onRunClick = this.onRunClick.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.setDrawerVisibility = this.setDrawerVisibility.bind(this);
        this.parseTextOutput = this.parseTextOutput.bind(this);
    }

    renderEditors() {
        return (
            <div>
                Hello
            </div>
        )
    }

    renderView() {
        return (
            <CodeEditor/>
        )
    }

    renderModel() {
        return this.renderEditors();
    }

    renderVisualization() {
        return this.renderEditors();
    }

    onRepoTabClick(tabKey: SelectParam) {
        const
            [currentRepo, currentFile] = tabKey.key.split('/'),
            currentFileType = extensionToFileType[currentFile.split('.')[1]];

        setTimeout(() => CodeEditor.resize(), 300);

        this.setState({
            ...this.state,
            currentRepo,
            currentFile,
            currentFileType
        });
    }

    onEditorChange(value: string) {
        this.modifyCurrentFileContent(value);
    }

    modifyCurrentFileContent(content: string) {
        const file = {
            name: this.state.currentFile,
            content
        };

        switch (this.state.currentRepo) {
            default:
            case 'view':
                return this.props.modifyViewFile(file);
            case 'model':
                return this.props.modifyModelFile(file);
            case 'visualization':
                return this.props.modifyVisualizationFile(file);
        }
    }

    getCurrentFileContent() {
        switch (this.state.currentRepo) {
            default:
            case 'view':
                return this.props.view.files[this.state.currentFile].content;
            case 'model':
                return this.props.model.files[this.state.currentFile].content;
            case 'visualization':
                return this.props.visualization.files[this.state.currentFile].content;
        }
    }

    renderEditor() {
        return (
            <CodeEditor value={this.getCurrentFileContent()} language={this.state.currentFileType}
                        onChange={this.onEditorChange}/>
        )
    }

    toggleDrawer() {
        this.setDrawerVisibility(!this.state.bottomDrawerOpen);
    }

    setDrawerVisibility(visible: boolean) {
        this.setState({
            ...this.state,
            bottomDrawerOpen: visible
        });
    }

    parseTextOutput(text: string) {
        return {
            __html: text
                .replace(/(\r\n)/g, '\n')
                .replace(/(\n)/g, '<br>')
        }
    }

    onRunClick() {
        this.setDrawerVisibility(true);

        this.props.sandboxAndRun({
            view: this.props.view.files['view.py'].content,
            model: this.props.model.files['model.py'].content,
            visualization: this.props.visualization.files['visualization.py'].content,
        });
    }

    render() {
        return (
            <div className={'fullHeight flexVertical'}>
                <div className={styles.topBar}>
                    <div className={styles.projectName}>
                        {this.props.projectName} <span className={styles.repositoryType}>.project</span>
                    </div>
                    <div className={styles.topBarIcons}>
                        {!this.props.running && <div className={styles.topBarIcon} style={{color: 'var(--green)'}} onClick={this.onRunClick}>
                            <Icon type="caret-right" /> Run
                        </div>}
                        {this.props.running && <div className={styles.topBarIcon} style={{color: 'var(--red)'}} onClick={this.onRunClick}>
                            <Icon type="loading" /> Stop
                        </div>}
                        <div className={styles.topBarIcon}>
                            <Icon type="arrow-up" /> Publish
                        </div>
                        <div className={styles.topBarIcon}>
                            <Icon type="rollback" /> Revert
                        </div>
                    </div>
                    <div className={'avatarPlaceholder'} />
                </div>
                <ContainerFluid className={'flexGrow flexVertical'}>
                    <Row className={'flexGrow'}>
                        <Column size={3}>
                            <Menu className={classNames(styles.repositoryTabs, 'fullHeight')} mode={'inline'}
                                  defaultSelectedKeys={[`${this.state.currentRepo}/${this.state.currentFile}`]}
                                  defaultOpenKeys={['view', 'model', 'visualization']} onSelect={this.onRepoTabClick}>
                                {RepositoryMenu({repoName: this.props.viewName, repoType: 'view'})}
                                {RepositoryMenu({repoName: this.props.modelName, repoType: 'model'})}
                                {RepositoryMenu({repoName: this.props.visualizationName, repoType: 'visualization'})}
                            </Menu>
                            <div>

                            </div>
                        </Column>
                        <Column size={this.state.currentFileType !== 'markdown' ? 9 : 5}>
                            {this.renderEditor()}
                        </Column>
                        {this.state.currentFileType === 'markdown' && <Column size={4}>
                            <Markdown source={this.getCurrentFileContent()}/>
                        </Column>}
                    </Row>
                </ContainerFluid>
                <div className={styles.bottomBar}>
                    <div className={styles.bottomBarFileType}>
                        {capitalizeFirst(this.state.currentFileType)} {fileTypeToIcon(this.state.currentFileType)}
                    </div>
                    <div className={'flex'}>
                        <div className={styles.toggleBottomDrawer} onClick={this.toggleDrawer}>
                            <Icon type={this.state.bottomDrawerOpen ? 'down' : 'up'} /> Results
                        </div>
                        {!this.props.running && !this.props.error && (
                            <div style={{color: 'var(--green)'}}>Ready <Icon type="check-circle"/></div>
                        )}
                        {this.props.error && (
                            <div style={{color: 'var(--red)'}}>Error <Icon type="close-circle"/></div>
                        )}
                        {this.props.running && (
                            <div style={{color: 'var(--yellow)'}}>Running <Icon type="clock-circle"/></div>
                        )}
                    </div>
                </div>
                <div className={classNames(styles.bottomDrawer, {[styles.open]: this.state.bottomDrawerOpen})}>
                    <div className={styles.hideBottomDrawer} onClick={this.toggleDrawer}><Icon type="down" /> Hide</div>
                    {this.props.error && (
                        <div className={styles.errorDisplay}>
                            {this.props.error}
                        </div>
                    )}
                    {this.props.results && (
                        <div className={styles.resultsDisplay} dangerouslySetInnerHTML={this.parseTextOutput(this.props.results)} />
                    )}
                </div>
            </div>
        )
    }
}

const
    stateToProps = (state: StoreState, passedProps: EditorPassedProps) => ({
        projectAuthor: state.routing.location && state.routing.location.pathname.toString().split('/')[2],
        projectName: state.routing.location && state.routing.location.pathname.toString().split('/')[3],
        viewName: 'flaff/test.view',

        view: state.projectEdition.project.view.current,
        viewHead: state.projectEdition.project.view.head,

        model: state.projectEdition.project.model.current,
        modelHead: state.projectEdition.project.model.head,

        visualization: state.projectEdition.project.visualization.current,
        visualizationHead: state.projectEdition.project.visualization.head,

        modelName: 'flaff/test.model',
        visualizationName: 'flaff/test.visualization',

        error: state.projectEdition.error,
        results: state.projectEdition.results,
        running: state.projectEdition.running
    }),

    dispatchToProps = (dispatch) => ({
        modifyViewFile: modifyViewFile(dispatch),
        modifyModelFile: modifyModelFile(dispatch),
        modifyVisualizationFile: modifyVisualizationFile(dispatch),
        sandboxAndRun: sandboxAndRun(dispatch)
    });

export default connect(stateToProps, dispatchToProps)(ProjectEditor);


import * as React from 'react';
import {connect} from 'react-redux';
import {Tabs, Button, notification, Menu} from 'antd';
import {MarkdownIcon} from 'react-octicons';
import FontAwesome from 'react-fontawesome'

import {StoreState} from '@state';
import {Column, Row, ContainerFluid} from '@components/Bootstrap';
import CodeEditor from '@components/CodeEditor';
import classNames = require('classnames');
import {RepositoryType} from '@state/types/projectCreation';
import {SelectParam} from 'antd/es/menu';
import {
    modifyModelFile,
    modifyViewFile, modifyVisualizationFile
} from '@state/actions/projectEdition';
import Markdown from '@components/Markdown';

const styles = require('./styles.scss');

type EditorProps = ReturnType<typeof stateToProps> & ReturnType<typeof dispatchToProps>;
type EditorPassedProps = {};

type EditorState = {
    currentRepo: string;
    currentFile: string;
    currentFileType: string;
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
            currentFileType: 'python'
        };

        this.onRepoTabClick = this.onRepoTabClick.bind(this);
        this.renderView = this.renderView.bind(this);
        this.renderModel = this.renderModel.bind(this);
        this.renderVisualization = this.renderVisualization.bind(this);
        this.renderEditor = this.renderEditor.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
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

    render() {
        return (
            <div className={'fullHeight flexVertical'}>
                <div>
                    <span className={styles.projectName}>
                        {this.props.projectName} <span className={styles.repositoryType}>.project</span>
                    </span>
                </div>
                <ContainerFluid className={'flexGrow flexVertical'}>
                    <Row className={'flexGrow'}>
                        <Column size={2}>
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
                        <Column size={1}/>
                    </Row>
                </ContainerFluid>
                <div>
                    <MarkdownIcon/>
                    <Button onClick={() => notification.error({
                        message: 'Error',
                        description: 'an error occured',
                        duration: 0,
                        placement: 'bottomRight'
                    })}>Error</Button>
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
        visualizationName: 'flaff/test.visualization'
    }),

    dispatchToProps = (dispatch) => ({
        modifyViewFile: modifyViewFile(dispatch),
        modifyModelFile: modifyModelFile(dispatch),
        modifyVisualizationFile: modifyVisualizationFile(dispatch)
    });

export default connect(stateToProps, dispatchToProps)(ProjectEditor);


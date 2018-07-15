import * as React from 'react';
import {connect} from 'react-redux';
import {Tabs, Button, notification, Menu} from 'antd';
import {MarkdownIcon} from 'react-octicons';
import FontAwesome from 'react-fontawesome'

import {StoreState} from '@state';
import {Column, Row, ContainerFluid} from '@components/Bootstrap';
import CodeEditor from '@components/CodeEditor';
import classNames = require('classnames');

const styles = require('./styles.scss');

type EditorProps = ReturnType<typeof stateToProps> & ReturnType<typeof dispatchToProps>;
type EditorPassedProps = {};

type EditorState = {
    currentRepoTab: string;
};

type RepositoryMenuProps = {
    repoType: string;
    repoName: string;
};

const
    capitalizeFirst = (string: string) => string[0].toUpperCase() + string.substr(1).toLowerCase(),

    RepositoryMenu = (props: RepositoryMenuProps) => (
        <Menu.SubMenu key={props.repoType} title={<div>
            <div>{capitalizeFirst(props.repoType)}</div>
            <div className={styles.secondary}>{props.repoName}</div>
        </div>}>
            <Menu.Item>
                <div>Source</div>
                <div className={styles.secondary}>{props.repoType}.py</div>
            </Menu.Item>
            <Menu.Item>
                <div>Description</div>
                <div className={styles.secondary}>README.md</div>
            </Menu.Item>
            <Menu.Item>
                <div>Short description</div>
                <div className={styles.secondary}>short-desc.txt</div>
            </Menu.Item>
        </Menu.SubMenu>
    );

class ProjectEditor extends React.Component<EditorProps, EditorState> {
    constructor(props) {
        super(props);

        this.state = {
            currentRepoTab: 'view'
        };

        this.onRepoTabClick = this.onRepoTabClick.bind(this);
        this.renderView = this.renderView.bind(this);
        this.renderModel = this.renderModel.bind(this);
        this.renderVisualization = this.renderVisualization.bind(this);
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

    onRepoTabClick(tabKey: string) {
        this.setState({
            ...this.state,
            currentRepoTab: tabKey
        });
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
                                  defaultOpenKeys={['view', 'model', 'visualization']}>
                                {RepositoryMenu({repoName: this.props.viewName, repoType: 'view'})}
                                {RepositoryMenu({repoName: this.props.modelName, repoType: 'model'})}
                                {RepositoryMenu({repoName: this.props.visualizationName, repoType: 'visualization'})}
                            </Menu>
                            <div>

                            </div>
                        </Column>
                        <Column size={9}>
                            <CodeEditor/>
                        </Column>
                        <Column size={1} />
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
        modelName: 'flaff/test.model',
        visualizationName: 'flaff/test.visualization'
    }),

    dispatchToProps = (dispatch) => ({});

export default connect(stateToProps, dispatchToProps)(ProjectEditor);


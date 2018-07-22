import * as React from 'react';
import * as classNames from 'classnames';
import * as moment from 'moment';
import {Button, Input, Switch, Timeline} from 'antd';
import {Row, Column} from '@components/Bootstrap';
import {ChangeEvent} from 'react';
import {GenericStepResult, ProjectStepResult} from '@components/ProjectCreation/GenericStep';
import {connect} from 'react-redux';
import {StoreState} from '@state';
import {createAndPushRepository} from '@state/actions/projectCreation';
import {RepositoryType, StepTimelineItem} from '@state/types/projectCreation';
import {Link} from 'react-router-dom';
const styles = require('./styles.scss');

export interface SummaryStepResult {
}

interface SummaryStepPassedProps {
    onNextStep: (p: SummaryStepResult) => void;
    className?: string;
    projectResult: ProjectStepResult;
    viewResult: GenericStepResult;
    modelResult: GenericStepResult;
    visualizationResult: GenericStepResult;
}

type SummaryStepProps = ReturnType<typeof stateToProps> & ReturnType<typeof dispatchToProps>;

interface SummaryStepState {
    publishing: boolean;
    published: boolean;
}

const
    Field = (props: { name: string, value: string }) => (
        <div className={'mb-2'}>
            <div className={'smallText'}>{props.name}</div>
            <div>{props.value}</div>
        </div>
    ),

    StepSummary = (props: { name: string, result: GenericStepResult | ProjectStepResult }) => (
        <div className={'mb-5'}>
            <h5>{props.name}</h5>
            <Field name={'Title'} value={props.result.title}/>
            <Field name={'Short description'} value={props.result.shortDescription || 'None'}/>
            <Field name={'Detailed description'} value={props.result.detailedDescription ? 'Provided' : 'None'}/>
        </div>
    ),

    StepTimeline = (props: { name: string, finishedSteps: Array<StepTimelineItem>, pendingStep?: StepTimelineItem, failedStep?: StepTimelineItem }) => (
        <div className={'mb-5'}>
            <h5 className={'mb-4'}>{props.name}</h5>
            <Timeline pending={props.pendingStep && props.pendingStep.title}>
                {
                    props.finishedSteps.map((step) =>
                        <Timeline.Item color={'green'}>
                            {step.title}
                            {step.secondary && <div className={styles.secondaryStepDesc}>{step.secondary}</div>}
                        </Timeline.Item>
                    )
                }
                {props.failedStep && <Timeline.Item color={'red'}>
                    {props.failedStep.title}
                    {props.failedStep.secondary && <div className={styles.secondaryStepDesc}>{props.failedStep.secondary}</div>}
                </Timeline.Item>}
            </Timeline>
        </div>
    );


class SummaryStep extends React.Component<SummaryStepProps, SummaryStepState> {
    constructor(props) {
        super(props);
        this.state = {
            publishing: false,
            published: false
        };

        this.onCreateClick = this.onCreateClick.bind(this);
        this.isPublished = this.isPublished.bind(this);
    }

    publishProject(result: ProjectStepResult) {
        const type = 'PROJECT';
        this.props.createAndPushRepository({
            user: {
                name: this.props.userName,
                email: this.props.userMail,
            },
            repository: {
                type,
                address: 'http://localhost:7617',
                name: `${this.props.userName}/${result.title}.${type.toLowerCase()}`,
                author: this.props.userName,
                files: {
                    ['README.md']: {
                        name: 'README.md',
                        content: result.detailedDescription
                    },
                    ['short_desc.txt']: {
                        name: 'short_desc.txt',
                        content: result.shortDescription
                    },
                    [`${type.toLowerCase()}.json`]: {
                        name: `${type.toLowerCase()}.json`,
                        content: JSON.stringify({
                            viewName: `${this.props.userName}/${this.props.viewResult.title}.view`,
                            modelName: `${this.props.userName}/${this.props.modelResult.title}.model`,
                            visualizationName: `${this.props.userName}/${this.props.visualizationResult.title}.visualization`
                        })
                    }
                }
            }
        });
    }

    publish(result: GenericStepResult, type: RepositoryType) {
        this.props.createAndPushRepository({
            user: {
                name: this.props.userName,
                email: this.props.userMail,
            },
            repository: {
                type,
                address: 'http://localhost:7617',
                name: `${this.props.userName}/${result.title}.${type.toLowerCase()}`,
                author: this.props.userName,
                files: {
                    ['README.md']: {
                        name: 'README.md',
                        content: result.detailedDescription
                    },
                    ['short_desc.txt']: {
                        name: 'short_desc.txt',
                        content: result.shortDescription
                    },
                    [`${type.toLowerCase()}.py`]: {
                        name: `${type.toLowerCase()}.py`,
                        content: `# ${type.toLowerCase()} created ${moment().format('HH:mm DD.MM.YYYY')}\n\n`
                    }
                }
            }
        })
    }

    isPublished() {
        return this.props.projectTimeline.finishedSteps.length >= 7
            && this.props.viewTimeline.finishedSteps.length >= 7
            && this.props.modelTimeline.finishedSteps.length >= 7
            && this.props.visualizationTimeline.finishedSteps.length >= 7;
    }

    onCreateClick() {
        this.setState({
            ...this.state,
            publishing: true
        });

        this.publish(this.props.viewResult, 'VIEW');
        this.publish(this.props.modelResult, 'MODEL');
        this.publish(this.props.visualizationResult, 'VISUALIZATION');
        this.publishProject(this.props.projectResult);
    }

    render() {
        return this.state.publishing ? (
            <Row className={classNames(this.props.className, 'mt-5')}>
                <Column size={1}/>
                <Column className={'d-flex flex-column'}>
                    <StepTimeline name={'Project'}
                                  finishedSteps={this.props.projectTimeline.finishedSteps}
                                  pendingStep={this.props.projectTimeline.pendingStep}
                                  failedStep={this.props.projectTimeline.failedStep}
                    />
                </Column>
                <Column className={'d-flex flex-column'}>
                    <StepTimeline name={'View'}
                                  finishedSteps={this.props.viewTimeline.finishedSteps}
                                  pendingStep={this.props.viewTimeline.pendingStep}
                                  failedStep={this.props.viewTimeline.failedStep}
                    />
                </Column>
                <Column className={'d-flex flex-column'}>
                    <StepTimeline name={'Model'}
                                  finishedSteps={this.props.modelTimeline.finishedSteps}
                                  pendingStep={this.props.modelTimeline.pendingStep}
                                  failedStep={this.props.modelTimeline.failedStep}
                    />
                </Column>
                <Column className={'d-flex flex-column'}>
                    <StepTimeline name={'Visualization'}
                                  finishedSteps={this.props.visualizationTimeline.finishedSteps}
                                  pendingStep={this.props.visualizationTimeline.pendingStep}
                                  failedStep={this.props.visualizationTimeline.failedStep}
                    />
                </Column>
                <Column size={1}/>
                <Column size={12} className={'ta-c'}>
                    {this.isPublished() &&
                        <Link to={`project/${this.props.userName}/${this.props.projectResult.title}.project`}>
                            <Button size={'large'}>Continue</Button>
                        </Link>}
                </Column>
            </Row>
        ) : (
            <Row className={classNames(this.props.className, 'mt-5')}>
                <Column size={2}/>
                <Column className={'d-flex flex-column'} size={3}>
                    <StepSummary name={'Project'} result={this.props.projectResult}/>
                    <StepSummary name={'View'} result={this.props.viewResult}/>
                </Column>
                <Column size={2}/>
                <Column className={'d-flex flex-column'} size={3}>
                    <StepSummary name={'Model'} result={this.props.modelResult}/>
                    <StepSummary name={'Visualization'} result={this.props.visualizationResult}/>
                </Column>
                <Column size={2}/>
                <Column size={12} className={'ta-c'}>
                    <Button onClick={this.onCreateClick} size={'large'}>Create</Button>
                </Column>
            </Row>
        )
    }
}

const
    stateToProps = (state: StoreState, ownProps: SummaryStepPassedProps) => ({
        projectTimeline: state.projectCreation.projectTimeline,
        viewTimeline: state.projectCreation.viewTimeline,
        modelTimeline: state.projectCreation.modelTimeline,
        visualizationTimeline: state.projectCreation.visualizationTimeline,
        onNextStep: ownProps.onNextStep,
        className: ownProps.className,
        projectResult: ownProps.projectResult,
        viewResult: ownProps.viewResult,
        modelResult: ownProps.modelResult,
        visualizationResult: ownProps.visualizationResult,
        userName: state.auth.name,
        userMail: `${state.auth.name}@mail.com`
    }),

    dispatchToProps = (dispatch) => ({
        createAndPushRepository: createAndPushRepository
    });

export default connect(stateToProps, dispatchToProps)(SummaryStep) as any;

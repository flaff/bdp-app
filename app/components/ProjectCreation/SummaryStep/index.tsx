import * as React from 'react';
import * as classNames from 'classnames';
import * as moment from 'moment';
import {Button, Input, Switch, Timeline} from 'antd';
import {Row, Column} from '@components/Bootstrap';
import {ChangeEvent} from 'react';
import {GenericStepResult} from '@components/ProjectCreation/GenericStep';
import {ProjectStepResult} from '@components/ProjectCreation/ProjectStep';
import {connect} from 'react-redux';
import {StoreState} from '@state';
import {createAndPushRepository} from '@state/actions/projectCreation';

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
    creating: boolean;
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

    StepTimeline = (props: { name: string, finishedSteps: Array<string>, pendingStep?: string, failedStep?: string }) => (
        <div className={'mb-5'}>
            <h5 className={'mb-4'}>{props.name}</h5>
            <Timeline pending={props.pendingStep}>
                {props.finishedSteps.map((step) => <Timeline.Item color={'green'}>{step}</Timeline.Item>)}
                {props.failedStep && <Timeline.Item color={'red'}>{props.failedStep}</Timeline.Item>}
            </Timeline>
        </div>
    );


class SummaryStep extends React.Component<SummaryStepProps, SummaryStepState> {
    constructor(props) {
        super(props);
        this.state = {
            creating: false
        };

        this.onCreateClick = this.onCreateClick.bind(this);
    }

    onCreateClick() {
        this.setState({
            ...this.state,
            creating: true
        });
        this.props.createAndPushRepository({
            user: {
                name: this.props.userName,
                email: this.props.userMail,
            },
            repository: {
                type: 'VIEW',
                address: 'http://localhost:7617',
                name: `${this.props.userName}/view/${this.props.viewResult.title}`,
                files: [
                    {
                        name: 'README.md',
                        content: this.props.viewResult.detailedDescription
                    },
                    {
                        name: 'view.py',
                        content: '# created ' + moment().format('HH:mm DD.MM.YYYY') + '\n' + 'import pandas as pd\nimport numpy as np'
                    }
                ]
            }
        })
    }

    render() {
        return this.state.creating ? (
            <Row className={classNames(this.props.className, 'mt-5')}>
                <Column size={2}/>
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
                <Column size={2}/>
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

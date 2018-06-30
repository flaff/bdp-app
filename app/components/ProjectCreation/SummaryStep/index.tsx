import * as React from 'react';
import * as classNames from 'classnames';
import {Button, Input, Switch, Timeline} from 'antd';
import {Row, Column} from '@components/Bootstrap';
import {ChangeEvent} from 'react';
import {GenericStepResult} from '@components/ProjectCreation/GenericStep';
import {ProjectStepResult} from '@components/ProjectCreation/ProjectStep';

export interface SummaryStepResult {
}

interface SummaryStepProps {
    onNextStep: (p: SummaryStepResult) => void;
    className?: string;
    projectResult: ProjectStepResult;
    viewResult: GenericStepResult;
    modelResult: GenericStepResult;
    visualizationResult: GenericStepResult;
}

interface StepTimeline {
    pendingStep?: string;
    failedStep?: string;
    finishedSteps: Array<string>;
}

interface SummaryStepState {
    creating: boolean;
    projectTimeline: StepTimeline;
    viewTimeline: StepTimeline;
    modelTimeline: StepTimeline;
    visualizationTimeline: StepTimeline;
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

    StepTimeline = (props: {name: string, finishedSteps: Array<string>, pendingStep?: string, failedStep?: string}) => (
        <div className={'mb-5'}>
            <h5 className={'mb-4'}>{props.name}</h5>
            <Timeline pending={props.pendingStep}>
                {props.finishedSteps.map((step) => <Timeline.Item color={'green'}>{step}</Timeline.Item>)}
                {props.failedStep && <Timeline.Item color={'red'}>{props.failedStep}</Timeline.Item>}
            </Timeline>
        </div>
    ),

    mockPendingTimeline: StepTimeline = {
        finishedSteps: [
            'Create folder',
            'Initialize repository',
            'Create files',
            'Add files',
            'Commit files'
        ],
        pendingStep: 'Push files'
    },

    mockPending2Timeline: StepTimeline = {
        finishedSteps: [
            'Create folder',
            'Initialize repository'
        ],
        pendingStep: 'Create files'
    },


    mockFailedTimeline: StepTimeline = {
        finishedSteps: [
            'Create folder',
            'Initialize repository'
        ],
        failedStep: 'Create files'
    },

    mockFinishedTimeline: StepTimeline = {
        finishedSteps: [
            'Create folder',
            'Initialize repository',
            'Create files',
            'Add files',
            'Commit files',
            'Push files'
        ]
    };


    export default class SummaryStep extends React.Component<SummaryStepProps, SummaryStepState> {
    constructor(props) {
        super(props);
        this.state = {
            creating: false,
            projectTimeline: mockPendingTimeline,
            viewTimeline: mockFailedTimeline,
            modelTimeline: mockFinishedTimeline,
            visualizationTimeline: mockPending2Timeline
        };
    }

    render() {
        return this.state.creating ? (
            <Row className={classNames(this.props.className, 'mt-5')}>
                <Column size={2}/>
                <Column className={'d-flex flex-column'}>
                    <StepTimeline name={'Project'}
                                  finishedSteps={this.state.projectTimeline.finishedSteps}
                                  pendingStep={this.state.projectTimeline.pendingStep}
                                  failedStep={this.state.projectTimeline.failedStep}
                    />
                </Column>
                <Column className={'d-flex flex-column'}>
                    <StepTimeline name={'View'}
                                  finishedSteps={this.state.viewTimeline.finishedSteps}
                                  pendingStep={this.state.viewTimeline.pendingStep}
                                  failedStep={this.state.viewTimeline.failedStep}
                    />
                </Column>
                <Column className={'d-flex flex-column'}>
                    <StepTimeline name={'Model'}
                                  finishedSteps={this.state.modelTimeline.finishedSteps}
                                  pendingStep={this.state.modelTimeline.pendingStep}
                                  failedStep={this.state.modelTimeline.failedStep}
                    />
                </Column>
                <Column className={'d-flex flex-column'}>
                    <StepTimeline name={'Visualization'}
                                  finishedSteps={this.state.visualizationTimeline.finishedSteps}
                                  pendingStep={this.state.visualizationTimeline.pendingStep}
                                  failedStep={this.state.visualizationTimeline.failedStep}
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
            </Row>
        )
    }
}

import * as React from 'react';
import GenericStep, {GenericStepResult, ProjectStepResult} from '@components/ProjectCreation/GenericStep';
import * as classNames from 'classnames';
import {Steps} from 'antd';
import {Column, ContainerFluid, Row} from '@components/Bootstrap';
import {RepoType} from '@components/ProjectCreation/consts';
import SummaryStep from '@components/ProjectCreation/SummaryStep';
import GenericPickerDialog from '@components/GenericPickerDialog';


const Step = Steps.Step;

interface ProjectCreationState {
    currentStep: number;
    project: ProjectStepResult;
    view: GenericStepResult;
    model: GenericStepResult;
    visualization: GenericStepResult;
}

const
    emptyProjectState: ProjectStepResult = {
        title: '',
        shortDescription: '',
        detailedDescription: '### %TITLE% `.%TYPE%`\n%SHORT_DESCRIPTION%\n\n#### Detailed description\n'
    },

    emptyGenericStepState: GenericStepResult = {
        title: '',
        shortDescription: '',
        detailedDescription: '### %TITLE% `.%TYPE%`\n%SHORT_DESCRIPTION%\n\n#### Detailed description\n',
        existingViewSource: '',
        useExistingView: false
    };

export default class ProjectCreation extends React.Component<{}, ProjectCreationState> {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
            project: {...emptyProjectState},
            view: {...emptyGenericStepState},
            model: {...emptyGenericStepState},
            visualization: {...emptyGenericStepState}
        };
        this.onProjectStepFinish = this.onProjectStepFinish.bind(this);
        this.onViewStepFinish = this.onViewStepFinish.bind(this);
        this.onModelStepFinish = this.onModelStepFinish.bind(this);
        this.onVisualizationStepFinish = this.onVisualizationStepFinish.bind(this);
        this.onSummaryStepFinish = this.onSummaryStepFinish.bind(this);
        this.changeStep = this.changeStep.bind(this);
        this.changeStepToProject = this.changeStepToProject.bind(this);
        this.changeStepToView = this.changeStepToView.bind(this);
        this.changeStepToModel = this.changeStepToModel.bind(this);
        this.changeStepToVisualization = this.changeStepToVisualization.bind(this);
        this.changeStepToSummary = this.changeStepToSummary.bind(this);
    }

    onProjectStepFinish(projectStepResult: ProjectStepResult) {
        this.setState({
            ...this.state,
            currentStep: this.state.currentStep + 1,
            project: projectStepResult
        })
    }

    onViewStepFinish(viewStepResult: GenericStepResult) {
        this.setState({
            ...this.state,
            currentStep: this.state.currentStep + 1,
            view: viewStepResult
        })
    }

    onModelStepFinish(modelStepResult: GenericStepResult) {
        this.setState({
            ...this.state,
            currentStep: this.state.currentStep + 1,
            model: modelStepResult
        })
    }

    onVisualizationStepFinish(visualizationStepResult: GenericStepResult) {
        this.setState({
            ...this.state,
            currentStep: this.state.currentStep + 1,
            visualization: visualizationStepResult
        });
    }

    onSummaryStepFinish() {}

    changeStep(step: number) {
        this.setState({
            ...this.state,
            currentStep: step
        })
    }

    changeStepToProject() {
        this.changeStep(0);
    }

    changeStepToView() {
        this.changeStep(1);
    }

    changeStepToModel() {
        this.changeStep(2);
    }

    changeStepToVisualization() {
        this.changeStep(3);
    }

    changeStepToSummary() {
        this.changeStep(4);
    }

    render() {
        return (
            <div className={classNames('fullHeight')}>
                <ContainerFluid className={'fullHeight d-flex flex-column'}>
                    <Row className={'spaceAbove'}>
                        <Column size={1}/>
                        <Column>
                            <Steps current={this.state.currentStep}>
                                <Step title="Project" description="Title and details." onClick={this.changeStepToProject} />
                                <Step title="View" description="Which data is used?" onClick={this.changeStepToView} />
                                <Step title="Model" description="How data is used?" onClick={this.changeStepToModel} />
                                <Step title="Visualization" description="How data is presented?" onClick={this.changeStepToVisualization} />
                                <Step title="Summary" onClick={this.changeStepToSummary}/>
                            </Steps>
                        </Column>
                        <Column size={1}/>
                    </Row>
                    {this.state.currentStep === 0 &&
                    <GenericStep onNextStep={this.onProjectStepFinish}
                                 result={this.state.project as GenericStepResult}
                                 type={RepoType.PROJECT}
                                 className={'flex-fill'} />}
                    {this.state.currentStep === 1 &&
                    <GenericStep onNextStep={this.onViewStepFinish}
                                 result={this.state.view}
                                 type={RepoType.VIEW}
                                 className={'flex-fill'} />}
                    {this.state.currentStep === 2 &&
                    <GenericStep onNextStep={this.onModelStepFinish}
                                 result={this.state.model}
                                 type={RepoType.MODEL}
                                 className={'flex-fill'}/>}
                    {this.state.currentStep === 3 &&
                    <GenericStep onNextStep={this.onVisualizationStepFinish}
                                 result={this.state.visualization}
                                 type={RepoType.VISUALIZATION}
                                 className={'flex-fill'}/>}
                    {this.state.currentStep === 4 &&
                    <SummaryStep onNextStep={this.onSummaryStepFinish}
                                 projectResult={this.state.project}
                                 viewResult={this.state.view}
                                 modelResult={this.state.model}
                                 visualizationResult={this.state.visualization}
                    />}
                </ContainerFluid>
            </div>
        )
    }
}
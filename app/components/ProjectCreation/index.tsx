import * as React from 'react';
import ProjectStep, {ProjectStepResult} from '@components/ProjectCreation/ProjectStep';
import GenericStep, {GenericStepResult} from '@components/ProjectCreation/GenericStep';
import * as classNames from 'classnames';
import {Steps} from 'antd';
import {Column, ContainerFluid, Row} from '@components/Bootstrap';
import {RepoType} from '@components/ProjectCreation/consts';
const Step = Steps.Step;

interface ProjectCreationState {
    currentStep: number;
    project?: ProjectStepResult;
    view?: GenericStepResult;
    model?: GenericStepResult;
    visualization?: GenericStepResult;
}

export default class ProjectCreation extends React.Component<{}, ProjectCreationState> {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 1
        };
        this.onProjectStepFinish = this.onProjectStepFinish.bind(this);
        this.onViewStepFinish = this.onViewStepFinish.bind(this);
        this.onModelStepFinish = this.onModelStepFinish.bind(this);
        this.onVisualizationStepFinish = this.onVisualizationStepFinish.bind(this);
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

    render() {
        return (
            <div className={classNames('fullHeight')}>
                <ContainerFluid className={'fullHeight d-flex flex-column'}>
                    <Row className={'spaceAbove'}>
                        <Column>
                            <Steps current={this.state.currentStep}>
                                <Step title="Project" description="Title and details." />
                                <Step title="View" description="Which data is used?" />
                                <Step title="Model" description="How data is used?" />
                                <Step title="Visualization" description="How data is presented?" />
                                <Step title="Summary" />
                            </Steps>
                        </Column>
                    </Row>
                    {this.state.currentStep === 0 && <ProjectStep onNextStep={this.onProjectStepFinish} className={'flex-fill'} />}
                    {this.state.currentStep === 1 && <GenericStep onNextStep={this.onViewStepFinish} type={RepoType.VIEW} className={'flex-fill'} />}
                    {this.state.currentStep === 2 && <GenericStep onNextStep={this.onModelStepFinish} type={RepoType.MODEL} className={'flex-fill'} />}
                    {this.state.currentStep === 3 && <GenericStep onNextStep={this.onVisualizationStepFinish} type={RepoType.VISUALIZATION} className={'flex-fill'} />}
                </ContainerFluid>
            </div>
        )
    }
}
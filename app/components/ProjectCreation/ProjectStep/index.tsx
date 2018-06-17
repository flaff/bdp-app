import * as React from 'react';
import * as classNames from 'classnames';
import {Button, Input} from 'antd';
import {Row, Column} from '@components/Bootstrap';
import Markdown from '@components/Markdown';
import CodeEditor from '@components/CodeEditor';
import Link from '@components/Link';
import {ChangeEvent} from 'react';
import {GenericStepResult} from '@components/ProjectCreation/GenericStep';

export interface ProjectStepResult {
    title: string;
    shortDescription: string;
    detailedDescription: string;
}

interface ProjectStepProps {
    className: string;
    result: ProjectStepResult;
    onNextStep: (p: ProjectStepResult) => void;
}

interface ProjectStepState {
    projectTitle: string;
    projectShortDescription: string;
    projectDetailedDescription: string;
}

const generateExtendedDescription = (title: string, shortDescription: string) => (
`### ${title || 'No title provided'}
${shortDescription || 'No short description provided'}

#### Detailed description
`);

export default class ProjectStep extends React.Component<ProjectStepProps, ProjectStepState> {
    constructor(props) {
        super(props);
        this.state = {
            projectTitle: this.props.result.title,
            projectShortDescription: this.props.result.shortDescription,
            projectDetailedDescription: this.props.result.detailedDescription
        };
        this.onProjectTitleChange = this.onProjectTitleChange.bind(this);
        this.onProjectDetailedDescriptionChange = this.onProjectDetailedDescriptionChange.bind(this);
        this.onProjectShortDescriptionChange = this.onProjectShortDescriptionChange.bind(this);
        this.generateExtendedDescription = this.generateExtendedDescription.bind(this);
    }

    onProjectTitleChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            projectTitle: event.target.value
        });
    }

    onProjectShortDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            projectShortDescription: event.target.value
        });
    }

    onProjectDetailedDescriptionChange(value: string) {
        this.setState({
            ...this.state,
            projectDetailedDescription: value
        });
    };

    generateExtendedDescription() {
        this.setState({
            ...this.state,
            projectDetailedDescription: generateExtendedDescription(this.state.projectTitle, this.state.projectShortDescription)
        })
    }

    createResult(): ProjectStepResult {
        return {
            detailedDescription: this.state.projectDetailedDescription,
            shortDescription: this.state.projectShortDescription,
            title: this.state.projectTitle
        }
    }

    render() {
        return (
            <Row className={classNames(this.props.className)}>
                <Column size={1} />
                <Column className={'d-flex flex-column'}>
                    <div className={'spaceAbove'}>Project title</div>
                    <Input placeholder={'my-project-name'} size={'large'} value={this.state.projectTitle} onChange={this.onProjectTitleChange} />
                    <div className={'smallText'}>Note: only lowercase letters, numbers and hyphens can be used.</div>

                    <div className={'spaceAbove'}>Short description (optional)</div>
                    <Input placeholder={'Short project description'} value={this.state.projectShortDescription} onChange={this.onProjectShortDescriptionChange} />

                    <div className={'spaceAbove'}>
                        Detailed <Link href={'https://www.markdownguide.org/getting-started'}>Markdown</Link> description (optional).
                        {' '}
                        <Link onClick={this.generateExtendedDescription}>Generate from above</Link>
                    </div>

                    <Row className={'flex-fill spaceAbove'}>
                        <Column>
                            <CodeEditor
                                language={'markdown'}
                                value={this.state.projectDetailedDescription}
                                onChange={this.onProjectDetailedDescriptionChange} /></Column>

                        <Column><Markdown source={this.state.projectDetailedDescription} /></Column>
                    </Row>

                    <div className={'ta-c pd'}>
                        <Button size={'large'} onClick={() => this.props.onNextStep(this.createResult())}>Next Step</Button>
                    </div>

                </Column>
                <Column size={1} />
            </Row>
        )
    }
}

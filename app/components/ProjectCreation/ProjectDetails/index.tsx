import * as React from 'react';
import * as classNames from 'classnames';
import {Input} from 'antd';
import {Row, Column} from '@components/Bootstrap';
import Markdown from '@components/Markdown';
import CodeEditor from '@components/CodeEditor';
import Link from '@components/Link';
import {ChangeEvent} from 'react';

interface ProjectDetailsProps {
    className?: string;
}

interface ProjectDetailsState {
    projectTitle: string;
    projectShortDescription: string;
    projectDetailedDescription: string;
}

const generateExtendedDescription = (title: string, shortDescription: string) => (
`### ${title || 'No title provided'}
${shortDescription || 'No short description provided'}

#### Detailed description
`);

export default class ProjectDetails extends React.Component<ProjectDetailsProps, ProjectDetailsState> {
    constructor(props) {
        super(props);
        this.state = {
            projectTitle: '',
            projectShortDescription: '',
            projectDetailedDescription: ''
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

    render() {
        return (
            <Row className={classNames(this.props.className)}>
                <Column size={1} />
                <Column className={'d-flex flex-column'}>
                    <div className={'spaceAbove'}>Select title that describes your project the best</div>
                    <Input placeholder={'my-project-name'} size={'large'} value={this.state.projectTitle} onChange={this.onProjectTitleChange} />
                    <div className={'smallText'}>Note: only lowercase letters, numbers and hyphens can be used.</div>

                    <div className={'spaceAbove'}>Provide a short description (optional)</div>
                    <Input placeholder={'Short project description'} value={this.state.projectShortDescription} onChange={this.onProjectShortDescriptionChange} />

                    <div className={'spaceAbove'}>
                        Provide an detailed <Link href={'https://www.markdownguide.org/getting-started'}>Markdown</Link> description (optional).
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

                </Column>
                <Column size={1} />
            </Row>
        )
    }
}

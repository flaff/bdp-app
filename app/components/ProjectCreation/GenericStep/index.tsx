import * as React from 'react';
import * as classNames from 'classnames';
import {Button, Input, Switch} from 'antd';
import {Row, Column} from '@components/Bootstrap';
import Markdown from '@components/Markdown';
import CodeEditor from '@components/CodeEditor';
import Link from '@components/Link';
import {ChangeEvent} from 'react';
import GenericPickerDialog from '@components/GenericPickerDialog';
import {RepoType} from '../consts';

export interface GenericStepResult {
    useExistingView?: boolean;
    existingViewSource?: string;

    title?: string;
    shortDescription?: string;
    detailedDescription?: string;
}

interface GenericStepProps {
    className?: string;
    onNextStep: (p: GenericStepResult) => void;
    type: RepoType;
}

interface GenericStepState {
    useExistingView: boolean;
    existingViewSource?: string;

    title: string;
    shortDescription: string;
    detailedDescription: string;
    pickerDialogVisible: boolean;
}

const generateExtendedDescription = (title: string, shortDescription: string) => (
    `### ${title || 'No title provided'}
${shortDescription || 'No short description provided'}

#### Detailed description
`);

const capitalizeFirst = (string: string) => string[0].toUpperCase() + string.substr(1).toLowerCase();

export default class GenericStep extends React.Component<GenericStepProps, GenericStepState> {
    constructor(props) {
        super(props);
        this.state = {
            useExistingView: false,
            title: '',
            shortDescription: '',
            detailedDescription: '',
            pickerDialogVisible: false
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onShortDescriptionChange = this.onShortDescriptionChange.bind(this);
        this.onDetailedDescriptionChange = this.onDetailedDescriptionChange.bind(this);
        this.onUseExistingSwitchChange = this.onUseExistingSwitchChange.bind(this);
        this.onExistingPickCancelled = this.onExistingPickCancelled.bind(this);
        this.onExistingPicked = this.onExistingPicked.bind(this);
    }

    onTitleChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            title: event.target.value
        });
    }

    onShortDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            shortDescription: event.target.value
        });
    }

    onDetailedDescriptionChange(value: string) {
        this.setState({
            ...this.state,
            detailedDescription: value
        });
    };

    generateExtendedDescription() {
        this.setState({
            ...this.state,
            detailedDescription: generateExtendedDescription(this.state.title, this.state.shortDescription)
        })
    }

    onUseExistingSwitchChange(useExistingView: boolean) {
        if (useExistingView) {
            this.showViewPickerDialog()
                .then((viewSourceName: string) => {
                    this.setState({
                        ...this.state,
                        useExistingView: true,
                        existingViewSource: viewSourceName,
                        title: '',
                        shortDescription: '',
                        detailedDescription: ''
                    })
                })
        } else {
        }
    }

    createResult(): GenericStepResult {
        return {
            detailedDescription: this.state.detailedDescription,
            shortDescription: this.state.shortDescription,
            title: this.state.title,
            useExistingView: this.state.useExistingView,
            existingViewSource: this.state.existingViewSource
        }
    }

    showViewPickerDialog() {
        return new Promise((resolve, reject) => {
            resolve('user/views/something')
        });
    }

    onExistingPicked(picked: any) {
        this.setState({
            title: picked.name
        })
    }

    onExistingPickCancelled() {
        this.setState({
            pickerDialogVisible: false
        });
    }

    render() {
        return (
            <Row className={classNames(this.props.className)}>
                <Column size={1} />
                <Column className={'d-flex flex-column'}>
                    <div className={'spaceAbove d-flex align-items-center'}>
                        <GenericPickerDialog type={this.props.type} onPicked={this.onExistingPicked} onCancelled={this.onExistingPickCancelled} />
                        <Switch checked={this.state.useExistingView} onChange={this.onUseExistingSwitchChange} />
                        <div>
                            {' Use existing view'}
                            <div className={'smallText'}>{' '}{this.state.existingViewSource}</div>
                        </div>
                    </div>

                    <div className={classNames({disabledArea: this.state.useExistingView})}>
                        <div className={'spaceAbove'}>{capitalizeFirst(this.props.type)} title</div>
                        <Input placeholder={`my-${this.props.type.toLowerCase()}-name`} size={'large'} value={this.state.title} onChange={this.onTitleChange} />
                        <div className={'smallText'}>Note: only lowercase letters, numbers and hyphens can be used.</div>

                        <div className={'spaceAbove'}>Short description (optional)</div>
                        <Input placeholder={'Short project description'} value={this.state.shortDescription} onChange={this.onShortDescriptionChange} />

                        <div className={'spaceAbove'}>
                            Detailed <Link href={'https://www.markdownguide.org/getting-started'}>Markdown</Link> description (optional).
                            {' '}
                            <Link onClick={this.generateExtendedDescription}>Generate from above</Link>
                        </div>
                    </div>

                    <Row className={classNames({disabledArea: this.state.useExistingView}, 'flex-fill spaceAbove')}>
                        <Column>
                            <CodeEditor
                                language={'markdown'}
                                value={this.state.detailedDescription}
                                onChange={this.onDetailedDescriptionChange} /></Column>

                        <Column><Markdown source={this.state.detailedDescription} /></Column>
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

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

export interface ProjectStepResult {
    title: string;
    shortDescription: string;
    detailedDescription: string;
}

export interface GenericStepResult {
    useExistingView: boolean;
    existingViewSource: string;

    title: string;
    shortDescription: string;
    detailedDescription: string;
}

interface GenericStepProps {
    className?: string;
    onNextStep: (p: GenericStepResult) => void;
    result: GenericStepResult;
    type: RepoType;
}

interface GenericStepState {
    useExistingView: boolean;
    existingViewSource: string;

    title: string;
    shortDescription: string;
    detailedDescription: string;
    pickerDialogVisible: boolean;
}

const capitalizeFirst = (string: string) => string[0].toUpperCase() + string.substr(1).toLowerCase();

export default class GenericStep extends React.Component<GenericStepProps, GenericStepState> {
    constructor(props) {
        super(props);
        this.state = {
            useExistingView: this.props.result.useExistingView,
            title: this.props.result.title,
            shortDescription: this.props.result.shortDescription,
            detailedDescription: this.props.result.detailedDescription,
            existingViewSource: this.props.result.existingViewSource,
            pickerDialogVisible: false
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onShortDescriptionChange = this.onShortDescriptionChange.bind(this);
        this.onDetailedDescriptionChange = this.onDetailedDescriptionChange.bind(this);
        this.onUseExistingSwitchChange = this.onUseExistingSwitchChange.bind(this);
        this.onExistingPickCancelled = this.onExistingPickCancelled.bind(this);
        this.onExistingPicked = this.onExistingPicked.bind(this);
        this.getDisplayDetailedDesc = this.getDisplayDetailedDesc.bind(this);
    }

    onTitleChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            title: event.target.value.toLowerCase().replace(/[ ]/g, '-').replace(/[^a-z0-9\-]/g, '')
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

    getDisplayDetailedDesc() {
        return this.state.detailedDescription
            .replace(/%TITLE%/g, this.state.title || 'title')
            .replace(/%TYPE%/g, this.props.type.toLowerCase())
            .replace(/%SHORT_DESCRIPTION%/g, this.state.shortDescription || 'No short description provided');
    }

    render() {
        return (
            <Row className={classNames(this.props.className)}>
                <Column size={1} />
                <Column className={'d-flex flex-column'}>
                    <div className={'spaceAbove d-flex align-items-center'}>
                        {this.state.pickerDialogVisible &&
                            <GenericPickerDialog type={this.props.type} onPicked={this.onExistingPicked}
                                             onCancelled={this.onExistingPickCancelled}/>
                        }
                        {this.props.type !== 'PROJECT' && <Switch checked={this.state.useExistingView} onChange={this.onUseExistingSwitchChange} />}
                        <div>
                            {' Use existing view'}
                            <div className={'smallText'}>{' '}{this.state.existingViewSource}</div>
                        </div>
                    </div>

                    <div className={classNames({disabledArea: this.state.useExistingView})}>
                        <div className={'spaceAbove'}>{capitalizeFirst(this.props.type)} title</div>
                        <Input value={this.state.title}
                               onChange={this.onTitleChange}
                               size={'large'}
                               placeholder={`my-${this.props.type.toLowerCase()}-name`}
                               addonAfter={`.${this.props.type.toLowerCase()}`} />
                        <div className={'smallText'}>Note: only lowercase letters, numbers and hyphens can be used.</div>

                        <div className={'spaceAbove'}>Short description (optional)</div>
                        <Input placeholder={'Short project description'} value={this.state.shortDescription} onChange={this.onShortDescriptionChange} />

                        <div className={'spaceAbove'}>
                            Detailed <Link href={'https://www.markdownguide.org/getting-started'}>Markdown</Link> description (optional).
                        </div>
                    </div>

                    <Row className={classNames({disabledArea: this.state.useExistingView}, 'flex-fill spaceAbove')}>
                        <Column>
                            <CodeEditor
                                language={'markdown'}
                                wordWrap={true}
                                value={this.state.detailedDescription}
                                onChange={this.onDetailedDescriptionChange} /></Column>

                        <Column><Markdown source={this.getDisplayDetailedDesc()} /></Column>
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

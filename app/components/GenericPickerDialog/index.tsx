import * as React from 'react';
import * as classNames from 'classnames';
import {Modal, Input, Spin, Icon, Radio} from 'antd';
import {Row, Column} from '@components/Bootstrap';
import {RepoType} from '@components/ProjectCreation/consts';
import Markdown from '@components/Markdown';

const Search = Input.Search;
const styles = require('./styles.scss');

export interface SearchResult {
    name: string;
    author: string;
    repository: string;
}

interface GenericPickerDialogProps {
    onPicked: (record: SearchResult) => void;
    onCancelled: () => void;
    type: RepoType;
}

interface GenericPickerDialogState {
    dialogVisible: boolean;
    searchQuery: string;
    searchResults: Array<SearchResult>;
    filteredSearchResults: Array<SearchResult>;
    chosenResult?: SearchResult;
    fetchingChosenResultDescription: boolean;
    chosenResultDescription: string;
}

const
    stringContains = (string: string, query: string) => string.indexOf(query) !== -1,

    filterArray = (array: Array<SearchResult>, query: string) =>
        !query ? array : array.filter(element =>
            stringContains(element.name, query) || stringContains(element.author, query)
        ),

    preloaderIcon = <Icon type="loading" style={{fontSize: 24}} spin />;

export default class GenericPickerDialog extends React.Component<GenericPickerDialogProps, GenericPickerDialogState> {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: true,
            searchQuery: '',
            searchResults: [
                {author: 'flaff', name: 'hotmill-1', repository: 'flaff/views/hotmill-1'},
                {author: 'homer', name: 'sample', repository: 'homer/views/sample'},
                {author: 'joe', name: 'random', repository: 'joe/views/random'},
                {author: 'flaff', name: 'random-hot', repository: 'flaff/views/random-hot'}
            ],
            filteredSearchResults: [
                {author: 'flaff', name: 'hotmill-1', repository: 'flaff/views/hotmill-1'},
                {author: 'homer', name: 'sample', repository: 'homer/views/sample'},
                {author: 'joe', name: 'random', repository: 'joe/views/random'},
                {author: 'flaff', name: 'random-hot', repository: 'flaff/views/random-hot'}
            ],
            fetchingChosenResultDescription: false,
            chosenResultDescription: ''
        };
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onRecordClick = this.onRecordClick.bind(this);
        this.onConfirmClick = this.onConfirmClick.bind(this);
    }

    onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        const searchQuery = event.target.value,
            filteredSearchResults = filterArray(this.state.searchResults, searchQuery);
        this.setState({
            searchQuery,
            filteredSearchResults
        });
    }

    onRecordClick(record: SearchResult) {
        this.setState({
            fetchingChosenResultDescription: true,
            chosenResult: record
        });
        setTimeout(() => {
            this.setState({
                fetchingChosenResultDescription: false,
                chosenResultDescription: `### ${record.name}`
            });
        }, 1000);
    }

    onConfirmClick() {
        if (this.state.chosenResult) {
            this.props.onPicked(this.state.chosenResult);
        }
    }

    render() {
        return (
            <Modal
                onOk={this.onConfirmClick}
                onCancel={this.props.onCancelled}
                visible={this.state.dialogVisible}
                closable={!!this.state.chosenResult}>
                <Search onChange={this.onSearchChange}/>
                <div>
                    <Row>
                        <Column>
                            {this.state.filteredSearchResults.map(record => (
                                <div
                                    className={classNames(styles.record, {[styles.selected]: record === this.state.chosenResult})}
                                    key={record.repository} onClick={() => this.onRecordClick(record)}>
                                    <div>{record.name}</div>
                                    <div className={'smallText'}>by {record.author}</div>
                                </div>
                            ))}
                        </Column>
                        <Spin
                            wrapperClassName={'col'}
                            indicator={preloaderIcon}
                            spinning={this.state.fetchingChosenResultDescription}>
                            <Markdown source={this.state.chosenResultDescription}/>
                        </Spin>
                    </Row>
                </div>
            </Modal>
        )
    }
}
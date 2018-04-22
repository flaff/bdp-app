import * as React from 'react';
// import {Link} from 'react-router-dom';

import Toggle from './Toggle';
import Image from './Image';
import ImageCrop from './ImageCrop';
import {Icon, Button, Menu, Dropdown} from 'antd';
import {pythonModelCode, pythonViewCode, samplePythonBase64Graph} from "./MainScreen.mock";
import Statusbar from './Statusbar';
import MonacoEditor from 'react-monaco-editor';
import MonacoResizer from "../utils/MonacoResizer";
// import {remote} from 'electron';

const styles = require('./MainScreen.scss');

interface HomeState {
  toggleValue: boolean;
  showImports: boolean;
  verboseMode: boolean;
  count: number;
  monacoResizer: MonacoResizer
}

export default class MainScreen extends React.Component<{}, HomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      toggleValue: false,
      count: 0,
      showImports: true,
      verboseMode: true,
        monacoResizer: new MonacoResizer()
    };
  }

  renderMenu() {
    return (
      <Menu>
        <Menu.Item>Open file</Menu.Item>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>About</Menu.Item>
      </Menu>
    );
  }

  render() {
    return (
      <div>
        <div className={`container-fluid ${styles.container}`}>
          <div className={`row ${styles.container}`}>
            <div className={`col-1 ${styles.leftSidebar}`}>
              <div className={styles.optionRow}>
                <Dropdown overlay={this.renderMenu()} trigger={['click']}>
                  <Icon type="ellipsis" style={{fontSize: '20px'}}/>
                </Dropdown>
              </div>
              <div className={styles.optionRow}>
                  <Button onClick={() => this.setState({...this.state, count: this.state.count + 1})}>Hello??</Button>
              </div>
              <div className={styles.optionRow}>
                Srsly python why
                <Toggle value={this.state.verboseMode}
                        onClick={() => this.setState({...this.state, verboseMode: !this.state.verboseMode})}/>
              </div>
              <div className={styles.optionRow}>
                Advanced mode
                <Toggle value={this.state.toggleValue}
                        onClick={() => this.setState({...this.state, toggleValue: !this.state.toggleValue})}/>
              </div>
            </div>

            <div className={'col-4'}>
              <div className={styles.sectionTopBar}>
                <Icon type="eye-o" />{' '}
                View
              </div>
              <MonacoEditor
                  value={pythonViewCode}
                  language={'python'}
                  editorDidMount={this.state.monacoResizer.setEditor}
              />
            </div>

              <div className={'col-4'}>
                <div className={styles.sectionTopBar}>
                  <Icon type="database" />{' '}
                  Model
                </div>
                <MonacoEditor
                    value={pythonModelCode}
                    language={'python'}
                    editorDidMount={this.state.monacoResizer.setEditor}
                />
            </div>

            <div className={'col-3'}>
              <div>Visualization</div>
              <ImageCrop width={5} height={5}>
                <Image base64={samplePythonBase64Graph}/>
              </ImageCrop>
            </div>
          </div>
        </div>

        <div className={`container-fluid ${styles.bottomBar}`}>
          <div className={`row ${styles.bottomBarRow}`}>
            <div className={`col-1 ${styles.leftSidebar}`}>{' '}</div>
            <div className={'col-11'}>
              <Statusbar/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


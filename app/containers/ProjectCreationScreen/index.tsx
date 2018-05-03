import * as React from 'react';
import * as classNames from 'classnames';
import {connect, Dispatch} from 'react-redux';
import Image from '@components/Image';
import UserHighlight from '@components/UserHighlight';
import {Button, Steps} from 'antd';
import {Column, ContainerFluid, Row} from '@components/Bootstrap';
import ProjectDetails from '@components/ProjectCreation/ProjectDetails';
const Step = Steps.Step;


const styles = require('./styles.scss');

interface WelcomeScreenProps {
}

class ProjectCreationScreen extends React.Component<WelcomeScreenProps, {}> {
    render() {
        return (
            <div className={classNames(styles.ProjectCreationScreen, 'fullHeight')}>
                <ContainerFluid className={'fullHeight d-flex flex-column'}>
                    <Row className={'spaceAbove'}>
                        <Column>
                            <Steps current={0}>
                                <Step title="Project" description="Title and details." />
                                <Step title="View" description="Which data is used?" />
                                <Step title="Model" description="How data is used?" />
                                <Step title="Visualization" description="How data is presented?" />
                                <Step title="Summary" />
                            </Steps>
                        </Column>
                    </Row>
                    <ProjectDetails className={'flex-fill'}/>
                    <div className={'ta-c pd'}>
                        <Button size={'large'}>Next Step</Button>
                    </div>
                </ContainerFluid>
            </div>
        )
    }
}

export default ProjectCreationScreen;
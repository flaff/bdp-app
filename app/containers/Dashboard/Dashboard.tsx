import * as React from 'react';
import {connect} from 'react-redux';

import {StoreState} from '@state';
import {Column, ContainerFluid, Row} from '../../components/Bootstrap/index';
import {Icon} from 'antd';
import {Link} from 'react-router-dom';

const styles = require('./Dashboard.scss');

type DashboardProps = ReturnType<typeof stateToProps> & ReturnType<typeof dispatchToProps>;
type DashboardState = {};

class Dashboard extends React.Component<DashboardProps, DashboardState> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={styles.dashboard}>
                <ContainerFluid>
                    <Row>
                        <Column size={12}>
                            <h2>Dashboard</h2>
                        </Column>
                    </Row>

                    <Row>
                        <Column size={3} />
                        <Column size={3}>
                            <Icon type="search" className={styles.primaryIcon} />
                            <div className={styles.primaryName}>Browse existing projects</div>
                        </Column>
                        <Column size={3}>
                            <Link to={'/newProject'}>
                                <Icon type="folder-add" className={styles.primaryIcon} />
                                <div className={styles.primaryName}>Start a new project</div>
                            </Link>
                        </Column>
                        <Column size={3} />
                    </Row>
                </ContainerFluid>
            </div>
        )
    }
}

const
    stateToProps = (state: StoreState) => ({
    }),
    dispatchToProps = (dispatch) => ({
    });

export default connect(stateToProps, dispatchToProps)(Dashboard);

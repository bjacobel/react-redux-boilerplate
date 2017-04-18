import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from '../stylesheets/main.css';
import { link } from '../stylesheets/link.css';
import { getDataAsync } from '../actions/data';

const mapStateToProps = state => ({
  data: state.data,
});

const mapDispatchToProps = {
  getDataAsync,
};

class Main extends Component {
  componentWillMount() {
    this.props.getDataAsync();
  }

  render() {
    const { data } = this.props;

    return (
      <div>
        <div className={styles.logo} />
        <h3 className={styles.data}>{data.text || ''}</h3>
        <Link className={link} to={'/child/foo'}>
          Component with passed params
        </Link>
        <Link className={link} to="/asdf">Dead link</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

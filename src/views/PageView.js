import React, { Component } from 'react';
import { connect } from 'react-redux';

import { apiURL } from '../actions/APIActions';
import { selectedHotspotChange } from '../actions/UIActions';

import styles from './PageView.css';
import Hotspot from './Hotspot';

class PageView extends Component {
  handleContainerRef = (container) => {
    this.container = container;
  }

  getSize = () => {
    const elem = this.container;
    return {
      width: elem.offsetWidth,
      height: elem.offsetHeight,
    };
  }

  onClick = (e) => {
    this.props.dispatch(selectedHotspotChange(null));
  }

  render() {
    const { pageNumber, chapter } = this.props;
    const page = chapter.get('pages').get(pageNumber);
    const pageImagePath = page.get('image');
    const pageImage = `${apiURL}/api/files/assets/img/pages/${pageImagePath}`;

    const hotspots = page.get('hotspots').map((hotspot, idx) => {
      return <Hotspot
        key={idx}
        hotspot={hotspot.toJS()}
        hotspotIndex={idx}
        getSize={this.getSize}
      />;
    });

    return (
      <div className={styles.pageContainer} ref={this.handleContainerRef}>
        <img alt='' className={styles.pageImage} src={pageImage} onClick={this.onClick}/>
        {hotspots}
      </div>
    );
  }
}

export default connect()(PageView);

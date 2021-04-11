import React, {Component} from 'react';
import {ScrollView, PixelRatio, Dimensions, Text, View} from 'react-native';
import YouTube from 'react-native-youtube';

import {Thumbnail} from 'native-base';
import * as PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './YouTubeScreen/css';
import {getLiveVideo} from '../store/reducers/liveVideoRedux';
import Loader from '../Components/Loader';

class YouTubeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  youTubeRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      playerWidth: Dimensions.get('window').width,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.props.getLiveVideo();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    const logo = require('../../assets/images/tamejida_47.jpg');
    if (
      !this.props.loading &&
      this.props?.video?.youtube_id &&
      this.props?.video?.isLive
    ) {
      return (
        <ScrollView style={styles.container}>
          <YouTube
            resumePlayAndroid={false}
            ref={this.youTubeRef}
            apiKey="apiKey"
            videoId={this.props.video.youtube_id}
            play={false}
            loop={false}
            fullscreen={false}
            controls={1}
            style={[
              {
                height: PixelRatio.roundToNearestPixel(
                  this.state.playerWidth / (16 / 9),
                ),
              },
              styles.player,
            ]}
          />
          <View
            style={{
              margin: 25,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '80%'}}>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                {this.props?.video?.title}
              </Text>
            </View>
            <View style={{marginLeft: 10}}>
              <Thumbnail source={logo} />
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                Tamejida 47
              </Text>
            </View>
          </View>
          <View
            style={{
              margin: 25,
            }}>
            <Text style={{fontSize: 16}}>{this.props?.video?.description}</Text>
          </View>
        </ScrollView>
      );
    }
    return (
      <View
        style={{
          ...styles.noneLiveContainer,
          opacity: this.props.loading ? 0.6 : 1,
        }}>
        {!this.props.loading && (
          <>
            <Text style={styles.noneLiveText}>Accun live en cours</Text>
            <Thumbnail large style={styles.noneLiveLogo} source={logo} />
            <Text style={styles.noneLiveLogoText}>Tamejida 47</Text>
          </>
        )}
        <Loader visible={!!this.props.loading} />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const {video, loading} = state.liveVideoStore;
  return {
    video,
    loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLiveVideo: () => dispatch(getLiveVideo()),
  };
};

YouTubeScreen.propTypes = {
  video: PropTypes.object,
  getLiveVideo: PropTypes.func,
  loading: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(YouTubeScreen);

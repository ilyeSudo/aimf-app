import React from 'react';
import {
  View,
  Modal,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Caraousel from 'react-native-snap-carousel';
import {API_BASE_URL} from 'react-native-dotenv';
import PropTypes from 'prop-types';

const getUrlImage = (image) => {
  return `${API_BASE_URL}/${image.media.path}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 15,
    marginHorizontal: 'auto',
  },
});

class CarouselImages extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      totalIndex: 0,
      showImageModel: false,
    };
  }

  componentDidMount() {
    this.setState({
      totalIndex: this.props.images.length || 0,
    });
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this.setState({showImageModel: true})}>
        <View style={{alignItems: 'center'}}>
          <ImageBackground
            source={!this.props.isLocal ? {uri: getUrlImage(item)} : item}
            style={styles.image}
            imageStyle={{borderRadius: 10}}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    );
  };

  updateIndex = (index) => {
    this.setState({
      currentIndex: index,
    });
  };

  numericPagination = (currentIndex: number, lastIndex: number) => {
    return (
      <View
        style={{
          alignSelf: 'stretch',
          alignItems: 'flex-end',
          paddingRight: 15,
        }}>
        <Text style={{fontWeight: '500', fontSize: 12, color: '#9F9F9F'}}>
          {currentIndex + 1}/{lastIndex}
        </Text>
      </View>
    );
  };

  showImageModal = () => {
    if (this.props?.images) {
      return (
        <Modal
          visible={this.state.showImageModel}
          transparent
          onRequestClose={() => this.setState({showImageModel: false})}>
          <ImageViewer
            imageUrls={this.props?.images.map((m) => {
              return {
                url: getUrlImage(m),
                props: {},
              };
            })}
            index={this.state?.currentIndex || 0}
          />
        </Modal>
      );
    }
  };

  render() {
    return (
      <View style={{paddingTop: 35}}>
        <View style={{alignItems: 'center'}}>
          <Caraousel
            renderItem={this.renderItem}
            sliderWidth={200}
            itemWidth={200}
            layout="stack"
            data={
              this.props.images?.length
                ? this.props.images
                : [require('../../assets/images/book-cover-placeholder.png')]
            }
            ref={(carousel) => {
              this._carousel = carousel;
            }}
            onSnapToItem={this.updateIndex}
          />
          {this.numericPagination(
            this.state?.currentIndex,
            this.state?.totalIndex,
          )}
          {this.showImageModal()}
        </View>
      </View>
    );
  }
}
CarouselImages.propTypes = {
  images: PropTypes.array,
  isLocal: PropTypes.bool,
};

export default CarouselImages;

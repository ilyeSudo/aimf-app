import React, {Component} from 'react';
import {View, Animated, FlatList} from 'react-native';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {isoDateToFr} from '../Utils/Functions';
import FeedCardOld from './HomeScreen/FeedCard';
import {getArticles} from '../store/reducers/articlesRedux';
import {
  receiveAssociationData,
  receiveUserAssociationData,
} from '../store/reducers/associationRedux';
import Loader from '../Components/Loader';
import ErrorModal from '../Components/ErrorModal';
import AssociationMenu from '../Components/AssociationMenu';
import {
  ayncReceiveKhatma,
  asyncReceiveUserKhatma,
} from '../store/reducers/khatmaRedux';
import styles from './HomeScreen/css';

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      x: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.props.getArticles([], 1, true);
    this.props.receiveAssociationData();
    this.props.receiveUserAssociationData();
    this.props.ayncReceiveKhatma();
    this.props.asyncReceiveUserKhatma();
  }

  slide = (val) => {
    Animated.spring(this.state.x, {
      toValue: val,
      useNativeDriver: true,
    }).start();
  };

  handleRefresh = () => {
    if (
      !this.props.refreshing &&
      !this.props.handleMore &&
      !this.props.loading
    ) {
      this.props.getArticles([], 1, true);
      this.props.receiveAssociationData();
      this.props.receiveUserAssociationData();
    }
  };

  handleLoadMore = () => {
    if (
      !this.props.refreshing &&
      !this.props.handleMore &&
      !this.props.loading &&
      !this.props.lastPage
    ) {
      this.props.getArticles(
        this.props.articles,
        this.props.page + 1,
        false,
        true,
      );
    }
  };

  renderItem = (item) => {
    return (
      <View style={styles.articleView}>
        <FeedCardOld
          id={item.id}
          title={item.title}
          date={isoDateToFr(item.publishedAt)}
          description={item.description}
          backgroundColor={!item.isExpired ? '#ffffff' : '#dadada'}
          associationName={item?.association?.name}
          logo={item?.association?.logo}
        />
      </View>
    );
  };

  render() {
    return (
      <>
        <AssociationMenu screenerTitle="Actualités" />
        <FlatList
          style={{
            ...styles.swipeListView,
            opacity: this.props.loading || this.props.errorMessage ? 0.6 : 1,
          }}
          data={this.props.articles}
          renderItem={({item}) => this.renderItem(item)}
          keyExtractor={(item) => `${item.id}`}
          ItemSeparatorComponent={this.renderSeparator}
          onRefresh={this.handleRefresh}
          refreshing={false}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.5}
        />
        <Loader visible={!!this.props.loading} />
        {this.props.errorMessage && (
          <ErrorModal visible message={this.props.errorMessage} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {errorMessage} = state.errorMessageStore;
  const {
    articles,
    loading,
    refreshing,
    handleMore,
    page,
    lastPage,
  } = state.articleStore;
  return {
    articles,
    loading,
    refreshing,
    handleMore,
    page,
    errorMessage,
    lastPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getArticles: (articles, page, refreshing = false, handleMore = false) =>
      dispatch(getArticles(articles, page, refreshing, handleMore)),
    receiveAssociationData: () => dispatch(receiveAssociationData()),
    receiveUserAssociationData: () => dispatch(receiveUserAssociationData()),
    ayncReceiveKhatma: () => dispatch(ayncReceiveKhatma()),
    asyncReceiveUserKhatma: () => dispatch(asyncReceiveUserKhatma()),
  };
};

HomeScreen.propTypes = {
  page: PropTypes.number,
  articles: PropTypes.array,
  getArticles: PropTypes.func,
  loading: PropTypes.bool,
  refreshing: PropTypes.bool,
  handleMore: PropTypes.bool,
  lastPage: PropTypes.bool,
  errorMessage: PropTypes.string,
  receiveAssociationData: PropTypes.func.isRequired,
  receiveUserAssociationData: PropTypes.func.isRequired,
  ayncReceiveKhatma: PropTypes.func.isRequired,
  asyncReceiveUserKhatma: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

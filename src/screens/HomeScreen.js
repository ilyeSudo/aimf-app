import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Icon} from 'react-native-elements';
import {isoDateToFr} from '../Utils/Functions';
import FeedCard from './HomeScreen/FeedCard';
import {deleteArticle, getArticles} from '../store/reducers/articlesRedux';
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
import {isAdmin} from '../Utils/Account';

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.props.getArticles([], 1, true);
    this.props.receiveAssociationData();
    this.props.receiveUserAssociationData();
    this.props.ayncReceiveKhatma();
    this.props.asyncReceiveUserKhatma();
  }

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
        <FeedCard
          id={item.id}
          title={item.title}
          date={isoDateToFr(item.publishedAt)}
          description={item.description}
          backgroundColor={!item.isExpired ? '#ffffff' : '#dadada'}
          associationName={item?.association?.name}
          logo={item?.association?.logo}
        />

        {isAdmin(this.props.user) && (
          <View style={styles.rowBack}>
            <Icon
              style={[styles.backRightBtn]}
              color="#f26060"
              name="delete"
              type="MaterialCommunityIcons"
            />
          </View>
        )}
      </View>
    );
  };

  deleteArticle = (id) => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer cet article ?',
      [
        {
          text: 'Confirmer',
          onPress: () => this.props.deleteArticle(id),
        },
        {
          text: 'Annuler',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  renderHiddenItem = (data) => {
    return (
      <View style={styles.hiddenItemeContainer}>
        <View style={styles.hiddenItemeTextContainer}>
          <Text
            style={styles.hiddenItemeText}
            onPress={() => this.deleteArticle(data.item.id)}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <>
        <AssociationMenu screenerTitle="Actualités" />
        <SwipeListView
          style={{
            ...styles.swipeListView,
            opacity: this.props.loading || this.props.errorMessage ? 0.6 : 1,
          }}
          data={this.props.articles}
          renderItem={({item}) => this.renderItem(item)}
          renderHiddenItem={this.renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={isAdmin(this.props.user) ? -150 : 0}
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
  const {user} = state.accountStore;
  return {
    user,
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
    deleteArticle: (id) => dispatch(deleteArticle(id)),
    receiveAssociationData: () => dispatch(receiveAssociationData()),
    receiveUserAssociationData: () => dispatch(receiveUserAssociationData()),
    ayncReceiveKhatma: () => dispatch(ayncReceiveKhatma()),
    asyncReceiveUserKhatma: () => dispatch(asyncReceiveUserKhatma()),
  };
};

HomeScreen.propTypes = {
  user: PropTypes.object,
  page: PropTypes.number,
  articles: PropTypes.array,
  getArticles: PropTypes.func,
  deleteArticle: PropTypes.func,
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

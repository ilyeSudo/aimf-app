import getAxiosInstance from '../../Utils/axios';
import {GET_LIVE_VIDEO_URI} from '../../Utils/ApiUrl';
import {navigate} from '../../Utils/Account';
import NavigationService from '../../Utils/NavigationService';

const GET_LIVE_VIDEO_REQUEST = 'GET_LIVE_VIDEO_REQUEST';
const GET_LIVE_VIDEO_SUCCESS = 'GET_LIVE_VIDEO_SUCCESS';
const GET_LIVE_VIDEO_ERROR = 'GET_LIVE_VIDEO_ERROR';

const getLiveVideoRequest = () => {
  return {
    type: GET_LIVE_VIDEO_REQUEST,
    data: {
      loading: true,
    },
  };
};

const getLiveVideoSuccess = (data) => {
  return {
    type: GET_LIVE_VIDEO_SUCCESS,
    data: {video: data, loading: false},
  };
};

const getLiveVideoError = () => {
  return {
    type: GET_LIVE_VIDEO_ERROR,
    loading: false,
  };
};

export const getLiveVideo = (account) => {
  return (dispatch) => {
    dispatch(getLiveVideoRequest());
    getAxiosInstance()
      .get(GET_LIVE_VIDEO_URI)
      .then((response) => {
        dispatch(getLiveVideoSuccess(response.data.data));
        const youtube = response.data.data && response.data.data.isLive;
        navigate(
          account,
          NavigationService.getInstance(),
          'Login',
          response.data.data && response.data.data.isLive,
        );

        if (youtube) {
          NavigationService.getInstance().navigate('YouTubeStack');
        }
      })
      .catch(() => {
        dispatch(getLiveVideoError());
      });
  };
};

const initialState = {};

export const liveVideoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIVE_VIDEO_REQUEST:
    case GET_LIVE_VIDEO_SUCCESS:
    case GET_LIVE_VIDEO_ERROR:
      return {...state, ...action.data};
    default: {
      return state;
    }
  }
};

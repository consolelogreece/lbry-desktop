import { connect } from 'react-redux';

import {
  doResolveUri,
  makeSelectClaimIsMine,
  makeSelectTitleForUri,
  makeSelectThumbnailForUri,
  makeSelectCoverForUri,
  makeSelectClaimForUri,
  makeSelectIsUriResolving,
  makeSelectMetadataItemForUri,
} from 'lbry-redux';

import { selectBlackListedOutpoints } from 'lbryinc';

import ChannelLink from './view';

const select = (state, props) => {
  return {
    uri: props.uri,
    claim: makeSelectClaimForUri(props.uri)(state),
    title: makeSelectTitleForUri(props.uri)(state),
    cover: makeSelectCoverForUri(props.uri)(state),
    thumbnail: makeSelectThumbnailForUri(props.uri)(state),
    description: makeSelectMetadataItemForUri(props.uri, 'description')(state),
    channelIsMine: makeSelectClaimIsMine(props.uri)(state),
    isResolvingUri: makeSelectIsUriResolving(props.uri)(state),
    blackListedOutpoints: selectBlackListedOutpoints(state),
  };
};

const perform = dispatch => ({
  resolveUri: uri => dispatch(doResolveUri(uri)),
});

export default connect(
  select,
  perform
)(ChannelLink);

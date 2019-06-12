// @flow
import * as React from 'react';
import Button from 'component/button';
import CreditAmount from 'component/common/credit-amount';
import BusyIndicator from 'component/common/busy-indicator';

type Props = {
  unclaimedRewardAmount: number,
  fetching: boolean,
  fetchRewards: () => void,
  fetchRewardedContent: () => void,
};

class RewardSummary extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchRewards();
    this.props.fetchRewardedContent();
  }

  render() {
    const { unclaimedRewardAmount, fetching } = this.props;
    const hasRewards = unclaimedRewardAmount > 0;

    return (
      <section className="card card--section">
        <header className="card__header">
          <h2 className="card__title">
            {__('Rewards')}
            {fetching && <BusyIndicator />}
          </h2>
        </header>

        <p className="card__subtitle">
          {!fetching &&
            (hasRewards ? (
              <React.Fragment>
                {__('You have')}
                &nbsp;
                <CreditAmount inheritStyle amount={unclaimedRewardAmount} precision={8} />
                &nbsp;
                {__('in unclaimed rewards')}.
              </React.Fragment>
            ) : (
              <React.Fragment>
                {__('There are no rewards available at this time, please check back later')}.
              </React.Fragment>
            ))}{' '}
          <Button button="link" label={__('Learn more')} href="https://lbry.com/faq/rewards" />.
        </p>

        <div className="card__content">
          <div className="card__actions">
            <Button
              button="primary"
              navigate="/$/rewards"
              label={hasRewards ? __('Claim Rewards') : __('View Rewards')}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default RewardSummary;

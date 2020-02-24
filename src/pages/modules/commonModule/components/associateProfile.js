import React, { Component } from 'react';
import AssociateProfileView from '../views/associateProfileView';
import { ASSOCIATE } from './../../../graphql/queries';
import { Spinner } from '@blueprintjs/core';
import { Query } from 'react-apollo';

export default class AssociateProfile extends Component {
  render() {
    return (
      <Query
        query={ASSOCIATE}
        variables={{
          id: this.props.id,
        }}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Spinner
                className="bp3-intent-success"
                number={Spinner.SIZE_LARGE}
              />
            )
          if (error) return <div>Failed to load data</div>
          return <AssociateProfileView associate={data.getAssociate} />
        }}
      </Query>
    )
  }
}

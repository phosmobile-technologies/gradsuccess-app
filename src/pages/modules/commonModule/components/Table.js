import React from "react"
import TableView from './../views/TableView';
import { connect } from "react-redux";

function Table({data, user}) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Type",
            accessor: "package.package_name",
          },
          {
            Header: "Turn Arround Time",
            accessor: "package.turn_around_time",
          },
          {
            Header: "Amount",
            accessor: "package.amount",
          },
          {
            Header: "Status",
            accessor: "status",
          }
        ],
      },
    ],
    []
  )

  if (data) {
    return <TableView columns={columns} data={data} user={user} />
  } else {
    return <div></div>
  }
}

const mapStateToProps = state => ({
  user: state.loggedInUser
});

export default connect(mapStateToProps, null)(Table);
import React, { useState } from "react"
import { useTable, usePagination } from "react-table"
import {
  ButtonGroup,
  Button,
  HTMLSelect,
  Callout,
  Menu,
  MenuItem,
  Drawer,
} from "@blueprintjs/core"
import CurrencyFormat from "react-currency-format"
import { navigate } from "gatsby"
import AssignAssociatePackage from "../../adminModule/components/assignAssociatePackage"
import AssignSelfPackage from "../components/assignSelfPackage"
import ApprovePackage from "../../adminModule/components/approvePackage"
import DeclinePackage from "../../adminModule/components/declinePackage"

function TableView({ columns, data, user }) {
  // Use the state and functions returned from useTable to build your UI
  if (columns) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page, // Instead of using 'rows', we'll use page,
      // which has only the rows for the active page

      // The rest of these things are super handy, too ;)
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0 },
      },
      usePagination
    )

    const [openAssignSelfDrawer, setOpenAssignSelfDrawer] = useState(false)
    const [openAssignAssociateDrawer, setOpenAssignAssociateDrawer] = useState(
      false
    )
    const [openApproveDrawerDrawer, setOpenApproveDrawer] = useState(false)
    const [openDeclineDrawerDrawer, setOpenDeclineDrawer] = useState(false)
    const [packageItem, setPackageItem] = useState(false)

    return (
      <>
        {data.length > 0 && (
          <div className="table-container">
            <Drawer
              isOpen={openAssignSelfDrawer}
              size={Drawer.SIZE_SMALL}
              isCloseButtonShown={true}
              enforceFocus={true}
              title="Assign Self Package"
              usePortal={true}
              onClose={() => {
                setOpenAssignSelfDrawer(false)
              }}
              canOutsideClickClose={false}
            >
              <AssignSelfPackage
                packageItem={packageItem}
                setOpenAssignSelfDrawer={setOpenAssignSelfDrawer}
              />
            </Drawer>

            <Drawer
              isOpen={openAssignAssociateDrawer}
              size={Drawer.SIZE_SMALL}
              isCloseButtonShown={true}
              enforceFocus={true}
              title="Assign Associate Package"
              usePortal={true}
              onClose={() => {
                setOpenAssignAssociateDrawer(false)
              }}
              canOutsideClickClose={false}
            >
              <AssignAssociatePackage
                packageItem={packageItem}
                setOpenAssignAssociateDrawer={setOpenAssignAssociateDrawer}
              />
            </Drawer>

            <Drawer
              isOpen={openApproveDrawerDrawer}
              size={Drawer.SIZE_SMALL}
              isCloseButtonShown={true}
              enforceFocus={true}
              title="Approve Package"
              usePortal={true}
              onClose={() => {
                setOpenApproveDrawer(false)
              }}
              canOutsideClickClose={false}
            >
              <ApprovePackage
                packageItem={packageItem}
                setOpenApproveDrawer={setOpenApproveDrawer}
              />
            </Drawer>

            <Drawer
              isOpen={openDeclineDrawerDrawer}
              size={Drawer.SIZE_SMALL}
              isCloseButtonShown={true}
              enforceFocus={true}
              title="Decline Package"
              usePortal={true}
              onClose={() => {
                setOpenDeclineDrawer(false)
              }}
              canOutsideClickClose={false}
            >
              <DeclinePackage
                packageItem={packageItem}
                setOpenDeclineDrawer={setOpenDeclineDrawer}
              />
            </Drawer>

            <table {...getTableProps()}>
              <thead className="table-thead">
                {headerGroups.map((headerGroup, index) => (
                  <tr key={index}>
                    {headerGroup.headers.map((column, index) => (
                      <th {...column.getHeaderProps()} key={index}>
                        {column.render("Header")}
                      </th>
                    ))}
                    <th>Actions</th>
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="table-tbody">
                {page.map((row, i) => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell, i) => {
                        if (cell.column.Header === "Amount") {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className={" table-body-row"}
                              key={i}
                            >
                              <CurrencyFormat
                                value={cell.value}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₦"}
                                renderText={value => (
                                  <div className="cart-item-price">{value}</div>
                                )}
                              />
                            </td>
                          )
                        } else {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className={
                                " table-body-row " +
                                (cell.column.Header === "Status"
                                  ? cell.value.toLowerCase()
                                  : "")
                              }
                              key={i}
                            >
                              <span>{cell.render("Cell")}</span>
                            </td>
                          )
                        }
                      })}
                      <td>
                        {row.original.status === "New" && (
                          <Menu large={false} className="sub-menu-table">
                            <MenuItem text="Options">
                              <MenuItem
                                text="View application"
                                onClick={() => {
                                  navigate(
                                    "/admin/account/dashboard/package/details",
                                    {
                                      state: {
                                        packageItem: row.original,
                                      },
                                    }
                                  )
                                }}
                              />
                              <MenuItem
                                text="Assign self"
                                onClick={() => {
                                  setPackageItem(row.original)
                                  setOpenAssignSelfDrawer(true)
                                }}
                              />
                              {user.account_type === "Admin" && (
                                <MenuItem
                                  text="Assign to associate"
                                  onClick={() => {
                                    setPackageItem(row.original)
                                    setOpenAssignAssociateDrawer(true)
                                  }}
                                />
                              )}
                            </MenuItem>
                          </Menu>
                        )}

                        {row.original.status === "Pending" && (
                          <Menu large={false} className="sub-menu-table">
                            <MenuItem text="Options">
                              <MenuItem
                                text="View application"
                                onClick={() => {
                                  navigate(
                                    "/admin/account/dashboard/package/details",
                                    {
                                      state: {
                                        packageItem: row.original,
                                      },
                                    }
                                  )
                                }}
                              />
                              {user.account_type === "Admin" && (
                                <MenuItem
                                  text="Approve"
                                  onClick={() => {
                                    setPackageItem(row.original)
                                    setOpenApproveDrawer(true)
                                  }}
                                />
                              )}
                              {user.account_type === "Admin" && (
                                <MenuItem
                                  text="Decline"
                                  onClick={() => {
                                    setPackageItem(row.original)
                                    setOpenDeclineDrawer(true)
                                  }}
                                />
                              )}
                            </MenuItem>
                          </Menu>
                        )}

                        {row.original.status === "Completed" ||
                        row.original.status === "Assigned" ? (
                          <Menu large={false} className="sub-menu-table">
                            <MenuItem text="Options">
                              <MenuItem
                                text="View application"
                                onClick={() => {
                                  navigate(
                                    "/admin/account/dashboard/package/details",
                                    {
                                      state: {
                                        packageItem: row.original,
                                      },
                                    }
                                  )
                                }}
                              />
                            </MenuItem>
                          </Menu>
                        ) : (
                          <div></div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}

            <div className="pagination">
              <ButtonGroup minimal={true}>
                <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  {"<<"}
                </Button>

                <Button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  {"<"}
                </Button>
                <Button onClick={() => nextPage()} disabled={!canNextPage}>
                  {">"}
                </Button>
                <Button
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  {">>"}
                </Button>
              </ButtonGroup>
              <span className="paginate-paging-indicator">
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>
              <span className="paginate-paging-indicator">
                | Go to page:{" "}
                <input
                  type="number"
                  className="bp3-input bp3-small"
                  defaultValue={pageIndex + 1}
                  onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    gotoPage(page)
                  }}
                />
              </span>{" "}
              <HTMLSelect
                className="bp3-select"
                value={pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value))
                }}
              >
                {[5, 10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </HTMLSelect>
            </div>
          </div>
        )}
        {data.length === 0 && (
          <div>
            <Callout
              className="bp3-intent-primary"
              icon="folder-open"
              title="No Application"
            >
              <span>There is currently no application.</span>
            </Callout>
          </div>
        )}
      </>
    )
  }else{
    return <div></div>
  }
}

export default TableView

import React from "react"
import agenda from "../../../../images/agenda.svg"
import pdf from "../../../../images/pdf.svg"
 /* eslint-disable */
const breakpoints = [375, 576, 768]
const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

const SampleEssays = ({
  read,
  essay,
  type,
  discipline,
  downloadPdf,
  fileName,
}) => (
  <div
    css={{
      padding: "30px 0px",
    }}
  >
    <div
      css={{
        textAlign: "center",
        color: "gray",
      }}
    >
      <h2> {read} </h2>
    </div>

    {/* main box*/}
    <div
      css={{
        width: "50%",
        margin: "50px auto",
        boxShadow: "2px 2px 5px gray",
        [mq[2]]: {
          margin: "10px auto",
          width: "80%",
        },
      }}
    >
      <div
        css={{
          padding: "50px",
          background: "white",
          [mq[2]]: {
            padding: "20px",
          },
        }}
      >
        <div
          css={{
            display: "flex",
          }}
        >
          <div>
            <img src={agenda} alt="book" />
          </div>
          <div>
            <div>
              {" "}
              <h3> {essay} </h3>{" "}
            </div>
            <div
              css={{
                display: "flex",
              }}
            >
              {" "}
              <img src={pdf} />{" "}
              <a href={downloadPdf} download={fileName}>
                {" "}
                <h5> Download this sample </h5>
              </a>
            </div>
          </div>
        </div>

        {/* second part*/}
        <div
          css={{
            display: "flex",
            fontFamily: '"Poppins", "sans-serif"',
            fontSize: "12px",
          }}
        >
          {" "}
          <span
            css={{
              width: "200px",
              textAlign: "right",
              paddingRight: "30px",
              color: "gray",
              fontFamily: '"Poppins", "sans-serif"',
              fontSize: "12px",
              [mq[2]]: {
                paddingRight: "10px",
                width: "100px",
              },
            }}
          >
            {" "}
            Type:{" "}
          </span>{" "}
          <span
            css={{
              width: "50%",
              fontFamily: '"Poppins", "sans-serif"',
              fontSize: "12px",
            }}
          >
            {" "}
            {type}{" "}
          </span>
        </div>

        {/* second part*/}
        <div
          css={{
            display: "flex",
            fontFamily: '"Poppins", "sans-serif"',
            fontSize: "12px",
          }}
        >
          {" "}
          <span
            css={{
              width: "200px",
              textAlign: "right",
              paddingRight: "30px",
              color: "gray",
              fontFamily: '"Poppins", "sans-serif"',
              fontSize: "12px",
              [mq[2]]: {
                paddingRight: "10px",
                width: "100px",
              },
            }}
          >
            {" "}
            Discipline:{" "}
          </span>{" "}
          <span
            css={{
              width: "50%",
              fontFamily: '"Poppins", "sans-serif"',
              fontSize: "12px",
            }}
          >
            {" "}
            {discipline}{" "}
          </span>
        </div>
      </div>
    </div>
  </div>
)

export default SampleEssays
